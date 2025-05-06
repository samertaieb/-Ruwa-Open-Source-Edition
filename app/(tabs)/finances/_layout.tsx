import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ProductsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="finance" options={{ headerShown: false }} />
      <Stack.Screen
        name="microcreditModal"
        options={{
          title: t("Microcredit Request"), 
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
