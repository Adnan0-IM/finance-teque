import { Navigate, useLocation } from "react-router";
import type{ PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";

type Role = "investor" | "startup" | "admin" | "none";
export default function RoleGuard({
  allow,
  children,
}: PropsWithChildren<{ allow: Role[] }>) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (!allow.includes(user.role as Role)) {
    if (user.role === "admin") {
      // Admins go to admin dashboard
      return <Navigate to="/admin" replace />;
    }
    // If no role chosen, push to chooser
    if (!user.role || user.role === "none") {
      return <Navigate to="/choose-profile" replace />;
    }
    // Otherwise block
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
