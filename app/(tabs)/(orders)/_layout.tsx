import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function OrdersLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="orderOnCraftReadyModal"
        options={{
          title: t("Order Ready"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderOnCraftChangeModal"
        options={{
          title: t("Change Order"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderDeliveredModal"
        options={{
          title: t("Delivered!"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderAcceptOfferingModal"
        options={{
          title: t("On Craft!"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderNegotiateOfferingModal"
        options={{
          title: t("Negotiate Offering"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="orderDenyOfferingModal"
        options={{
          title: t("Deny Offering"),
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
