import { Routes, Route, Navigate } from "react-router-dom";
import LoginSchoolAdmin from "@/pages/admin/LoginSchoolAdmin";
import { School, SchoolDomainResponse } from "@/types/types";
import { ProtectedRoute } from "@/utils/ProtectedRoute";

import { DashboardLayout } from "@/pages/admin/DashboardLayout";
import SchoolNotFound from "@/components/admin/SchoolNotFound";
import Dashboard from "@/pages/admin/Dashboard";
import Students from "@/pages/admin/Students";
import Classes from "@/pages/admin/Classes";
import Materials from "@/pages/admin/Materials";
import ClassDetail from "@/pages/admin/ClassDetails";
import Analytics from "@/pages/admin/Analytics";
import Settings from "@/pages/admin/Settings";

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
        path="/school-admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students school={school} />} />
        <Route path="classes" element={<Classes school={school} />} />
        <Route path="classes/:id" element={<ClassDetail />} />
        <Route path="materials" element={<Materials school={school} />} />
        {/* Analytics Route */}
        <Route path="analytics" element={<Analytics />} />
        {/* Settings Route */}
        <Route path="settings" element={<Settings />} />
        <Route
          path="teachers"
          element={<div>Teachers Page for {school.school.name}</div>}
        />
      </Route>
    </>
  );
};
