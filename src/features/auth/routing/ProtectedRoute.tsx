import { Navigate, useLocation } from "react-router";
import type{ PropsWithChildren } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a loader

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
