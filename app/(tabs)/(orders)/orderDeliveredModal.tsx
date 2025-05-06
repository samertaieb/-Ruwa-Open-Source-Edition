import { putOrderToHistory } from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import { router, useLocalSearchParams } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { ParamsType, parseSearchParams } from "./orderOnCraftReadyModal";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";

export default function OrderDeliveredModal() {
  const [isDeliveryPicked, setIsDeliveryPicked] = useState(false);

  const params = useLocalSearchParams();
  const {
    orderId,
    orderName,
    productionNeeded,
    deliveryDate,
    price,
    orderImage
  }: ParamsType = parseSearchParams(params as Record<keyof ParamsType, string>);

  const { mutate, isPending, isError, isSuccess } = putOrderToHistory();

  const { t } = useTranslation();

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
            {t("Delivered!")}
          </Text>
          <Text style={[styles.dialogText, { marginBottom: 16 }]}>
            {!isSuccess
              ? t("Did our delivery person pick up your product?")
              : t("Awesome! We will move the product to the history section where you can see all your deliveries.")}
          </Text>
          <Button
            title={t("YES")}
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
