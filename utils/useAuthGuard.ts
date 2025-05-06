import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useUserStore } from "@/store/userStore";
import {jwtDecode} from "jwt-decode";

export function useAuthGuard() {
  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Define excluded screens where redirection shouldn't occur
const excludedScreens = ["signin", "signup", "referencementStatus", "UpdateAppModal"];

    // Resolve the current path from segments
    const currentPath = segments.join("/");
    console.log("Current Path:", currentPath);

    // Prevent redirecting on excluded screens
    const isExcluded = excludedScreens.some((screen) =>
      currentPath.includes(screen)
    );

    // Token validation logic
    const isTokenValid = (() => {
      if (!token) return false;

      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const now = Math.floor(Date.now() / 1000);
        return decodedToken.exp > now; // Check if the token has expired
      } catch (error) {
        console.error("Error decoding token:", error);
        return false; // Treat invalid tokens as expired
      }
    })();

    // Handle invalid or missing token
    if (!isTokenValid && !isExcluded) {
      console.log("Token is invalid or expired. Clearing token and redirecting to signin...");
      setToken(null); // Clear the token
      router.replace("/signin");
    }
  }, [token, segments]);
}
