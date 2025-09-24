import ProtectedRoute from "@/components/routing/ProtectedRoute";
import RoleGuard from "@/components/routing/RoleGuard";
import { Route, Routes } from "react-router";
import NotFoundPage from "./components/NotFound";
import Loader from "./components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import StartupApplicationPage from "./pages/StartupApplicationPage";
import ProfileChoicePage from "./pages/ProfileChoicePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const InvestmentPlansPage = lazy(() =>
  import("./pages/InvestmentPlansPage").then((module) => ({
    default: module.InvestmentPlansPage,
  }))
);
const AssetFinancingPage = lazy(() => import("./pages/AssetFinancingPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);
const InvestmentPlanDetailPage = lazy(
  () => import("./pages/InvestmentPlanDetailPage")
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage").then((module) => ({
    default: module.default,
  }))
);
const UpdateProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((module) => ({
    default: module.default,
  }))
);
const VerifyEmailPage = lazy(() =>
  import("./pages/VerifyEmailPage").then((module) => ({
    default: module.default,
  }))
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage").then((module) => ({
    default: module.default,
  }))
);
const InvestorVerificationPage = lazy(() =>
  import("./pages/InvestorVerificationPage").then((module) => ({
    default: module.InvestorVerificationPage,
  }))
);
const InvestorDashboardPage = lazy(() =>
  import("./pages/Dashboard").then((module) => ({
    default: module.InvestorDashboardPage,
  }))
);

export default function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Loader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/asset-financing"
            element={
              <Suspense fallback={<Loader />}>
                <AssetFinancingPage />
              </Suspense>
            }
          />
          <Route
            path="/plans"
            element={
              <Suspense fallback={<Loader />}>
                <InvestmentPlansPage />
              </Suspense>
            }
          />
          <Route
            path="/plans/:planId"
            element={
              <Suspense fallback={<Loader />}>
                <InvestmentPlanDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/team"
            element={
              <Suspense fallback={<Loader />}>
                <TeamPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loader />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loader />}>
                <ForgotPasswordPage />
              </Suspense>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Suspense fallback={<Loader />}>
                <VerifyEmailPage />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<Loader />}>
                <ResetPasswordPage />
              </Suspense>
            }
          />

          {/* Protected Routes  */}
          <Route
            path="/choose-profile"
            element={
              <ProtectedRoute>
                <ProfileChoicePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investor-verification"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor"]}>
                  <Suspense fallback={<Loader />}>
                    <InvestorVerificationPage />
                  </Suspense>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply-for-funding"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["startup"]}>
                  <StartupApplicationPage />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          {/* Both investor and business users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor", "startup"]}>
                  <Suspense fallback={<Loader />}>
                    <InvestorDashboardPage />
                  </Suspense>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor", "startup"]}>
                  <Suspense fallback={<Loader />}>
                    <UpdateProfilePage />
                  </Suspense>
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

        <Toaster richColors position="top-right" duration={3000} />
      </motion.div>
    </AnimatePresence>
  );
}
