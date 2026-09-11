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

// Student Pages
import { StudentLayout } from "@/components/student/StudentLayout";
import StudentDashboard from "@/pages/student/Dashboard";
import Lessons from "@/pages/student/Lessons";
import Exams from "@/pages/student/Exams";
import TakeExam from "@/pages/student/TakeExam";
import StudentSettings from "@/pages/student/Settings";
import Leaderboard from "@/pages/student/Leaderboard";
import DigitalCourses from "@/pages/student/DigitalCourses";

import Teachers from "@/pages/admin/Teachers";
import Subjects from "@/pages/admin/Subjects";

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
        <Route path="subjects" element={<Subjects school={school} />} />
        <Route path="materials" element={<Materials school={school} />} />
        {/* Analytics Route */}
        <Route path="analytics" element={<Analytics />} />
        {/* Settings Route */}
        <Route path="settings" element={<Settings />} />
        <Route path="teachers" element={<Teachers school={school} />} />
      </Route>

      {/* Student protected routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute requiredRole="STUDENT">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="digital-courses" element={<DigitalCourses />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="exams" element={<Exams />} />
        <Route path="exams/:id" element={<TakeExam />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </>
  );
};
