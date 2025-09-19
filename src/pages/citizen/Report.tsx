import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CitizenLayout } from "@/components/layouts/CitizenLayout";
import { Camera, MapPin, Clock, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CitizenReport = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [violationType, setViolationType] = useState("");
  const { toast } = useToast();

  const violationTypes = [
    { value: "helmet", label: "No Helmet", color: "violation-helmet" },
    { value: "speeding", label: "Over Speeding", color: "violation-speed" },
    { value: "parking", label: "Illegal Parking", color: "violation-parking" },
    { value: "signal", label: "Signal Jump", color: "violation-signal" },
    { value: "triple", label: "Triple Riding", color: "danger" },
    { value: "lane", label: "Wrong Lane", color: "warning" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Report submitted successfully!",
      description: "Your report is being processed by our AI system.",
    });

    // Reset form
    setSelectedFile(null);
    setViolationType("");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  // Mock GPS coordinates
  const mockCoordinates = {
    lat: 28.6139,
    lng: 77.2090,
    address: "Connaught Place, New Delhi"
  };

  return (
    <CitizenLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Report Traffic Violation
          </h1>
          <p className="text-muted-foreground mt-2">
            Help make your city safer by reporting traffic violations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo/Video Upload */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-primary" />
                <span>Evidence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-12 w-12 text-success mx-auto" />
                      <div className="font-medium">{selectedFile.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div className="font-medium">Upload Photo or Video</div>
                      <div className="text-sm text-muted-foreground">
                        PNG, JPG, MP4 up to 10MB
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Violation Type */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Violation Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={violationType} onValueChange={setViolationType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select violation type" />
                </SelectTrigger>
                <SelectContent>
                  {violationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${type.color}`}></div>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Location & Time */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Location & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">GPS Location</div>
                  <div className="text-sm text-muted-foreground">
                    {mockCoordinates.address}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {mockCoordinates.lat}, {mockCoordinates.lng}
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Auto-detected
                </Badge>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Timestamp</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleString()}
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Auto-added
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Additional Details (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Provide any additional context about the violation..."
                className="min-h-20"
              />
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="bg-muted/30 border-warning">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-warning">Privacy Protection</div>
                  <div className="text-muted-foreground mt-1">
                    Our AI will automatically blur faces and sensitive information in your submission to protect privacy.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-glow"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Report...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </div>
    </CitizenLayout>
  );
};

export default CitizenReport;