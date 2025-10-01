import { Navigate, useLocation } from "react-router";
import { type PropsWithChildren, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

// Central gate for role picking + KYC/verification flow
export default function OnboardingGuard({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const path = location.pathname;

  const kycStatus = useMemo<"approved" | "pending" | "rejected" | null>(() => {
    if (!user) return null;
    return user.verification?.status as "approved" | "pending" | "rejected";
  }, [user]);

  const submitted = Boolean(user?.verification?.submittedAt);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Helper: next step based on current user state
  const getNextStep = () => {
    if (!user.role || user.role === "none") return "/choose-profile";
    if (user.role === "admin") return "/admin";

    if (user.role === "investor") {
      if (kycStatus === "approved" || user.isVerified) return "/dashboard";
      if (kycStatus === "rejected") return "/investor-verification";
      if (submitted) return "/verification-success";
      return "/investor-verification";
    }

    if (user.role === "startup") {
      if (user.isVerified) return "/dashboard";
      return "/apply-for-funding";
    }

    return "/dashboard";
  };

  // Once a role is chosen, never allow /choose-profile again
  if (user.role && path === "/choose-profile") {
    return <Navigate to={getNextStep()} replace />;
  }

  // Admins stay off user onboarding pages
  if (user.role === "admin" && path !== "/admin" && path !== "/profile") {
    return <Navigate to="/admin" replace />;
  }

  // Investor flow gating
  if (user.role === "investor") {
    const onVerify = path === "/investor-verification";
    const onSuccess = path === "/verification-success";

    // If approved/verified, keep away from onboarding pages
    if (kycStatus === "approved" || user.isVerified) {
      if (onVerify || onSuccess || path === "/choose-profile") {
        return <Navigate to="/dashboard" replace />;
      }
      return <>{children}</>;
    }

    // Rejected -> force back to verification form
    if (kycStatus === "rejected") {
      if (!onVerify) return <Navigate to="/investor-verification" replace />;
      return <>{children}</>;
    }

    // Pending/submitted -> success holding page
    if (submitted) {
      if (!onSuccess) return <Navigate to="/verification-success" replace />;
      return <>{children}</>;
    }

    // No submission yet -> verification form
    if (!onVerify) return <Navigate to="/investor-verification" replace />;
    return <>{children}</>;
  }

  // Startup flow gating
  if (user.role === "startup") {
    const onApply = path === "/apply-for-funding";

    if (!user.isVerified) {
      if (!onApply) return <Navigate to="/apply-for-funding" replace />;
      return <>{children}</>;
    }

    // Verified startup: keep away from onboarding pages
    if (onApply || path === "/choose-profile")
      return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
