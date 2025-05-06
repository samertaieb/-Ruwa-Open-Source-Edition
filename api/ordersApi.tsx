import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ChangeOnCraftOrderRequestType,
  PostOrderDenyRequestType,
} from "./schemas/types";
import Config from 'react-native-config';
// Dynamically determine the API URL
const API_URL = __DEV__ 
  ? process.env.EXPO_PUBLIC_API_URL // Development
  : Config.EXPO_PUBLIC_API_URL;    // Production

  function useGetOrdersOfferings() {
    const token = useUserStore((state) => state.token);
  
    return useQuery({
      queryKey: ["getOrderOfferings"],
      queryFn: async () =>
        await axios.get(`${API_URL}/api/orders/price_requests/sent`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        retry: 0, // Disable retries
        refetchOnWindowFocus: false, // Disable refetching on window focus
  refetchOnMount: false, // Disable refetching on component mount
        
    });
  }
  


function useGetOrdersOnCraft() {
  const token = useUserStore((state) => state.token);

  return useQuery({
    queryKey: ["getOrdersOnCraft"],
    queryFn: async () =>
      await axios.get(
        `${API_URL}/api/orders/price_requests/purchase`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      retry: 0, // Disable retries
      refetchOnWindowFocus: false, // Disable refetching on window focus
  refetchOnMount: false, // Disable refetching on component mount
        
  });
}

function useGetOrdersNegotiating() {
  const token = useUserStore((state) => state.token);

  return useQuery({
    queryKey: ["getOrdersNegociated"],
    queryFn: async () =>
      await axios.get(
        `${API_URL}/api/orders/negociated`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      retry: 0, // Disable retries
      refetchOnWindowFocus: true, // Disable refetching on window focus
  refetchOnMount: true, // Disable refetching on component mount
        
  });
}

function useGetOrdersOnDelivery() {
  const token = useUserStore((state) => state.token);

  return useQuery({
    queryKey: ["getOrdersOnDelivery"],
    queryFn: async () =>
      await axios.get(`${API_URL}/api/orders/done`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      retry: 0, // Disable retries
      refetchOnWindowFocus: false, // Disable refetching on window focus
  refetchOnMount: false, // Disable refetching on component mount
        
  });
}

function useGetOrdersHistory() {
  const token = useUserStore((state) => state.token);

  return useQuery({
    queryKey: ["getOrdersHistory"],
    queryFn: async () =>
      await axios.get(
        `${API_URL}/api/orders/delivered`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      retry: 0, // Disable retries
      refetchOnWindowFocus: false, // Disable refetching on window focus
  refetchOnMount: false, // Disable refetching on component mount

  });
}

function putOrderToOnCraft() {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) =>
      await axios.put(
        `${API_URL}/api/orders/done/${orderId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        
      ),
      
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getOrdersOnCraft"] });
      queryClient.invalidateQueries({ queryKey: ["getOrderOfferings"] });
    },
  });
}

// TODO missing BE endpoint
function putOrderToHistory() {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const url = `${API_URL}/api/orders/delivered/${orderId}`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Log the orderId being used
      console.log('Using orderId for PUT request:', orderId);

      // Log the request details for additional debugging
      console.log('Sending PUT request to:', url);
      console.log('Request headers:', headers);
      console.log('Request body:', {});

      return await axios.put(url, {}, { headers });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getOrdersOnCraft"] });
      queryClient.invalidateQueries({ queryKey: ["getOrdersOnDelivery"] });
    },
    onError: (error) => {
      console.error('Error putting order to history:', error);
      alert('Failed to update order. Please try again.');
    },
  });
}


function putOrderToDelivery() {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) =>
      await axios.put(
        `${API_URL}/api/orders/done/${orderId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getOrdersOnCraft"] });
      queryClient.invalidateQueries({ queryKey: ["getOrdersOnDelivery"] });
      queryClient.invalidateQueries({ queryKey: ["getOrderOfferings"] });
    },
    onError: (error) => {
      console.error('Error putting order to history:', error);
      alert('Failed to update order. Please try again.');
    },
    
  });
}

import Toast from 'react-native-toast-message';

function putOrderToNegotiate() {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChangeOnCraftOrderRequestType) => {
      console.log("Data being sent:", data);
      return await axios.put(
        `${API_URL}/api/orders/toNegociate/${data.orderId}`,
        {
          product_uom_qty: data.product_uom_qty,
          product_qty: data.product_qty,
          price: data.price,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log("Order negotiated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getOrderOfferings"] });
    },
    onError: (error) => {
      console.error("Error during negotiation:", error);
      Toast.show({
        type: 'error',
        text1: 'Failed to negotiate order. Please try again.'
      });
    },
  });
}




function postOrderDeny() {
  const token = useUserStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostOrderDenyRequestType) =>
      await axios.post(
        `${API_URL}/api/orders/${data.orderId}/cancel`,
        // {
        //   message: data.message,
        // },
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getOrderOfferings"] });
    },
  });
}

export {
  useGetOrdersOfferings,
  useGetOrdersOnCraft,
  useGetOrdersNegotiating,
  useGetOrdersOnDelivery,
  useGetOrdersHistory,
  putOrderToOnCraft,
  putOrderToHistory,
  putOrderToDelivery,
  putOrderToNegotiate,
  postOrderDeny, useQueryClient,
};
