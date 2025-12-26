import axios from "axios";
import { School } from "@/types/types";

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
  // console.log("No subdomain - main site");
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
): Promise<School | null> => {
  try {
    const response = await axios.get(`/api/schools/${subdomain}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching school data:", error);
    return null;
  }
};
