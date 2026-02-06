import axios from "axios";
import { School, SchoolDomainResponse } from "@/types/types";
import axiosInstance from "@/lib/axios";

export const getTenantFromUrl = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  // Handle localhost development
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return null;
  }

  // Handle localhost with subdomain (e.g., school1.localhost)
  if (hostname.includes("localhost") && parts.length >= 2) {
    return parts[0];
  }

  // Handle Vercel domains
  if (hostname.includes("vercel.app")) {
    // tlearn-ten.vercel.app = MAIN SITE (3 parts)
    if (parts.length === 3) {
      return null;
    }
    // school1.tlearn-ten.vercel.app = SCHOOL SUBDOMAIN (4 parts)
    if (parts.length === 4) {
      return parts[0];
    }
    return null;
  }

  // If it's just domain.com or www.domain.com = main site
  if (parts.length === 2 || (parts.length === 3 && parts[0] === "www")) {
    // console.log("Production main site detected");
    return null;
  }

  // If it's subdomain.domain.com = school subdomain
  if (parts.length === 3 && parts[0] !== "www") {
    return parts[0];
  }

  // No subdomain
  return null;
};

export const isMainSite = () => {
  return getTenantFromUrl() === null;
};

export const getSchoolSlug = () => {
  return getTenantFromUrl();
};

export const getSchoolBySubdomain = async (
  subdomain: string,
): Promise<SchoolDomainResponse> => {
  try {
    const response = await axiosInstance.get(`/sch-admin/school/${subdomain}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
