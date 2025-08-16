import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { InvestmentPlansPage } from "./pages/InvestmentPlansPage";
import { ShariahCompliancePage } from "./pages/ShariahCompliancePage";
import { ContactPage } from "./pages/ContactPage";
import { TeamPage } from "./pages/TeamPage";
import Navigation from "./components/Navigation";
import InvestmentPlanDetailPage from "./pages/InvestmentPlanDetailPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { InvestorVerificationPage } from "./pages/InvestorVerificationPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import RouteToTop from "./components/RouteToTop";
import { InvestorDashboardPage } from "./pages/InvestorDashboardPage";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
export default function App() {
  return (
    <AuthProvider>

    <Router>
        <RouteToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plans" element={<InvestmentPlansPage />} />
        <Route path="/shariah" element={<ShariahCompliancePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/plans/:planId" element={<InvestmentPlanDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected routes */}
        <Route path="/investor-verification" element={<ProtectedRoute><InvestorVerificationPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><InvestorDashboardPage /></ProtectedRoute>} />
      </Routes>
    </Router>

    </AuthProvider>
  );
}

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Navigation />
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
    </div>
  );
};
