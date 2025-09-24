import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

type Role = "investor" | "startup" | "admin" | "none";

export default function RoleGuard({
  allow,
  children,
}: {
  allow: Role[];
  children: ReactNode;
}) {
  const { user } = useAuth();
  if (!user) return null;
  if (!allow.includes(user.role as Role)) return <Navigate to="/" replace />;
  return children;
}
