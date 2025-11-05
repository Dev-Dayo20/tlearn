import axios from "axios";

export const getTenantFromUrl = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  // If subdomain exists
  if (parts.length >= 3 && parts[0] !== "www") {
    return parts[0];
  }
  return null;
};

export const isMainSite = () => {
  return getTenantFromUrl() === null;
};

export const getSchoolSlug = () => {
  return getTenantFromUrl();
};

export const getSchoolBySubdomain = async (subdomain: string) => {
  try {
    const response = await axios.get(`/api/schools/${subdomain}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching school data:", error);
    return null;
  }
};
