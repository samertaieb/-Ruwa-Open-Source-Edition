import {
  postOrderDeny,
  putOrderToHistory,
  putOrderToOnCraft,
} from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import Spinner from "@/components/Spinner";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { ParamsType, parseSearchParams } from "./orderOnCraftReadyModal";
import { useTranslation } from "react-i18next";

export default function orderDenyOfferingModal() {
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

  const { mutate, isPending, isSuccess, isError } = postOrderDeny();

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
            {t("Deny Offering")}
          </Text>
          <Text style={[styles.dialogText, { marginBottom: 16 }]}>
            {t(
              "Please tell us the reason you will deny the offering. We want to understand how to provide you with better offerings"
            )}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} onChangeText={() => {}} value="" placeholder={t("Enter your message here")} />
          </View>
          <Button
            title={t("DENY OFFER AND SEND MESSAGE")}
            onPress={() => {
              mutate({ orderId, message: "" });
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
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    borderColor: "#ccc",
  },
});
