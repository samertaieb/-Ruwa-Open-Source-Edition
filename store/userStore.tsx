import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  token: string | null;
  setToken: (token: string | null) => void;
  loadingSignIn: boolean;
  setLoadingSignIn: (isLoading: boolean) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        set((state) => ({ ...state, token }));
      },
      loadingSignIn: false,
      setLoadingSignIn: (isLoading: boolean) => {
        set((state) => ({ ...state, loadingSignIn: isLoading }));
      },
    }),
    {
      name: "session",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
