import { create } from "zustand";
import { SchoolDomainResponse } from "@/types/types";
import {
  getTenantFromUrl,
  getSchoolBySubdomain,
  isAdminSite,
  isMainSite,
} from "@/utils/tenantHelpers";

interface SchoolContexts {
  school: SchoolDomainResponse | null;
  isLoading: boolean;
  isMainSite: boolean;
  isAdminSite: boolean;
  initializeSchool: () => Promise<void>;
}

export const useSchoolStore = create<SchoolContexts>()((set, get) => ({
  school: null,
  isLoading: false,
  isMainSite: false,
  isAdminSite: false,

  initializeSchool: async () => {
    set({ isLoading: true });

    const adminSite = isAdminSite();
    const mainSite = isMainSite();
    const tenant = getTenantFromUrl();

    if (adminSite) {
      set({
        isLoading: false,
        isMainSite: false,
        isAdminSite: true,
        school: null,
      });
      return;
    }

    if (mainSite) {
      set({
        isLoading: false,
        isMainSite: true,
        isAdminSite: false,
        school: null,
      });
      return;
    }

    // This must be a school subdomain (school1.tlearn.africa)
    if (tenant) {
      try {
        const schoolData = await getSchoolBySubdomain(tenant);
        set({
          school: schoolData,
          isLoading: false,
          isMainSite: false,
          isAdminSite: false,
        });
      } catch (error) {
        // console.error("Failed to load school data:", error);
        set({
          isLoading: false,
          school: null,
          isMainSite: false,
          isAdminSite: false,
        });
      }
    } else {
      // Should not happen, but as fallback
      set({
        isLoading: false,
        isMainSite: true,
        isAdminSite: false,
        school: null,
      });
    }
  },
}));
