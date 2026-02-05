import axios from "axios";
import { getTenantFromUrl } from "./tenantHelpers";
const API_BASE_URL = "/tlearn";

export const testRefreshEndpoint = async () => {
  try {
    const subdomain = getTenantFromUrl();
    const headers: any = { "Content-Type": "application/json" };

    if (subdomain) {
      headers["x-school-subdomain"] = subdomain;
    }

    console.log("Testing refresh endpoint...");
    const response = await axios.post(
      `${API_BASE_URL}/refresh-token`,
      {},
      {
        withCredentials: true,
        headers,
      },
    );

    console.log("Refresh test response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Refresh endpoint test failed:", error);
    return null;
  }
};
