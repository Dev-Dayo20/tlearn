import axios from "axios";
import { School, SchoolDomainResponse } from "@/types/types";
import axiosInstance from "@/lib/axios";

export const getTenantFromUrl = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");
  // console.log("Hostname:", hostname);
  // console.log("Hostname parts:", parts);

  // If subdomain exists
  if (parts.length >= 3 && parts[0] !== "www") {
    // console.log("Subdomain detected:", parts[0]);
    return parts[0];
  }
  //  Get subdomain from localhost for development
  if (hostname.includes("localhost") && parts.length >= 2) {
    return parts[0];
  }
  // No subdomain
  // console.log("No subdomain detected");
  return null;
};

export const isMainSite = () => {
  return getTenantFromUrl() === null;
};

export const getSchoolSlug = () => {
  return getTenantFromUrl();
};

export const getSchoolBySubdomain = async (
  subdomain: string
): Promise<SchoolDomainResponse> => {
  try {
    const response = await axiosInstance.get(
      `/tlearn/sch-admin/school/${subdomain}`
    );
    console.log("Fetched school data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching school data:", error);
    return null;
  }
};
