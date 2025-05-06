import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider, useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import { useAuthGuard } from "@/utils/useAuthGuard";
import { getLatestVersion } from "@/api/versionApi";
import i18n from "@/lang/i18n";
import { styles } from "@/globalStyles";
import * as Application from "expo-application";


const queryClient = new QueryClient();

const flagStyles = {
  width: 30,
  height: 30,
  borderRadius: 15
};

interface FlagButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
}

const FlagButton: React.FC<FlagButtonProps> = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={source} style={flagStyles} />
  </TouchableOpacity>
);

function Root() {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  useAuthGuard();

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  // Determine the source of the flag based on the current language
  const getFlagSource = () => {
    switch (i18n.language) {
      case 'ar':
        return require('@/assets/images/tun.png');
      case 'fr':
        return require('@/assets/images/fr.png');
      case 'en':
      default:
        return require('@/assets/images/uk.png');
    }
  };

  // Determine the next language in the cycle
  const nextLanguage = () => {
    switch (i18n.language) {
      case 'ar':
        return 'fr';
      case 'fr':
        return 'ar';
        // return 'en';
      case 'en':
      default:
        return 'ar';
    }
  };

  const checkAppVersion = async () => {
    try {
      const { latestVersion, updateUrl } = await getLatestVersion();
      const currentVersion = Application.nativeApplicationVersion || Constants.expoConfig?.version || "Unknown";
      console.log("Current App Version:", currentVersion);
      console.log("Latest Version from API:", latestVersion);

      if (currentVersion !== latestVersion) {
        router.push({
          pathname: "/UpdateAppModal",
          params: { updateUrl },
        });
      }
    } catch (error) {
      console.error("Failed to check app version:", error);
    }
  };

  useEffect(() => {
    checkAppVersion();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="signin"
          options={{
            title: t("Sign In"),
            headerTitleAlign: "center",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerRight: () => (
              <FlagButton source={getFlagSource()} onPress={() => changeLanguage(nextLanguage())} />
            ),
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: t("Sign Up"),
            headerTitleAlign: "center",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerRight: () => (
              <FlagButton source={getFlagSource()} onPress={() => changeLanguage(nextLanguage())} />
            ),
          }}
        />
        <Stack.Screen
          name="referencementStatus"
          options={{ 
            title: t("Referencement Status"), 
            headerShown: true ,
             headerRight: () => (
              <FlagButton source={getFlagSource()} onPress={() => changeLanguage(nextLanguage())} />
            ),
          }}
        />
        <Stack.Screen
          name="UpdateAppModal"
          options={{
            title: "Update App",
            headerShown: true, // Hides the header for a full-screen experience
            headerRight: () => (
              <FlagButton source={getFlagSource()} onPress={() => changeLanguage(nextLanguage())} />
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Root />
    </I18nextProvider>
  );
});
