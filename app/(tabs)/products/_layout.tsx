import { styles } from "@/globalStyles";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ProductsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="addProductModal"
        options={{
          title: t("Add New Product"), 
          presentation: "modal",
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.subheader


        }}
      />
      <Stack.Screen
        name="updateProductModal"
        options={{
          title: t("Update Product"), 
          presentation: "modal",
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.subheader
        }}
      />
    </Stack>
  );
}
