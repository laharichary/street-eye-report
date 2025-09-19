import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CitizenLayout } from "@/components/layouts/CitizenLayout";
import { Trophy, Medal, Award, Crown, TrendingUp, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CitizenLeaderboard = () => {
  const { user } = useAuth();

  const topUsers = [
    { id: 1, name: "Rajesh Kumar", points: 2850, reports: 95, accuracy: 94, badge: "diamond", rank: 1 },
    { id: 2, name: "Priya Sharma", points: 2340, reports: 78, accuracy: 91, badge: "gold", rank: 2 },
    { id: 3, name: "Amit Singh", points: 2100, reports: 72, accuracy: 89, badge: "gold", rank: 3 },
    { id: 4, name: "Sneha Patel", points: 1890, reports: 67, accuracy: 92, badge: "gold", rank: 4 },
    { id: 5, name: "Mohammed Ali", points: 1750, reports: 61, accuracy: 88, badge: "silver", rank: 5 },
    { id: 6, name: "Sarah Johnson", points: 1620, reports: 58, accuracy: 87, badge: "silver", rank: 6 },
    { id: 7, name: "David Chen", points: 1480, reports: 54, accuracy: 85, badge: "silver", rank: 7 },
    { id: 8, name: "Lisa Wang", points: 1340, reports: 49, accuracy: 86, badge: "silver", rank: 8 },
    { id: 9, name: "John Doe", points: 1290, reports: 47, accuracy: 84, badge: "silver", rank: 9 },
    { id: 10, name: "You", points: user?.points || 1250, reports: 47, accuracy: 89, badge: user?.badgeLevel || "silver", rank: user?.rank || 15 },
  ];

  const getBadgeIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-reward-gold" />;
      case 2: return <Medal className="h-6 w-6 text-reward-silver" />;
      case 3: return <Award className="h-6 w-6 text-reward-bronze" />;
      default: return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "diamond": return "text-reward-diamond";
      case "gold": return "text-reward-gold";
      case "silver": return "text-reward-silver";
      case "bronze": return "text-reward-bronze";
      default: return "text-muted-foreground";
    }
  };

  const achievements = [
    { name: "First Report", description: "Submit your first violation report", completed: true, icon: Target },
    { name: "Speed Demon Hunter", description: "Report 10 speeding violations", completed: true, icon: TrendingUp },
    { name: "Safety Guardian", description: "Achieve 90% accuracy rate", completed: true, icon: Award },
    { name: "Community Hero", description: "Reach top 20 in your city", completed: true, icon: Trophy },
    { name: "Platinum Reporter", description: "Submit 100 verified reports", completed: false, icon: Medal },
    { name: "Master Detective", description: "Reach Diamond level", completed: false, icon: Crown },
  ];

  return (
    <CitizenLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">
            See how you rank among fellow civic-minded citizens
          </p>
        </div>

        {/* User's Current Stats */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>Your Current Standing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#{user?.rank}</div>
                <div className="text-sm text-muted-foreground">City Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{user?.points}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">47</div>
                <div className="text-sm text-muted-foreground">Reports</div>
              </div>
              <div className="text-center">
                <Badge className={`${getBadgeColor(user?.badgeLevel || 'silver')} bg-card`}>
                  {user?.badgeLevel?.toUpperCase()} LEVEL
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Top Citizens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topUsers.slice(0, 10).map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                      user.name === "You" 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getBadgeIcon(user.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${user.name === "You" ? "text-primary" : ""}`}>
                          {user.name}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getBadgeColor(user.badge)}`}
                        >
                          {user.badge.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.reports} reports • {user.accuracy}% accuracy
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-primary">{user.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.completed 
                        ? "bg-success/10 border border-success/20" 
                        : "bg-muted/30"
                    }`}
                  >
                    <achievement.icon 
                      className={`h-6 w-6 ${
                        achievement.completed ? "text-success" : "text-muted-foreground"
                      }`} 
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${
                        achievement.completed ? "text-success" : "text-muted-foreground"
                      }`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.completed && (
                      <Badge variant="secondary" className="text-success">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Level Progress */}
            <Card className="bg-card border-border mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Progress to Gold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={83} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{user?.points} points</span>
                    <span>1500 needed</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    250 more points to unlock Gold benefits!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default CitizenLeaderboard;