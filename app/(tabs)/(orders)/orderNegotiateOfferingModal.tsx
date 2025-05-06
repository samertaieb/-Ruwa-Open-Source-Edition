import { putOrderToNegotiate } from "@/api/ordersApi";
import { Button } from "@/components/Button";
import OrderCard from "@/components/orders/OrderCard";
import { StringInput } from "@/components/StringInput";
import { router, useLocalSearchParams } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
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
  orderImage: any;
}

// Improved type-safe parsing function
const parseSearchParams = (params: Partial<ParamsType>): ParamsType => {
  return {
    orderId: params.orderId || "",
    orderName: params.orderName || "",
    productionNeeded: params.productionNeeded || "",
    deliveryDate: params.deliveryDate || "",
    price: params.price || "",
    orderImage: params.orderImage || null,
  };
};

export default function OrderNegotiateOfferingModal() {
  const params = useLocalSearchParams();
  const {
    orderId,
    orderName,
    productionNeeded,
    deliveryDate,
    price,
    orderImage,
  }: ParamsType = parseSearchParams(params as Partial<ParamsType>);

  const mutation = putOrderToNegotiate(); // Mutation object
  const { mutate, isSuccess, status } = mutation; // Extract necessary states
  const isLoading = status === "pending"; // Derive loading state
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangeOnCraftOrderInputs>({
    defaultValues: {
      orderName,
      product_qty: productionNeeded,
      product_uom_qty: price,
      price,
    },
  });

  const watchedQty = watch("product_qty");

  const onSubmit: SubmitHandler<ChangeOnCraftOrderInputs> = (data) => {
    mutate({
      orderId,
      product_qty: data.product_qty,
      price: data.price,
      product_uom_qty: watchedQty,
    });
  };

  if (isSuccess) {
    return (
      <OrderCard
        orderName={orderName}
        orderImage={orderImage}
        productionNeeded={productionNeeded}
        deliveryDate={deliveryDate}
        price={price}
        actionView={
          <View>
            <Text style={[styles.dialogText, { fontWeight: "bold", fontSize: 16 }]}>
              {t("Negotiating!")}
            </Text>
            <Text style={[styles.dialogText, { marginBottom: 16 }]}>
              {t(
                "We moved the Order to 'Negotiating'. We will review your case soon."
              )}
            </Text>
            <Button
              title={t("UNDERSTOOD")}
              onPress={() => router.push("/")} // Navigate to the main Orders route
              />
          </View>
        }
      />
    );
  }

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
        title={t("SEND FOR APPROVAL")}
        onPress={handleSubmit(onSubmit)}
        loading={isLoading} // Show loading spinner during submission
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
