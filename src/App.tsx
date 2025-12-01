import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

import LoginSuperAdmin from "./pages/super-admin/LoginSuperAdmin";
import DashboardLayout from "./pages/super-admin/DashboardLayout";
import Dashboard from "./pages/super-admin/Dashboard";
import School from "./pages/super-admin/SchoolPage";
import UsersPage from "./pages/super-admin/UsersPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/super-admin/login" element={<LoginSuperAdmin />} />

          {/* SUPER ADMIN PROTECTED ROUTES */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute requiredRole="SUPER_ADMIN">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="school" element={<School />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
