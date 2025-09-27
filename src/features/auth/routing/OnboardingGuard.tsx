import { Navigate, useLocation } from "react-router";
import {type PropsWithChildren, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

// Central gate for role picking + KYC/verification flow
export default function OnboardingGuard({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const path = location.pathname;

  const kycStatus = useMemo<"approved" | "pending" | "rejected" | null>(() => {
    if (!user) return null;
    return (
      (user.verification?.status as "approved" | "pending" | "rejected") ??
      (user.isVerified ? "approved" : "pending")
    );
  }, [user]);

  const submitted =
    !!user?.verification?.submittedAt ||
    user?.verification?.status === "pending";

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Must pick a role
  if (!user.role || user.role === "none") {
    if (path !== "/choose-profile") {
      return <Navigate to="/choose-profile" replace />;
    }
    return <>{children}</>;
  }

  // Investor flow gating
  if (user.role === "investor") {
    const onVerify = path === "/investor-verification";
    const onSuccess = path === "/verification-success";

    if (kycStatus !== "approved") {
      // If submitted -> success/awaiting page
      if (submitted) {
        if (!onSuccess) return <Navigate to="/verification-success" replace />;
        return <>{children}</>;
      }
      // Not submitted -> verification form
      if (!onVerify) return <Navigate to="/investor-verification" replace />;
      return <>{children}</>;
    }

    // Approved; keep user away from onboarding pages
    if (onVerify || onSuccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Startup flow gating
  if (user.role === "startup") {
    const onApply = path === "/apply-for-funding";
    if (!user.isVerified) {
      if (!onApply) return <Navigate to="/apply-for-funding" replace />;
      return <>{children}</>;
    }
    if (onApply) return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
