import axios, { AxiosResponse } from "axios";
import { useUserStore } from "@/store/userStore";
import {
  ChangePasswordAPIRequestType,
  ChangePasswordSuccessType,
  SignInAPIRequestType,
  SignInSuccessType,
  SignUpAPIRequestType,
  SignUpSuccessType,
} from "./schemas/types";
import { SignInSuccessSchema } from "./schemas/schemas";
import {SignInAPIResponse}  from "./schemas/types";
import { useMutation } from "@tanstack/react-query";
import Config from "react-native-config";
import { router } from "expo-router";

// Dynamically determine the API URL
const API_URL = __DEV__ 
  : Config.EXPO_PUBLIC_API_URL;   
  function useSignIn() {
    const setToken = useUserStore((state) => state.setToken);
  
    return useMutation<AxiosResponse<SignInAPIResponse>, Error, SignInAPIRequestType>({
      mutationFn: async (data: SignInAPIRequestType) => {
        try {
          const response = await axios.post<SignInAPIResponse>(`${API_URL}/api/auth/signin`, data, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          return response;
        } catch (error: any) {
          // Extract specific error message from backend response or default message
          const errorMessage =
            error?.response?.data?.message || "An unexpected error occurred. Please try again.";
          console.error("Error during sign-in:", errorMessage);
          throw new Error(errorMessage); // Throw error with clear message
        }
      },
      onSuccess: (response) => {
        const token = response.data.token; // Extract token from response
        console.log("Token:", token);
        setToken(token); // Save the token in the user store
        console.log("Referencement:", response.data.referencement); // Log referencement for debugging
      },
      onError: (error: Error) => {
        // Log the error message passed from `mutationFn`
        console.error("Sign-in failed:", error.message);
      },
    });
  }
  
  
  
  
  
  
  
  
  
function useSignUp() {
  return useMutation({
    mutationFn: async (data: SignUpAPIRequestType) => {
      console.log("Data being sent to the API:", data); // Log the input data
      const response = await axios.post<SignUpSuccessType>(
        `${API_URL}/api/auth/signup`,
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API response:", response.data); // Log the API response
      return response.data; // Ensure the data is returned
    },
    onSuccess: (data) => {
      console.log("Mutation successful with response data:", data); // Log the success response
    },
    onError: (error) => {
      console.error("Error occurred during sign-up 11111111111111111:", error); // Log any errors
    },
  });
}


function useSignOut() {
  const setToken = useUserStore((state) => state.setToken);

  async function signOut() {
    console.log("Token cleared in signOut function");
    setToken(null); // Clear the token in zustand store
  }
  return { signOut };
}

// Change Password Hook
export function useChangePassword() {
  const token = useUserStore((state) => state.token);

  return useMutation<
    ChangePasswordSuccessType,      // Success type
    Error,                          // Error type
    ChangePasswordAPIRequestType    // Request type
  >({
    mutationFn: async (data) => {
      if (!token) throw new Error("Authentication token is missing. Please log in.");

      try {
        const response = await axios.put<ChangePasswordSuccessType>(
          `${API_URL}/api/auth/change-password`,
          data,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data; // Return the response data directly
      } catch (error: any) {
        console.error("Error changing password:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Failed to change password.");
      }
    },
    onError: (error) => {
      console.error("Change password failed:", error.message);
    },
    onSuccess: (data) => {
      console.log("Password changed successfully:", data);
    },
  });
}

export { useSignIn, useSignUp, useSignOut };
