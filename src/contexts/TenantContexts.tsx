import { getTenantFromUrl, getSchoolBySubdomain } from "@/utils/tenantHelpers";
import { createContext, useContext, useEffect, useState } from "react";
import { School } from "@/types/types";

interface TenantContextType {
  school: School;
  isLoading: Boolean;
  isMainSite: Boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [school, setSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMainSite, setIsMainSite] = useState(false);

  useEffect(() => {
    const loadSchool = async () => {
      const subdomain = getTenantFromUrl();
      if (!subdomain) {
        setIsLoading(false);
        setIsMainSite(true);
        return;
      }

      try {
        const schoolData = await getSchoolBySubdomain(subdomain);
        setSchool(schoolData);
      } catch (error) {
        console.error("Failed to load school data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSchool();
  }, []);

  return (
    <TenantContext.Provider value={{ school, isLoading, isMainSite }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
