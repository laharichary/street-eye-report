import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Camera, Award, Eye, MapPin, Users } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Civic Eye
              </span>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="hover:bg-card-hover"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text text-transparent">
              Citizen-Powered Traffic Enforcement
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Report traffic violations with AI-powered detection. Help make your city safer while earning rewards for being a responsible citizen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-lg px-8 py-3"
                onClick={() => navigate('/login')}
              >
                <Camera className="mr-2 h-5 w-5" />
                Start Reporting
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 hover:bg-card-hover"
                onClick={() => navigate('/login')}
              >
                <Shield className="mr-2 h-5 w-5" />
                Police Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card hover:bg-card-hover transition-colors border-border">
              <Camera className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Capture & Report</h3>
              <p className="text-muted-foreground">
                Take photos/videos of traffic violations with automatic GPS and timestamp recording.
              </p>
            </Card>
            <Card className="p-6 bg-card hover:bg-card-hover transition-colors border-border">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Verification</h3>
              <p className="text-muted-foreground">
                Advanced AI detects violations, blurs faces for privacy, and identifies license plates.
              </p>
            </Card>
            <Card className="p-6 bg-card hover:bg-card-hover transition-colors border-border">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Get points, badges, and monetary rewards for valid reports. Climb the leaderboard!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground">Reports Submitted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">85%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">500+</div>
              <div className="text-muted-foreground">Active Citizens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Civic Eye. Making cities safer, one report at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;