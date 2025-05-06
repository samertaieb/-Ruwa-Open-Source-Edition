import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useGetOrdersOfferings } from "@/api/ordersApi";
import { FlatList, Pressable, Text, View, Image } from "react-native";
import OrderCard from "../OrderCard";
import { Link } from "expo-router";
import { OrdersOfferingSchema } from "@/api/schemas/schemas";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";
import { styles } from "@/globalStyles";
import faceImg from "@/assets/face-content.png";
import { getImage } from "@/data/imageHelper";

export const OfferingOrders = () => {
  const { data, isPending, error, isSuccess, refetch } = useGetOrdersOfferings(); // Add `refetch`
  const { t } = useTranslation();

  // Automatically refetch data when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      refetch(); // Trigger a refetch of the data
    }, [refetch])
  );

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <View style={styles.welcomeImage}>
        <Image source={faceImg} />
        <Text style={styles.noOffersText}>{t("No offers today!")}</Text>
        <Text style={styles.relaxText}>{t("Chill and relax")}</Text>
      </View>
    );
  }

  if (isSuccess) {
    const validatedResponse = OrdersOfferingSchema.safeParse(data);
    if (!validatedResponse.success) {
      console.error("error", validatedResponse);
      return (
        <View style={styles.welcomeImage}>
          <Image source={faceImg} />
          <Text style={styles.noOffersText}>{t("No offers today!")}</Text>
          <Text style={styles.relaxText}>{t("Chill and relax")}</Text>
        </View>
      );
    }
  }

  if (!data?.data?.length) {
    return (
      <View style={styles.welcomeImage}>
        <Image source={faceImg} />
        <Text style={styles.noOffersText}>{t("No offers today!")}</Text>
        <Text style={styles.relaxText}>{t("Chill and relax")}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data?.data}
      ListEmptyComponent={
        <View style={styles.welcomeImage}>
          <Image source={faceImg} />
          <Text style={styles.noOffersText}>{t("No offers today!")}</Text>
          <Text style={styles.relaxText}>{t("Chill and relax")}</Text>
        </View>
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const rawOrderName = item.products[0].product_id[1]; // Original product name from API
        const orderName = t(rawOrderName);        const orderImage = getImage(rawOrderName); // Getting the image

        return (
          <OrderCard
            key={item.id}
            orderName={orderName}
            orderImage={orderImage}
            productionNeeded={String(item.products[0].product_qty)}
            deliveryDate={item.date_planned}
            price={String(item.products[0].price_unit)}
            actionView={
              <View style={styles.menu}>
                <Link
                  href={{
                    pathname: "/orderAcceptOfferingModal",
                    params: {
                      orderId: item.id,
                      orderName,
                      orderImage, // Passing the order image
                      productionNeeded: String(item.products[0].product_qty),
                      deliveryDate: item.date_planned,
                      price: String(item.products[0].price_unit),
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    <Text style={styles.linkText}>{t("Accept")}</Text>
                  </Pressable>
                </Link>
                <Link
                  href={{
                    pathname: "/orderNegotiateOfferingModal",
                    params: {
                      orderId: item.id,
                      orderName,
                      orderImage, // Passing the order image
                      productionNeeded: String(item.products[0].product_qty),
                      deliveryDate: item.date_planned,
                      price: String(item.products[0].price_unit),
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    <Text style={styles.linkText}>{t("Negotiate")}</Text>
                  </Pressable>
                </Link>
                <Link
                  href={{
                    pathname: "/orderDenyOfferingModal",
                    params: {
                      orderId: item.id,
                      orderName,
                      orderImage, // Passing the order image
                      productionNeeded: String(item.products[0].product_qty),
                      deliveryDate: item.date_planned,
                      price: String(item.products[0].price_unit),
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    <Text style={styles.linkText}>{t("Deny")}</Text>
                  </Pressable>
                </Link>
              </View>
            }
          />
        );
      }}
    />
  );
};
