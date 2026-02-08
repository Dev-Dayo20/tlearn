import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "TEACHER";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    if (requiredRole === "SUPER_ADMIN") {
      return <Navigate to="/super-admin/login" replace />;
    }
    if (requiredRole === "ADMIN") {
      return <Navigate to="/school-admin/login" replace />;
    }
    if (requiredRole === "STUDENT") {
      return <Navigate to="/student/login" replace />;
    }
    if (requiredRole === "TEACHER") {
      return <Navigate to="/teacher/login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <> {children} </>;
};
