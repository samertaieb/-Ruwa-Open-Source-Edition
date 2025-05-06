import axios, { AxiosResponse } from "axios";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { Product } from "@/api/schemas/types";
import Config from 'react-native-config';

// Dynamically determine the API URL
const API_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_API_URL // Development
  : Config.EXPO_PUBLIC_API_URL;    // Production
// Types for API responses
interface FetchProductsResponse {
  notReferenced: Omit<Product, "status">[];
  inProgress: Omit<Product, "status">[];
  referenced: Omit<Product, "status">[];
}

type ProductData = {
  category: string;
  product: string;
  production_capacity: number;
  price_per_kg: number;
};

interface Category {
  id: string; // Added 'id' for better dropdown integration
  name: string;
}

// Helper function to get headers with token
const getHeaders = (): Record<string, string> => {
  const token = useUserStore.getState().token;

  console.log('Retrieved token:', token);

  if (!token) {
    throw new Error("No token available");
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Function to fetch all products and assign statuses
import debounce from "lodash.debounce";

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    console.log("Fetching all products from API...");
    const response: AxiosResponse<FetchProductsResponse> = await axios.get(
      `${API_URL}/api/products/all`,
      { headers: getHeaders() }
    );

    console.log("API response for all products:", response.data);

    const { notReferenced, inProgress, referenced } = response.data;

    // If the response structure is incorrect or missing, return an empty array
    if (!response.data || (!notReferenced && !inProgress && !referenced)) {
      console.warn("API response is invalid or missing required fields.");
      return [];
    }

    const products: Product[] = [
      ...referenced.map((product) => ({
        ...product,
        status: "validated" as const,
      })),
      ...inProgress.map((product) => ({
        ...product,
        status: "pending" as const,
      })),
      ...notReferenced.map((product) => ({
        ...product,
        status: "rejected" as const,
      })),
    ];

    return products;
  } catch (error: any) {
    console.error("Error fetching products:", error?.response?.data || error.message);
    throw new Error("Failed to fetch products");
  }
};

// Function to fetch categories
export const fetchCategories = async (): Promise<{ name: string }[]> => {
  try {
    console.log('Fetching categories from API...');
    const response: AxiosResponse<{ name: string }[]> = await axios.get(
      `${API_URL}/api/categories`,
      { headers: getHeaders() }
    );

    console.log('Categories fetched:', response.data);

    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error?.response?.data || error.message);
    throw new Error('Failed to fetch categories');
  }
};

// React Query hook for categories
export const useFetchCategories = () => {
  return useQuery<{ name: string }[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 0, // Disable retries

  });
};

// Function to fetch products by category
export const fetchProductsByCategory = async (
  categoryName: string
): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(
      `${API_URL}/api/products/category/${encodeURIComponent(categoryName)}`,
      { headers: getHeaders() }
    );
    console.log("product bhy categooooooooooooooooooooory ",response.data)


    return response.data;
  } catch (error: any) {
    console.error(`Error fetching products for category ${categoryName}:`, error?.response?.data || error.message);
    throw new Error("Failed to fetch products by category");
  }
};

// React Query hook for fetching all products
export const useFetchAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 0, // Disable retries

  });
};

// React Query hook for fetching products by category
export const useFetchProductsByCategory = (categoryName: string) => {
  return useQuery<Product[], Error>({
    queryKey: ["productsByCategory", categoryName],
    queryFn: () => fetchProductsByCategory(categoryName),
    enabled: !!categoryName, // Only run the query if categoryName is provided
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 0, // Disable retries

  });
};

// Hook to add a new product
export function useAddProduct(): UseMutationResult<void, Error, ProductData> {
  
  return useMutation({
    mutationFn: async (productData: ProductData) => {
      // Validate product name before sending the request
      if (!productData.product || productData.product.trim() === '') {
        console.error('Validation failed: Product name is required.');
        throw new Error('Product name is required.');
      }

      console.log('Sending product data to backend:', productData);

      try {
        await axios.post(
          `${API_URL}/api/products/add`,
          productData,
          { headers: getHeaders() }
        );
        console.log('Product added successfully');
      } catch (error: any) {
        console.error('Error adding product:', error?.response?.data || error.message);
        throw new Error('Failed to add product');
      }
    },
    onSuccess: () => {
      console.log('Product added successfully in useMutation.');
      // queryClient.invalidateQueries({ queryKey: ["getOrdersOnCraft"] });

    },
    onError: (error) => {
      console.error('Failed to add product in useMutation:', error);
    },
  });
}
