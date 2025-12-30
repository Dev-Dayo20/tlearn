import { Routes, Route, Navigate } from "react-router-dom";
import LoginSchoolAdmin from "@/pages/admin/LoginSchoolAdmin";
import { School, SchoolDomainResponse } from "@/types/types";
import { ProtectedRoute } from "@/utils/ProtectedRoute";
import { DashboardLayout } from "@/pages/admin/DashboardLayout";
import SchoolNotFound from "@/components/admin/SchoolNotFound";

export const SchoolRoutes = (school: SchoolDomainResponse | null) => {
  if (!school) {
    return <SchoolNotFound />;
  }

  return (
    <>
      {/* Public school routes */}
      <Route path="/" element={<Navigate to="/school-admin/login" replace />} />
      <Route
        path="/school-admin/login"
        element={
          <LoginSchoolAdmin school={school} logoUrl={school.school.logo} />
        }
      />

      {/* School admin protected routes */}
      <Route
        path="/school-admin/*"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={<div>School Admin Dashboard for {school.school.name}</div>}
        />
        <Route
          path="students"
          element={<div>Students Page for {school.school.name}</div>}
        />
        <Route
          path="teachers"
          element={<div>Teachers Page for {school.school.name}</div>}
        />
      </Route>
    </>
  );
};
