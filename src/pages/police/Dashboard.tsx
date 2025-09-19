import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PoliceLayout } from "@/components/layouts/PoliceLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin,
  LogOut,
  Shield
} from "lucide-react";

const PoliceDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalReports: 324,
    verified: 278,
    pending: 46,
    rejected: 18,
    todayReports: 15,
    activeOfficers: 12,
    hotspots: 8
  };

  const recentReports = [
    { id: "R001", type: "No Helmet", location: "MG Road", time: "2 hours ago", status: "pending", priority: "high" },
    { id: "R002", type: "Signal Jump", location: "Brigade Road", time: "3 hours ago", status: "verified", priority: "medium" },
    { id: "R003", type: "Illegal Parking", location: "Commercial St", time: "4 hours ago", status: "pending", priority: "low" },
    { id: "R004", type: "Triple Riding", location: "Koramangala", time: "5 hours ago", status: "verified", priority: "high" },
  ];

  const violationStats = [
    { type: "No Helmet", count: 89, color: "violation-helmet" },
    { type: "Speeding", count: 67, color: "violation-speed" },
    { type: "Illegal Parking", count: 54, color: "violation-parking" },
    { type: "Signal Jump", count: 43, color: "violation-signal" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PoliceLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Police Control Panel
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome, Officer {user?.name}. Monitor and manage traffic violations.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-3 py-1">
              <Shield className="h-3 w-3 mr-1" />
              TRAFFIC POLICE
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-card-hover"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.totalReports}</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                  <div className="text-sm text-muted-foreground">Pending Review</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">{stats.verified}</div>
                  <div className="text-sm text-muted-foreground">Verified Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/police/reports')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        report.priority === 'high' ? 'bg-danger' :
                        report.priority === 'medium' ? 'bg-warning' : 'bg-success'
                      }`}></div>
                      <div>
                        <div className="font-medium">{report.type}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                          <span>•</span>
                          <span>{report.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={report.status === 'verified' ? 'default' : 'secondary'}
                      className={report.status === 'verified' ? 'bg-success' : ''}
                    >
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Violation Types */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Violation Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {violationStats.map((violation) => (
                  <div key={violation.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{violation.type}</span>
                      <span className="text-sm text-muted-foreground">{violation.count}</span>
                    </div>
                    <Progress 
                      value={(violation.count / stats.totalReports) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-card border-border mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Officers</span>
                  <Badge variant="secondary">{stats.activeOfficers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Processing</span>
                  <Badge className="bg-success">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-success">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hotspots Monitored</span>
                  <Badge variant="secondary">{stats.hotspots}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PoliceLayout>
  );
};

export default PoliceDashboard;