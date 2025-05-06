import { putOrderToHistory, putOrderToOnCraft } from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import Spinner from "@/components/Spinner";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ParamsType, parseSearchParams } from "./orderOnCraftReadyModal";
import { useTranslation } from "react-i18next";

export default function OrderAcceptOfferingModal() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const {
    orderId,
    orderName,
    productionNeeded,
    deliveryDate,
    price,
    orderImage
  }: ParamsType = parseSearchParams(params as Record<keyof ParamsType, string>);

  const { mutate, isPending, isSuccess, isError } = putOrderToOnCraft();

  if (isPending) return <Spinner />;

  if (isError) return <Text>{t("There was an error with your request")}</Text>;

  return (
    <OrderCard
      orderName={orderName}
      orderImage={orderImage}
      productionNeeded={productionNeeded}
      deliveryDate={deliveryDate}
      price={price}
      actionView={
        <View>
          <Text
            style={[styles.dialogText, { fontWeight: "bold", fontSize: 16 }]}
          >
            {t("Ready!")}
          </Text>
          <Text style={[styles.dialogText, { marginBottom: 16 }]}>
            {!isSuccess
              ? t("Do you want to craft this product?")
              : t(
                  "Awesome! We moved the Offering to 'On Craft'. Now you can start Crafting!"
                )}
          </Text>
          <Button
            title={`${!isSuccess ? t("I WILL CRAFT IT") : t("UNDERSTOOD")}`}
            onPress={() => {
              if (!isSuccess) {
                mutate(orderId);
                return;
              }
              router.navigate("/");
            }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  dialogText: { marginTop: 16 },
});
