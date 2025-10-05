import ProtectedRoute from "@/features/auth/routing/ProtectedRoute";
import RoleGuard from "@/features/auth/routing/RoleGuard";
import OnboardingGuard from "@/features/auth/routing/OnboardingGuard";
import { Route, Routes } from "react-router";
import Loader from "../components/feedback/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import StartupApplicationPage from "../features/startup/pages/StartupVerification";
import ProfileChoicePage from "../features/shared/pages/ChooseProfile-Role";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import NotFoundPage from "@/components/feedback/NotFound";
import Users from "@/features/admin/pages/Users";
import Verification from "@/features/admin/pages/Verification";
import UserVerificationDetails from "@/features/admin/pages/UserVerificationDetails";
import ManageCarouselPage from "@/features/admin/carousel/pages/ManageCarouselPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() =>
  import("../pages/About").then((module) => ({ default: module.AboutPage }))
);
const InvestmentPlansPage = lazy(() =>
  import("../pages/InvestmentPlans").then((module) => ({
    default: module.InvestmentPlansPage,
  }))
);
const AssetFinancingPage = lazy(() => import("../pages/BusinessFinancing"));
const TeamPage = lazy(() => import("../pages/Team"));
const ContactPage = lazy(() =>
  import("../pages/Contact").then((module) => ({
    default: module.ContactPage,
  }))
);
const InvestmentPlanDetailPage = lazy(
  () => import("../pages/InvestmentPlanDetails")
);
const LoginPage = lazy(() =>
  import("../features/auth/pages/Login").then((module) => ({
    default: module.LoginPage,
  }))
);
const RegisterPage = lazy(() =>
  import("../features/auth/pages/Register").then((module) => ({
    default: module.RegisterPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import("../features/auth/pages/Forget-ResetPassword").then((module) => ({
    default: module.default,
  }))
);
const UpdateProfilePage = lazy(() =>
  import("../features/shared/pages/Profile").then((module) => ({
    default: module.default,
  }))
);
const VerifyEmailPage = lazy(() =>
  import("../features/auth/pages/VerifyEmail").then((module) => ({
    default: module.default,
  }))
);
const ForgotPasswordPage = lazy(() =>
  import("../features/auth/pages/ForgotPassword").then((module) => ({
    default: module.default,
  }))
);
const InvestorVerificationPage = lazy(() =>
  import("../features/investors/personal/pages/InvestorVerification").then(
    (module) => ({
      default: module.InvestorVerificationPage,
    })
  )
);
const VerificationSuccessPage = lazy(() =>
  import("../features/shared/pages/VerificationSuccess").then(
    (module) => ({
      default: module.VerificationSuccessPage,
    })
  )
);
const DashboardPage = lazy(() =>
  import("../features/shared/pages/Dashboard").then((module) => ({
    default: module.DashboardPage,
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
                <OnboardingGuard>
                  <ProfileChoicePage />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/investor-verification"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor"]}>
                  <OnboardingGuard>
                    <Suspense fallback={<Loader />}>
                      <InvestorVerificationPage />
                    </Suspense>
                  </OnboardingGuard>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/verification-success"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor"]}>
                  <OnboardingGuard>
                    <Suspense fallback={<Loader />}>
                      <VerificationSuccessPage />
                    </Suspense>
                  </OnboardingGuard>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply-for-funding"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["startup"]}>
                  <OnboardingGuard>
                    <StartupApplicationPage />
                  </OnboardingGuard>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor", "startup"]}>
                  <OnboardingGuard>
                    <Suspense fallback={<Loader />}>
                      <DashboardPage />
                    </Suspense>
                  </OnboardingGuard>
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["investor", "startup", "admin"]}>
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
                  <AdminDashboard />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/verification"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["admin"]}>
                  <Verification />
                </RoleGuard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/verification/:userId"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["admin"]}>
                  <UserVerificationDetails />
                </RoleGuard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["admin"]}>
                  <Users />
                </RoleGuard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/carousel"
            element={
              <ProtectedRoute>
                <RoleGuard allow={["admin"]}>
                  <ManageCarouselPage />
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
