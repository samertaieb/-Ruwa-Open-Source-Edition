// components/OnCraftOrders.tsx
import React from 'react';
import { FlatList, Pressable, Text, View, Image } from "react-native";
import { useGetOrdersOnCraft } from "@/api/ordersApi";
import OrderCard from "../OrderCard";
import { Link } from "expo-router";
import { OrdersOnCraftSchema } from "@/api/schemas/schemas";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import { getImage } from "@/data/imageHelper";
import { styles } from "@/globalStyles";
import faceImg from "@/assets/face-content.png";
import { useDirection } from '../../../lang/hooks/useDirection'; // Import the useDirection hook

export const OnCraftOrders = () => {
  const { data, isPending, error, isSuccess } = useGetOrdersOnCraft();
  const { t } = useTranslation();
  const { textAlign, flexDirection } = useDirection(); // Using the useDirection hook

  if (isSuccess) {
    const validatedResponse = OrdersOnCraftSchema.safeParse(data);
    if (!validatedResponse.success) {
      console.error("error", validatedResponse);
    }
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <FlatList
      data={data?.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const productName = t(item.products[0].product_id[1]);
        const orderImage = getImage(item.products[0].product_id[1]);

        return (
          <OrderCard
            key={item.id}
            orderName={productName}
            orderImage={orderImage}
            productionNeeded={String(item.products[0].product_qty)}
            deliveryDate={item.date_planned}
            price={String(item.products[0].price_unit)}
            actionView={
              <View style={[styles.menu, { flexDirection }]}>
                <Link
                  href={{
                    pathname: "/orderOnCraftChangeModal",
                    params: {
                      orderId: item.id,
                      orderName: productName,
                      orderImage,
                      productionNeeded: String(item.products[0].product_qty),
                      deliveryDate: item.date_planned,
                      price: String(item.products[0].price_unit),
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    <Text style={[styles.linkText, { textAlign }]}>{t("Change")}</Text>
                  </Pressable>
                </Link>
                <Link
                  href={{
                    pathname: "/orderOnCraftReadyModal",
                    params: {
                      orderId: item.id,
                      orderName: productName,
                      orderImage,
                      productionNeeded: String(item.products[0].product_qty),
                      deliveryDate: item.date_planned,
                      price: String(item.products[0].price_unit),
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    <Text style={[styles.linkText, { textAlign }]}>
                      {t("I am ready to deliver!")}
                    </Text>
                  </Pressable>
                </Link>
              </View>
            }
          />
        );
      }}
      ListEmptyComponent={
        <View style={styles.welcomeImage}>
          <Image source={faceImg} style={styles.imageFace} resizeMode="contain" />
          <Text style={[styles.noOffersText, { textAlign }]}>
            {t("No crafting orders for now!")}
          </Text>
          <Text style={[styles.relaxText, {  }]}>
            {t("Take a moment to prepare and organize while we work on bringing you new opportunities. Keep up the great work!")}
          </Text>
        </View>
      }
    />
  );
};
