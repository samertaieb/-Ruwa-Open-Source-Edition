import { styles } from "@/globalStyles";
import { Stack, useSegments } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const segments = useSegments();
  const { t } = useTranslation();

  // Check if the current segment is a modal
  const isModal =
    segments.includes("modal") || segments.includes("changePasswordModal");

  return (
    <Stack>
      <Stack.Screen
        name="profileScreen"
        options={{
    
          headerShown: false,
          title: t("Profile"), 
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="rulesModal"
        options={{
          // headerShown: false,

          title: t("Sign Quality Charter"), 
          presentation: "modal",
          headerTitleAlign: "left",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.subheader
        }}
      />
      <Stack.Screen
        name="changePasswordModal"
        options={{
          // headerShown: true,

          title: t("Change Password"), 
          presentation: "modal",
          headerTitleAlign: "left",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.subheader
        }}
      />
    </Stack>
  );
}
