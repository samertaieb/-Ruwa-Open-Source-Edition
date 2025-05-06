import { useUserStore } from "@/store/userStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PartnerInfo, PartnerInfoSchema } from "./schemas/types";
import Config from 'react-native-config';


// Define API base URL
// Dynamically determine the API URL
const API_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_API_URL // Development
  : Config.EXPO_PUBLIC_API_URL;    // Production
// Helper function for axios headers
const getHeaders = (token: string | null) => {
  if (!token) throw new Error("No token found. Please log in.");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch Partner Info Hook
export function useFetchPartnerInfo() {
  const token = useUserStore((state) => state.token);

  return useQuery<PartnerInfo, Error>({
    queryKey: ["partnerInfo"],
    queryFn: async (): Promise<PartnerInfo> => {
      if (!token) throw new Error("Authentication token is missing. Please log in.");

      try {
        const response = await axios.get(`${API_URL}/api/partner`, {
          headers: getHeaders(token),
        });

        const data = response.data;
        console.log("daaaaaaaaaaaaaaaaaaaaaaaaattttttttttttaaaaaaaaaa",data)
        // Transform the response to match the expected format for form handling
        const transformedData: PartnerInfo = {
          ...data,
          has_already_sold_products: data.has_already_sold_products ? "yes" : "no",
          state_id: data.state_id ? String(data.state_id) : "",
        };

        // Validate the transformed response using Zod schema
        const validatedResponse = PartnerInfoSchema.safeParse(transformedData);
        if (!validatedResponse.success) {
          console.error("Validation error:", validatedResponse.error);
          throw new Error("Invalid response structure");
        }

        return validatedResponse.data;
      } catch (error: any) {
        console.error("Error fetching partner info:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Failed to fetch partner information");
      }
    },
  });
}

// Update Partner Info Hook
export function useUpdatePartnerInfo() {
  const token = useUserStore((state) => state.token);

  return useMutation<PartnerInfo, Error, Partial<PartnerInfo>>({
    mutationFn: async (data: Partial<PartnerInfo>): Promise<PartnerInfo> => {
      try {
        console.log("Received data to update partner info:", data);

        // Ensure state_id is an integer
        const transformedData = {
          ...data,
          state_id: data.state_id ? parseInt(data.state_id, 10) : null,
          has_already_sold_products: data.has_already_sold_products === "yes",
        };

        const response = await axios.put(`${API_URL}/api/partner`, transformedData, {
          headers: getHeaders(token),
        });

        // Validate the response using Zod schema
        const validatedResponse = PartnerInfoSchema.safeParse(response.data);
        console.log("responseeeeeeeeeeee data",response.data)
        if (!validatedResponse.success) {
          console.error("Validation error:", validatedResponse.error);
          throw new Error("Invalid response structure");
        }

        return validatedResponse.data;
      } catch (error: any) {
        console.error("Error updating partner info:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Failed to update partner information");
      }
    },
    onError: (error) => {
      console.error("Update failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Partner info updated successfully:", data);
    },
  });
}
// Update Quality Chart Hook
export function useUpdateQualityChart() {
    const token = useUserStore((state) => state.token);
  
    return useMutation<void, Error>({
      mutationFn: async () => {
        if (!token) throw new Error("Authentication token is missing.");
  
        try {
          const response = await axios.put(
            `${API_URL}/api/partner/quality-chart`,
            { has_quality_chart: true },
            {
              headers: getHeaders(token),
            }
          );
  
          console.log("Quality chart updated successfully:", response.data);
        } catch (error: any) {
          console.error("Error updating quality chart:", error?.response?.data || error.message);
          throw new Error(error?.response?.data?.message || "Failed to update quality chart.");
        }
      },
      onError: (error) => {
        console.error("Failed to update quality chart:", error.message);
      },
      onSuccess: () => {
        console.log("Quality chart marked as signed successfully!");
      },
    });
  }
  // Fetch Quality Chart Status Hook
export function useFetchQualityChart() {
    const token = useUserStore((state) => state.token);
  
    return useQuery<boolean, Error>({
      queryKey: ["qualityChartStatus"],
      queryFn: async () => {
        const response = await axios.get(`${API_URL}/api/partner/has-quality-chart`, {
          headers: getHeaders(token),
        });
        return response.data.has_quality_chart; // Adjust based on API response
      },
    });
  }