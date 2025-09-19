import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PoliceLayout } from "@/components/layouts/PoliceLayout";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Camera
} from "lucide-react";

const PoliceReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const reports = [
    {
      id: "R001",
      citizen: "Rajesh K.",
      type: "No Helmet",
      location: "MG Road, Sector 14",
      coordinates: "28.4595, 77.0266",
      timestamp: "2024-01-15 14:30:25",
      status: "pending",
      priority: "high",
      aiDetection: ["no_helmet_detected", "license_plate_visible"],
      licensePlate: "DL-08-CA-1234",
      confidence: 94,
      image: "/api/placeholder/300/200"
    },
    {
      id: "R002", 
      citizen: "Priya S.",
      type: "Signal Jump",
      location: "Brigade Road Junction",
      coordinates: "12.9716, 77.5946",
      timestamp: "2024-01-15 13:45:10",
      status: "verified",
      priority: "medium",
      aiDetection: ["signal_violation", "vehicle_identified"],
      licensePlate: "KA-05-HB-9876",
      confidence: 87,
      image: "/api/placeholder/300/200"
    },
    {
      id: "R003",
      citizen: "Amit P.",
      type: "Illegal Parking",
      location: "Commercial Street",
      coordinates: "12.9833, 77.6167",
      timestamp: "2024-01-15 12:20:45", 
      status: "rejected",
      priority: "low",
      aiDetection: ["parked_vehicle", "no_parking_zone"],
      licensePlate: "KA-03-MN-5555",
      confidence: 76,
      image: "/api/placeholder/300/200"
    },
    {
      id: "R004",
      citizen: "Sarah J.",
      type: "Triple Riding",
      location: "Koramangala 5th Block",
      coordinates: "12.9352, 77.6245",
      timestamp: "2024-01-15 11:15:30",
      status: "pending",
      priority: "high",
      aiDetection: ["triple_riding_detected", "helmet_missing"],
      licensePlate: "KA-01-AB-7777",
      confidence: 91,
      image: "/api/placeholder/300/200"
    },
    {
      id: "R005",
      citizen: "Mohammed A.",
      type: "Over Speeding",
      location: "Outer Ring Road",
      coordinates: "12.9698, 77.7500",
      timestamp: "2024-01-15 10:05:15",
      status: "verified",
      priority: "medium",
      aiDetection: ["speed_violation", "vehicle_tracked"],
      licensePlate: "KA-02-XY-8888",
      confidence: 89,
      image: "/api/placeholder/300/200"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case "rejected":
        return <Badge className="bg-danger"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "pending":
        return <Badge className="bg-warning"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-danger";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerifyReport = (reportId: string) => {
    // Mock verify action
    console.log("Verifying report:", reportId);
  };

  const handleRejectReport = (reportId: string) => {
    // Mock reject action  
    console.log("Rejecting report:", reportId);
  };

  return (
    <PoliceLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Traffic Violation Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and manage citizen-submitted violation reports
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by report ID, type, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Report Image */}
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Confidence:</span>
                      <Badge variant="secondary">{report.confidence}%</Badge>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`}></div>
                        <h3 className="text-lg font-semibold">{report.type}</h3>
                        <Badge variant="outline">#{report.id}</Badge>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Location:</span>
                          <span className="text-muted-foreground">{report.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Time:</span>
                          <span className="text-muted-foreground">{report.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Citizen:</span>
                          <span className="text-muted-foreground">{report.citizen}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">License:</span>
                          <Badge variant="outline" className="font-mono">{report.licensePlate}</Badge>
                        </div>
                        <div>
                          <span className="font-medium">AI Detection:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.aiDetection.map((detection, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {detection.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {report.status === "pending" && (
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="bg-success hover:bg-success/80"
                          onClick={() => handleVerifyReport(report.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectReport(report.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PoliceLayout>
  );
};

export default PoliceReports;