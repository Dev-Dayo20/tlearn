import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "SUPER_ADMIN" | "ADMIN" | "STUDENT";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, checkTokenExpiry } = useAuthStore();

  useEffect(() => {
    checkTokenExpiry();
  }, [checkTokenExpiry]);

  if (!isAuthenticated) {
    if (requiredRole === "SUPER_ADMIN") {
      return <Navigate to="/super-admin/login" replace />;
    }
    if (requiredRole === "ADMIN") {
      return <Navigate to="/school/login" replace />;
    }
    if (requiredRole === "STUDENT") {
      return <Navigate to="/student/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <> {children} </>;
};
