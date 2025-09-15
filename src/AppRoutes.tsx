import ProtectedRoute from "@/components/routing/ProtectedRoute";
import RoleGuard from "@/components/routing/RoleGuard";
import { Route, Routes } from "react-router";
import { InvestorDashboardPage } from "./pages/InvestorDashboardPage";
import HomePage from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { InvestmentPlansPage } from "./pages/InvestmentPlansPage";
import AssetFinancingPage from "./pages/AssetFinancingPage";
import { ShariahCompliancePage } from "./pages/ShariahCompliancePage";
import TeamPage from "./pages/TeamPage";
import { ContactPage } from "./pages/ContactPage";
import InvestmentPlanDetailPage from "./pages/InvestmentPlanDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { InvestorVerificationPage } from "./pages/InvestorVerificationPage";
import NotFoundPage from "./components/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/asset-financing" element={<AssetFinancingPage />} />
      <Route path="/plans" element={<InvestmentPlansPage />} />
      <Route path="/plans/:planId" element={<InvestmentPlanDetailPage />} />
      <Route path="/shariah" element={<ShariahCompliancePage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/investor-verification"
        element={
          <ProtectedRoute>
            <InvestorVerificationPage />
          </ProtectedRoute>
        }
      />
      {/* Protected Routes  */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allow={["investor"]}>
              <InvestorDashboardPage />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply-for-funding"
        element={
          <ProtectedRoute>
            <RoleGuard allow={["startup"]}>
              funding application comming soon
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Both investor and business users */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <RoleGuard allow={["investor", "startup"]}>
              {/* <ProfilePage /> */}
              comming soon
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      {/* Admin-only routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allow={["admin"]}>
              {/* <AdminDashboardPage /> */}
              comming soon
            </RoleGuard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
