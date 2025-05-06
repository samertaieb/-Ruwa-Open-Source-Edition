import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";

import Config from 'react-native-config';
// Conditionally set the API URL based on the environment
const API_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_API_URL // Development
  : Config.EXPO_PUBLIC_API_URL;    // Production

// Helper function for headers
function getHeaders(token: string | null) {
  if (!token) throw new Error("No token found. Please log in.");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Fetching function for financial data
async function getFinancialData(): Promise<number> {
  const token = useUserStore.getState().token; // Get the token from the store

  if (!token) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  try {
    const response = await axios.get(`${API_URL}/api/partner-amount-due`, {
      headers: getHeaders(token),
    });

    if (response.data?.totalAmountDue !== undefined) {
      return response.data.totalAmountDue; // Return totalAmountDue directly
    } else {
      throw new Error("Failed to fetch total amount due");
    }
  } catch (error: any) {
    console.error("Error fetching financial data:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Failed to fetch financial data.");
  }
}

// Custom Hook for fetching financial data
export function useGetFinancialData() {
  return useQuery<number, Error>({
    queryKey: ["financialData"],
    queryFn: getFinancialData,
    staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
    retry: 0, // Disable retries

  });
}
