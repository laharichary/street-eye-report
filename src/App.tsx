import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenReport from "./pages/citizen/Report";
import CitizenLeaderboard from "./pages/citizen/Leaderboard";
import PoliceDashboard from "./pages/police/Dashboard";
import PoliceReports from "./pages/police/Reports";
import PoliceInsights from "./pages/police/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Citizen Routes */}
            <Route path="/citizen" element={
              <ProtectedRoute requiredRole="citizen">
                <CitizenDashboard />
              </ProtectedRoute>
            } />
            <Route path="/citizen/report" element={
              <ProtectedRoute requiredRole="citizen">
                <CitizenReport />
              </ProtectedRoute>
            } />
            <Route path="/citizen/leaderboard" element={
              <ProtectedRoute requiredRole="citizen">
                <CitizenLeaderboard />
              </ProtectedRoute>
            } />
            
            {/* Police Routes */}
            <Route path="/police" element={
              <ProtectedRoute requiredRole="police">
                <PoliceDashboard />
              </ProtectedRoute>
            } />
            <Route path="/police/reports" element={
              <ProtectedRoute requiredRole="police">
                <PoliceReports />
              </ProtectedRoute>
            } />
            <Route path="/police/insights" element={
              <ProtectedRoute requiredRole="police">
                <PoliceInsights />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;