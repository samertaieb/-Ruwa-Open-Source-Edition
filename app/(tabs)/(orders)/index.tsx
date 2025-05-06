import { Text, View } from "react-native";
import "@/lang/i18n";
import { useState, useEffect } from "react";
import { HeadingTabs } from "@/components/HeadingTabs";
import { OnCraftOrders } from "@/components/orders/onCraft/OnCraftOrders";
import { OnDeliveryOrders } from "@/components/orders/onDelivery/OnDeliveryOrders";
import { OfferingOrders } from "@/components/orders/offerings/OfferingOrders";
import { globalStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";
import { NegotiatingOrders } from "@/components/orders/negotiating/NegotiatingOrders";
import { HistoryOrders } from "@/components/orders/history/HistoryOrders";

export default function OrdersScreen() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Original tab items
  const originalTabItems = [
    t("Offerings"),
    t("Negotiating"),
    t("On Craft"),
    t("On Delivery"),
    t("History"),
  ];

  // Reverse tab items if Arabic is selected
  const tabItems = isArabic ? [...originalTabItems].reverse() : originalTabItems;

  // Determine the default tab index based on the language
  const defaultTabIndex = isArabic
    ? tabItems.indexOf(t("Offerings")) // Get reversed index for Offerings
    : 0;

  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  useEffect(() => {
    // Update default tab index dynamically when language changes
    setTabIndex(defaultTabIndex);
  }, [defaultTabIndex]);

  // Adjust index mapping to account for reversed tabs
  const getTabContent = (index: number) => {
    const actualIndex = isArabic ? originalTabItems.length - 1 - index : index;
    switch (actualIndex) {
      case 0:
        return <OfferingOrders />;
      case 1:
        return <NegotiatingOrders />;
      case 2:
        return <OnCraftOrders />;
      case 3:
        return <OnDeliveryOrders />;
      case 4:
        return <HistoryOrders />;
      default:
        return null;
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <HeadingTabs
        tabItems={tabItems}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
      {getTabContent(tabIndex)}
    </View>
  );
}
