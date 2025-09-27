import { Navigate } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import type { ReactNode } from "react";

type Role = "investor" | "startup" | "admin" | "none";

const toRole = (r: unknown): Role => {
  const v = String(r ?? "")
    .trim()
    .toLowerCase();
  if (v === "admin") return "admin";
  if (v === "investor") return "investor";
  if (v === "startup" || v === "founder") return "startup";
  return "none";
};

export default function RoleGuard({
  allow,
  children,
}: {
  allow: Role[];
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  // Wait for auth to resolve
  if (loading) return null;


  const role = toRole(user?.role);

  if (!allow.includes(role)) {
    if (role === "none") return <Navigate to="/choose-profile" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
