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
  const investorType = user?.investorType || "none"; // Get investor type from user

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Helper: next step based on current user state
  const getNextStep = () => {
    if (!user.role || user.role === "none") return "/choose-profile";
    if (user.role === "admin") return "/admin";

    if (user.role === "investor") {
      // If investor hasn't chosen type yet, send to type selection
      if (!investorType || investorType === "none") return "/investor-type";

      if (kycStatus === "approved" || user.isVerified) return "/dashboard";
      if (kycStatus === "rejected") {
        return investorType === "personal"
          ? "/investor-verification"
          : "/corporate-verification";
      }
      if (submitted) return "/verification-success";

      return investorType === "personal"
        ? "/investor-verification"
        : "/corporate-verification";
    }

    if (user.role === "startup") {
      if (kycStatus === "approved" || user.isVerified) return "/dashboard";
      if (kycStatus === "rejected") return "/apply-for-funding";
      if (submitted) return "/verification-success";
      return "/apply-for-funding";
    }

    return "/dashboard";
  };

  // Once a role is chosen, never allow /choose-profile again
  const hasChosenRole = !!user?.role && user.role !== "none";
  if (hasChosenRole && path === "/choose-profile") {
    return <Navigate to={getNextStep()} replace />;
  }

  // Once investor type is chosen, don't allow going back to type selection
  const hasChosenInvestorType =
    user?.role === "investor" && !!investorType && investorType !== "none";

  if (hasChosenInvestorType && path === "/investor-type") {
    return <Navigate to={getNextStep()} replace />;
  }

  // Admins stay off user onboarding pages
  if (user.role === "admin" && path !== "/admin" && path !== "/profile") {
    return <Navigate to="/admin" replace />;
  }

  // Investor flow gating
  if (user.role === "investor") {
    // If investor hasn't chosen type yet, force them to type selection
    if (!investorType || investorType === "none") {
      if (path !== "/investor-type") {
        return <Navigate to="/investor-type" replace />;
      }
      return <>{children}</>;
    }

    const isPersonal = investorType === "personal";
    const onPersonalVerify = path === "/investor-verification";
    const onCorporateVerify = path === "/corporate-verification";
    const onCorrectVerify = isPersonal ? onPersonalVerify : onCorporateVerify;
    const onWrongVerify = isPersonal ? onCorporateVerify : onPersonalVerify;

    const onSuccess = path === "/verification-success";

    // Redirect from wrong verification form to correct one
    if (onWrongVerify) {
      return <Navigate to={getNextStep()} replace />;
    }

    // If approved/verified, keep away from onboarding pages
    if (kycStatus === "approved" || user.isVerified) {
      if (
        onCorrectVerify ||
        onSuccess ||
        path === "/choose-profile" ||
        path === "/investor-type"
      ) {
        return <Navigate to="/dashboard" replace />;
      }
      return <>{children}</>;
    }

    // Rejected -> force back to verification form
    if (kycStatus === "rejected") {
      if (!onCorrectVerify) return <Navigate to={getNextStep()} replace />;
      return <>{children}</>;
    }

    // Pending/submitted -> success holding page
    if (submitted) {
      if (!onSuccess) return <Navigate to="/verification-success" replace />;
      return <>{children}</>;
    }

    // No submission yet -> verification form
    if (!onCorrectVerify) return <Navigate to={getNextStep()} replace />;
    return <>{children}</>;
  }

  // Startup flow gating
  if (user.role === "startup") {
    const onVerify = path === "/apply-for-funding";
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
      if (!onVerify) return <Navigate to="/apply-for-funding" replace />;
      return <>{children}</>;
    }

    // Pending/submitted -> success holding page
    if (submitted) {
      if (!onSuccess) return <Navigate to="/verification-success" replace />;
      return <>{children}</>;
    }

    // No submission yet -> verification form
    if (!onVerify) return <Navigate to="/apply-for-funding" replace />;
    return <>{children}</>;
  }

  return <>{children}</>;
}
