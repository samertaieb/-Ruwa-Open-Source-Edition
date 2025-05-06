import React, { useEffect } from "react";
import { Redirect, Tabs, useSegments } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { Feather } from "@expo/vector-icons";
import Spinner from "@/components/Spinner";
import { styles } from "@/globalStyles";
import { useTranslation } from "react-i18next"; // Corrected import for using translation hook
import { View, Image, TouchableOpacity } from "react-native";

export default function AppLayout() {
  const { t, i18n } = useTranslation(); // useTranslation hook to handle language switching
  const token = useUserStore((state) => state.token);
  const loadingSignIn = useUserStore((state) => state.loadingSignIn);
  const segments = useSegments();

  useEffect(() => {
    console.log("Token:", token);
    console.log("Loading Sign In:", loadingSignIn);
  }, [token, loadingSignIn]);

  const isModal = segments.some(segment => [
    "orderOnCraftReadyModal",
    "orderOnCraftChangeModal",
    "orderDeliveredModal",
    "orderAcceptOfferingModal",
    "orderNegotiateOfferingModal",
    "orderDenyOfferingModal",
  ].includes(segment));

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
  };

  const nextLanguage = () => {
    switch (i18n.language) {
      case 'ar': return 'fr';
      case 'fr': return 'ar';
      default: return 'ar';
    }
  };

  const flagSource = () => {
    switch (i18n.language) {
      case 'ar': return require('@/assets/images/tun.png');
      case 'fr': return require('@/assets/images/fr.png');
      default: return require('@/assets/images/uk.png');
    }
  };

  const FlagButton = () => (
    <TouchableOpacity onPress={() => changeLanguage(nextLanguage())} style={{ marginRight: 15 }}>
      <Image source={flagSource()} style={{ width: 30, height: 30 }} />
    </TouchableOpacity>
  );

  if (loadingSignIn) {
    return <Spinner message={t("Signing in...")} />;
  }

  if (!token) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#97D077",
        tabBarInactiveTintColor: "#4B7447",
        tabBarStyle: { paddingBottom: 5, paddingTop: 5 },
        headerRight: () => <FlagButton />
      }}
    >
      <Tabs.Screen
        name="(orders)"
        options={{
          title: t("Orders"),
          headerShown: !isModal,
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t("Products"),
          tabBarIcon: ({ color }) => <Feather name="box" size={24} color={color} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          title: t("Finances"),
          tabBarIcon: ({ color }) => <Feather name="dollar-sign" size={24} color={color} />,
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("Profile"),
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Tabs>
  );
}
