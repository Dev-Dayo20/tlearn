import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import { MainSiteRoutes } from "./routes/MainSiteRoutes";
import { useSchoolStore } from "./store/SchoolStore";
import { useInitializeSchool } from "./hooks/useInitializeSchool";
import { SchoolRoutes } from "./routes/SchoolRoutes";
import SchoolSkeletonLoader from "./components/admin/SchoolSkeletonLoader";
import SchoolNotFound from "./components/admin/SchoolNotFound";

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

const App = () => {
  useInitializeSchool();
  const { school, isLoading, isMainSite } = useSchoolStore();
  console.log("Debug:", { school, isLoading, isMainSite });
  console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("Main Site URL:", import.meta.env.VITE_MAIN_SITE_URL);

  if (isLoading) {
    return <SchoolSkeletonLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {isMainSite ? (
              MainSiteRoutes()
            ) : school ? (
              SchoolRoutes(school)
            ) : (
              <Route path="*" element={<SchoolNotFound />} />
            )}
          </Routes>
          {/* {isMainSite ? <MainSiteRoutes /> : <Navigate to="/unauthorized" />} */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
