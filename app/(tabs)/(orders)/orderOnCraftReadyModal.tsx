import { putOrderToDelivery } from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import Spinner from "@/components/Spinner";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, View } from "react-native";

export interface ParamsType {
  orderId: string;
  orderName: string;
  productionNeeded: string;
  deliveryDate: string;
  price: string;
  orderImage:string
}

export const parseSearchParams = (
  params: Record<keyof ParamsType, any>
): ParamsType => {
  return {
    orderId: params.orderId,
    orderName: params.orderName,
    productionNeeded: params.productionNeeded,
    deliveryDate: params.deliveryDate,
    price: params.price,
    orderImage:params.orderImage
  };
};

export default function OrderOnCraftReadyModal() {
  const params = useLocalSearchParams();
  const {
    orderId,
    orderName,
    productionNeeded,
    deliveryDate,
    price,
    orderImage
  }: ParamsType = parseSearchParams(params as Record<keyof ParamsType, string>);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { t } = useTranslation();

  const { mutate, isPending, isSuccess, isError } = putOrderToDelivery();

  // Handle submission
  const handleSubmit = () => {
    if (!isSuccess) {
      setIsSubmitting(true); // Set submitting state to true
      mutate(orderId, {
        onSuccess: () => {
          setIsSubmitting(false); // Reset submitting state on success
          router.navigate("/"); // Navigate on success
        },
        onError: (error) => {
          console.error("Error updating order:", error);
          setIsSubmitting(false); // Reset submitting state on error
        },
      });
    } else {
      router.navigate("/");
    }
  };

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
              ? t(
                  "Are you done with the preparation of this product and you are ready to deliver?"
                )
              : t(
                  "Awesome! We will move the product to the On Delivery section."
                )}
          </Text>
          <Button
            title={
              isSubmitting
                ? t("Submitting...")
                : `${!isSuccess ? t("I AM READY TO DELIVER") : t("UNDERSTOOD")}`
            }
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  dialogText: { marginTop: 16 },
});
