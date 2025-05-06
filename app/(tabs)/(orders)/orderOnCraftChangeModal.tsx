import { useEffect, useState } from "react";
import { putOrderToNegotiate } from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import { StringInput } from "@/components/StringInput";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface ChangeOnCraftOrderInputs {
  product_uom_qty: string;
  orderName: string;
  product_qty: string;
  price: string;
}

interface ParamsType {
  orderId: string;
  orderName: string;
  productionNeeded: string;
  deliveryDate: string;
  price: string;
}

const parseSearchParams = (
  params: Record<keyof ParamsType, any>
): ParamsType => {
  return {
    orderId: params.orderId,
    orderName: params.orderName,
    productionNeeded: params.productionNeeded,
    deliveryDate: params.deliveryDate,
    price: params.price,
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
  }: ParamsType = parseSearchParams(params as Record<keyof ParamsType, string>);

  const { mutate, isSuccess } = putOrderToNegotiate();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangeOnCraftOrderInputs>({
    defaultValues: {
      orderName: orderName,
      product_qty: productionNeeded,
      price: price,
      product_uom_qty: productionNeeded,
    },
  });

  const watchedQty = watch("product_qty");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ChangeOnCraftOrderInputs> = (data) => {
    setIsSubmitting(true);
    mutate(
      {
        orderId,
        product_qty: data.product_qty,
        price: data.price,
        product_uom_qty: watchedQty,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error) => {
          console.error("Error negotiating order:", error);
          setIsSubmitting(false);
        },
      }
    );
  };

  if (isSuccess)
    return (
      <OrderCard
        orderName={orderName}
        orderImage=""
        productionNeeded={productionNeeded}
        deliveryDate={deliveryDate}
        price={price}
        actionView={
          <View>
            <Text
              style={[styles.dialogText, { fontWeight: "bold", fontSize: 16 }]}
            >
              {t("Negotiating!")}
            </Text>
            <Text style={[styles.dialogText, { marginBottom: 16 }]}>
              {t(
                "We moved the Order to 'Negotiating'. We will review your case soon."
              )}
            </Text>
            <Button
              title={t("UNDERSTOOD")}
              onPress={() => router.replace("/")}
            />
          </View>
        }
      />
    );

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StringInput
        name="orderName"
        rules={{ required: t("Order Name is required") }}
        control={control}
        placeholder={t("Order Name")}
        keyboardType="number-pad"
        editable={false}
      />
      <StringInput
        name="product_qty"
        rules={{ required: t("Production is required") }}
        control={control}
        placeholder={t("Production")}
        keyboardType="number-pad"
        error={errors.product_qty}
      />
      <StringInput
        name="price"
        rules={{ required: t("Price per Kg is required") }}
        control={control}
        placeholder={t("Price per Kg")}
        keyboardType="number-pad"
        error={errors.price}
      />

      <Button
        title={isSubmitting ? t("Submitting...") : t("Add")}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  dialogText: { marginTop: 16 },
});
