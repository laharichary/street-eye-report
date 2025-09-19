import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Camera, Trophy, Eye, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const menuItems = [
  { title: "Dashboard", url: "/citizen", icon: Home },
  { title: "Report Violation", url: "/citizen/report", icon: Camera },
  { title: "Leaderboard", url: "/citizen/leaderboard", icon: Trophy },
];

interface CitizenLayoutProps {
  children: React.ReactNode;
}

export function CitizenLayout({ children }: CitizenLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-60' : 'w-14'} transition-all duration-300 border-r border-border bg-card`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Eye className={`h-6 w-6 text-primary ${!isSidebarOpen ? 'mx-auto' : ''}`} />
            {isSidebarOpen && (
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Civic Eye
              </span>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.url)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-card-hover text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {isSidebarOpen && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center border-b border-border bg-card px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </header>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}