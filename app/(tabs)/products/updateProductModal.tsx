import React from "react";
import { StyleSheet } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StringInput } from "@/components/StringInput";
import { Button } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";

export interface UpdateProductInputs {
  category: string;
  product: string;
  productionCapacity: string;
  pricePerKg: string;
}

interface ParamsType {
  id: string;
  name: string;
  status: string;
  capacity: string;
  price: string;
  category: string;
}

const parseSearchParams = (
  params: Record<keyof ParamsType, any>
): ParamsType => {
  return {
    id: params.id || "",
    name: params.name || "",
    status: params.status || "",
    capacity: params.capacity || "0",
    price: params.price || "0",
    category: params.category || "",
  };
};

export default function UpdateProductScreen() {
  const params = useLocalSearchParams();
  console.log("Incoming params:", params); // Debugging line

  const { id, name, capacity, price, category }: ParamsType = parseSearchParams(
    params as Record<keyof ParamsType, string>
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductInputs>({
    defaultValues: {
      category: category || "",
      product: name || "",
      productionCapacity: capacity,
      pricePerKg: price,
    },
  });

  const onSubmit: SubmitHandler<UpdateProductInputs> = (data) => {
    console.log("Updated data:", data);
    router.replace("/"); // Navigate back after successful update
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StringInput
        name="category"
        rules={{ required: "Category is required" }}
        control={control}
        placeholder="Order Name"
        editable={false}
      />
      <StringInput
        name="product"
        rules={{ required: "Product is required" }}
        control={control}
        placeholder="Select Product"
        editable={false}
      />
      <StringInput
        name="productionCapacity"
        rules={{ required: "Production capacity is required" }}
        control={control}
        placeholder="Production Capacity"
        keyboardType="number-pad"
        error={errors.productionCapacity}
      />
      <StringInput
        name="pricePerKg"
        rules={{ required: "Price per Kg is required" }}
        control={control}
        placeholder="Price per Kg"
        keyboardType="number-pad"
        error={errors.pricePerKg}
      />

      <Button title="Update" onPress={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
});
