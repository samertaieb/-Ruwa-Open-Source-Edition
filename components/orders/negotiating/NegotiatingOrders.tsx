import {
  useGetOrdersNegotiating,
} from "@/api/ordersApi";
import { FlatList, Pressable, View, Text, Image } from "react-native";
import OrderCard from "../OrderCard";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import NegotiatingOrderCard from "./NegotiatingOrderCard";
import { styles } from "@/globalStyles";
import { getImage } from "@/data/imageHelper";
import faceImg from "@/assets/face-content.png";import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export const NegotiatingOrders = () => {
  const { data, isPending, error, isSuccess, refetch } = useGetOrdersNegotiating();
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

  return (
    <FlatList
      data={data?.data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const product = item.products[0];
        
        // Retrieve the product name and pass it through the `t` function for translation
        const productName = t(product.product_id[1]); // Assuming `product.product_id[1]` is the name

        const offer = {
          name: productName,
          image: getImage(product.product_id[1]),
          productionNeeded: String(product.old_product_qty || product.product_qty),
          deliveryDate: item.old_date || item.date_planned,
          price: String(product.old_price_unit || product.price_unit),
        };

        const counterOffer = {
          name: productName,
          image: getImage(product.product_id[1]),
          productionNeeded: String(product.product_qty),
          deliveryDate: item.date_planned,
          price: String(product.price_unit),
        };

        return (
          <NegotiatingOrderCard
            key={item.id}
            orderNameOffering={offer.name}
            orderImageOffering={offer.image}
            productionNeededOffering={offer.productionNeeded}
            deliveryDateOffering={offer.deliveryDate}
            priceOffering={offer.price}
            orderNameCounterOffer={counterOffer.name}
            orderImageCounterOffer={counterOffer.image}
            productionNeededCounterOffer={counterOffer.productionNeeded}
            deliveryDateCounterOffer={counterOffer.deliveryDate}
            priceCounterOffer={counterOffer.price}
            actionView={
              <View style={styles.menu}>
                <Link
                  href={{
                    pathname: "/orderOnCraftChangeModal",
                    params: {
                      orderId: item.id,
                      orderName: counterOffer.name,
                      productionNeeded: counterOffer.productionNeeded,
                      deliveryDate: counterOffer.deliveryDate,
                      price: counterOffer.price,
                    },
                  }}
                  asChild
                >
                  <Pressable hitSlop={20}>
                    {/* <Text style={styles.linkText}>{t("Change")}</Text> */}
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
        <Text style={styles.noOffersText}>
          {t("No negotiating offers available at the moment!")}
        </Text>
        <Text style={styles.relaxText}>
          {t("Check your offers to see if any have been received, or just sit back and relax while we bring you the best offers!")}
        </Text>
      </View>
      }
    />
  );
};
