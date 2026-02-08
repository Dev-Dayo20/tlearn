import axiosInstance from "@/lib/axios";
import { SchoolDomainResponse } from "@/types/types";
import api from "@/services/api/super-admin/super-admin";

export const getTenantFromUrl = (): string | null => {
  const hostname = window.location.hostname;

  // Remove port if present (localhost:3000 → localhost)
  const cleanHostname = hostname.split(":")[0];
  const parts = cleanHostname.split(".");

  // ========== 1. LOCALHOST DEVELOPMENT ==========
  if (cleanHostname === "localhost" || cleanHostname === "127.0.0.1") {
    return null; // Main site on localhost
  }

  // Handle subdomains on localhost (school1.localhost, admin.localhost)
  if (cleanHostname.includes("localhost") && parts.length >= 2) {
    return parts[0]; // Return first part as subdomain
  }

  // ========== 2. VERCEL PREVIEW DEPLOYMENTS ==========
  if (cleanHostname.includes("vercel.app")) {
    // Pattern: project-name.vercel.app (3 parts) = MAIN SITE
    if (parts.length === 3) {
      return null;
    }

    // Pattern: subdomain.project-name.vercel.app (4 parts) = SUBDOMAIN
    if (parts.length === 4) {
      return parts[0]; // Return subdomain
    }

    return null;
  }

  // ========== 3. PRODUCTION DOMAIN (tlearn.africa) ==========
  if (cleanHostname.endsWith("tlearn.africa")) {
    const domainParts = cleanHostname.split(".");

    // tlearn.africa (2 parts) = MAIN SITE
    if (domainParts.length === 2) {
      return null;
    }

    // www.tlearn.africa (3 parts, first is www) = MAIN SITE
    if (domainParts.length === 3 && domainParts[0] === "www") {
      return null;
    }

    // admin.tlearn.africa (3 parts) = ADMIN SITE (SPECIAL)
    if (domainParts.length === 3 && domainParts[0] === "admin") {
      return "admin"; // Return 'admin' as special value
    }

    // school1.tlearn.africa (3 parts) = SCHOOL SUBDOMAIN
    if (domainParts.length === 3) {
      return domainParts[0]; // school1, etc.
    }

    // Catch-all for any other pattern
    return null;
  }

  // ========== 4. CUSTOM DOMAINS (Future-proofing) ==========
  // If you ever have custom school domains like school1.com
  // This handles generic domain patterns

  // Pattern: domain.com (2 parts) or www.domain.com (3 parts, first is www)
  if (parts.length === 2 || (parts.length === 3 && parts[0] === "www")) {
    return null; // Main site
  }

  // Pattern: subdomain.domain.com (3 parts)
  if (parts.length === 3) {
    return parts[0]; // Return subdomain
  }

  // ========== 5. DEFAULT ==========
  return null;
};

export const isAdminSite = (): boolean => {
  const tenant = getTenantFromUrl();
  return tenant === "admin";
};

export const isMainSite = (): boolean => {
  const tenant = getTenantFromUrl();
  return tenant === null; // Only null means main site (not admin, not school)
};

export const isSchoolSite = (): boolean => {
  const tenant = getTenantFromUrl();
  return tenant !== null && tenant !== "admin";
};

export const getSchoolSlug = (): string | null => {
  const tenant = getTenantFromUrl();
  // Return null for admin and main sites
  if (tenant === null || tenant === "admin") {
    return null;
  }
  return tenant; // school1, etc.
};

export const getSchoolBySubdomain = async (
  subdomain: string,
): Promise<SchoolDomainResponse> => {
  try {
    const response = await api.get(`/sch-admin/school/${subdomain}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching school data for ${subdomain}:`, error);
    return null;
  }
};

export const getCurrentFullUrl = (): string => {
  return window.location.origin;
};

export const getEnvironment = (): "development" | "preview" | "production" => {
  const hostname = window.location.hostname;

  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return "development";
  }

  if (hostname.includes("vercel.app")) {
    return "preview";
  }

  return "production";
};
