import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainSiteRoutes } from "./routes/MainSiteRoutes";
import { useSchoolStore } from "./store/SchoolStore";
import { SchoolRoutes } from "./routes/SchoolRoutes";
import SchoolSkeletonLoader from "./components/admin/SchoolSkeletonLoader";
import SchoolNotFound from "./components/admin/SchoolNotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminApp } from "./routes/AdminApp";

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

import { useNetworkListener } from "./hooks/useNetworkListener";

const App = () => {
  useNetworkListener();
  const {
    school,
    isLoading,
    isMainSite,
    isAdminSite,
    initializeSchool,
    isInitialized,
  } = useSchoolStore();

  useEffect(() => {
    initializeSchool();
  }, [initializeSchool]);

  if (isLoading || !isInitialized) {
    return <SchoolSkeletonLoader />;
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="tlearn-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" expand={true} richColors />
          <BrowserRouter>
            <Routes>
              {isAdminSite ? (
                AdminApp()
              ) : isMainSite ? (
                MainSiteRoutes()
              ) : school ? (
                SchoolRoutes(school)
              ) : (
                <Route path="*" element={<SchoolNotFound />} />
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
