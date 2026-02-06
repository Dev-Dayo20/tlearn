import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginSuperAdmin from "@/pages/super-admin/LoginSuperAdmin";
import DashboardLayout from "@/pages/super-admin/DashboardLayout";
import Dashboard from "@/pages/super-admin/Dashboard";
import School from "@/pages/super-admin/SchoolPage";
import UsersPage from "@/pages/super-admin/UsersPage";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/utils/ProtectedRoute";

export const MainSiteRoutes = () => {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
