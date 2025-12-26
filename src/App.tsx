import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import { MainSiteRoutes } from "./routes/MainSiteRoutes";
import { useSchoolStore } from "./store/SchoolStore";
import { useInitializeSchool } from "./hooks/useInitializeSchool";

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

  // console.log("Debug:", { school, isLoading, isMainSite });
  if (isLoading) {
    return <div>Loading...</div>;
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
              <Route
                path="*"
                element={<div>School Portal - {school.name}</div>}
              />
            ) : (
              <Route path="*" element={<Unauthorized />} />
            )}
          </Routes>
          {/* {isMainSite ? <MainSiteRoutes /> : <Navigate to="/unauthorized" />} */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
