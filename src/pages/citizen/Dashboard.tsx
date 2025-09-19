import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Camera, Trophy, Target, Award, LogOut, Users, TrendingUp } from "lucide-react";
import { CitizenLayout } from "@/components/layouts/CitizenLayout";

const CitizenDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = {
    reportsSubmitted: 47,
    reportsVerified: 42,
    points: user?.points || 1250,
    rank: user?.rank || 15,
    nextLevelPoints: 1500,
    monthlyReports: 12,
    accuracy: 89
  };

  const recentBadges = [
    { name: "Speed Detector", icon: Target, color: "violation-speed" },
    { name: "Safety Guardian", icon: Award, color: "success" },
    { name: "Top Reporter", icon: Trophy, color: "reward-gold" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <CitizenLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              You're making your city safer, one report at a time.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={`bg-reward-${user?.badgeLevel} text-white px-3 py-1`}
            >
              {user?.badgeLevel?.toUpperCase()} CITIZEN
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-primary to-primary-glow text-white cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => navigate('/citizen/report')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Camera className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">Report Violation</h3>
                  <p className="text-blue-100">Capture and submit new reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-success to-primary text-white cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/citizen/leaderboard')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Trophy className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">Leaderboard</h3>
                  <p className="text-green-100">Check your ranking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.reportsSubmitted}</div>
              <div className="text-xs text-muted-foreground">
                {stats.reportsVerified} verified
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.points}</div>
              <div className="text-xs text-muted-foreground">
                {stats.nextLevelPoints - stats.points} to next level
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">City Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">#{stats.rank}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Moving up
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.accuracy}%</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Level */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Progress to Gold Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stats.points} points</span>
                <span>{stats.nextLevelPoints} points needed</span>
              </div>
              <Progress 
                value={(stats.points / stats.nextLevelPoints) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                Just {stats.nextLevelPoints - stats.points} more points to unlock Gold benefits!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Badges */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {recentBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <badge.icon className={`h-8 w-8 text-${badge.color}`} />
                  <div>
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">Earned 2 days ago</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CitizenLayout>
  );
};

export default CitizenDashboard;