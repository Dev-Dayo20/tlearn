import { useEffect } from "react";
import { create } from "zustand";
import { School, SchoolDomainResponse } from "@/types/types";
import { getTenantFromUrl, getSchoolBySubdomain } from "@/utils/tenantHelpers";

interface SchoolContexts {
  school: SchoolDomainResponse | null;
  isLoading: boolean;
  isMainSite: boolean;
  initializeSchool: () => Promise<void>;
}

export const useSchoolStore = create<SchoolContexts>()((set, get) => ({
  school: null,
  isLoading: false,
  isMainSite: false,

  initializeSchool: async () => {
    set({ isLoading: true });
    const subdomain = getTenantFromUrl();

    if (!subdomain) {
      set({ isLoading: false, isMainSite: true, school: null });
      return;
    }

    try {
      const schoolData = await getSchoolBySubdomain(subdomain);
      set({ school: schoolData, isLoading: false, isMainSite: false });
    } catch (error) {
      console.error("Failed to load school data:", error);
      set({ isLoading: false, school: null, isMainSite: false });
    }
  },
}));
