import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PoliceLayout } from "@/components/layouts/PoliceLayout"; 
import { 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const PoliceInsights = () => {
  const violationTrends = [
    { type: "No Helmet", thisMonth: 89, lastMonth: 76, change: 17, trend: "up" },
    { type: "Speeding", thisMonth: 67, lastMonth: 82, change: -18, trend: "down" },
    { type: "Illegal Parking", thisMonth: 54, lastMonth: 48, change: 13, trend: "up" },
    { type: "Signal Jump", thisMonth: 43, lastMonth: 51, change: -16, trend: "down" },
    { type: "Triple Riding", thisMonth: 31, lastMonth: 28, change: 11, trend: "up" },
  ];

  const hotspots = [
    { location: "MG Road Junction", violations: 47, risk: "high", improvement: -5 },
    { location: "Brigade Road", violations: 38, risk: "high", improvement: 12 },
    { location: "Commercial Street", violations: 34, risk: "medium", improvement: -8 },
    { location: "Koramangala 5th Block", violations: 29, risk: "medium", improvement: 3 },
    { location: "Indiranagar", violations: 25, risk: "medium", improvement: -15 },
    { location: "Jayanagar 4th Block", violations: 22, risk: "low", improvement: 7 },
  ];

  const timeAnalysis = [
    { hour: "08:00-10:00", violations: 45, type: "Rush Hour" },
    { hour: "10:00-12:00", violations: 28, type: "Mid Morning" },
    { hour: "12:00-14:00", violations: 35, type: "Lunch Hour" },
    { hour: "14:00-16:00", violations: 31, type: "Afternoon" },
    { hour: "16:00-18:00", violations: 52, type: "Evening Rush" },
    { hour: "18:00-20:00", violations: 38, type: "Evening" },
  ];

  const citizenStats = {
    activeReporters: 1247,
    newThisMonth: 89,
    topContributor: "Rajesh Kumar",
    avgAccuracy: 87,
    totalRewards: "₹45,600"
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-danger";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-4 w-4 text-danger" /> : 
      <TrendingDown className="h-4 w-4 text-success" />;
  };

  return (
    <PoliceLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Traffic Insights & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Data-driven insights for traffic enforcement and city planning
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">324</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">{citizenStats.activeReporters}</div>
                  <div className="text-sm text-muted-foreground">Active Citizens</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{citizenStats.avgAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Avg Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold text-warning">8</div>
                  <div className="text-sm text-muted-foreground">High-Risk Zones</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Violation Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Violation Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {violationTrends.map((violation) => (
                <div key={violation.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{violation.type}</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(violation.trend)}
                      <span className={`text-sm ${
                        violation.trend === 'up' ? 'text-danger' : 'text-success'
                      }`}>
                        {violation.change > 0 ? '+' : ''}{violation.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>This month: {violation.thisMonth}</span>
                    <span>Last month: {violation.lastMonth}</span>
                  </div>
                  <Progress 
                    value={(violation.thisMonth / Math.max(...violationTrends.map(v => v.thisMonth))) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hotspots */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>High Violation Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hotspots.map((spot, index) => (
                <div key={spot.location} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{spot.location}</div>
                      <div className="text-sm text-muted-foreground">
                        {spot.violations} violations this month
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(spot.risk)}`}></div>
                    <span className={`text-sm ${
                      spot.improvement > 0 ? 'text-success' : 'text-danger'
                    }`}>
                      {spot.improvement > 0 ? '+' : ''}{spot.improvement}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Time Analysis */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Peak Violation Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeAnalysis.map((timeSlot) => (
                  <div key={timeSlot.hour} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{timeSlot.hour}</span>
                        <Badge variant="secondary" className="text-xs">
                          {timeSlot.type}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">{timeSlot.violations} violations</span>
                    </div>
                    <Progress 
                      value={(timeSlot.violations / Math.max(...timeAnalysis.map(t => t.violations))) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Citizen Engagement */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Citizen Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Reporters</span>
                  <span className="text-lg font-bold text-primary">{citizenStats.activeReporters}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">New This Month</span>
                  <Badge className="bg-success">+{citizenStats.newThisMonth}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Top Contributor</span>
                  <span className="text-sm font-semibold">{citizenStats.topContributor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rewards Distributed</span>
                  <span className="text-sm font-bold text-success">{citizenStats.totalRewards}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-card border-border mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="font-medium text-warning">Peak Hour Focus</div>
                  <div className="text-muted-foreground mt-1">
                    Deploy additional officers during 8-10 AM and 4-6 PM
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="font-medium text-primary">Helmet Campaign</div>
                  <div className="text-muted-foreground mt-1">
                    Increase awareness campaigns for helmet violations
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="font-medium text-success">Citizen Rewards</div>
                  <div className="text-muted-foreground mt-1">
                    Consider increasing rewards to boost participation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PoliceLayout>
  );
};

export default PoliceInsights;