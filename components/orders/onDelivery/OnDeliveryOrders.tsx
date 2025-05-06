import { useGetOrdersOnDelivery } from "@/api/ordersApi";
import { FlatList, Pressable, Image, Text, View } from "react-native";
import OrderCard from "../OrderCard";
import { Link } from "expo-router";
import { OrdersOnDeliverySchema } from "@/api/schemas/schemas";
import { OnDeliveryDetail } from "./OnDeliveryDetail";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import { styles } from "@/globalStyles";
import { getImage } from "@/data/imageHelper";
import faceImg from "@/assets/face-content.png";


export const OnDeliveryOrders = () => {
  const { data, isPending, error, isSuccess } = useGetOrdersOnDelivery();
  const { t } = useTranslation();

  if (isSuccess) {
    const validatedResponse = OrdersOnDeliverySchema.safeParse(data);
    // Handle validation error if needed
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
      keyExtractor={(deliveryOrder) => deliveryOrder.id}
      renderItem={({ item }) => {
        const productName = t(item.products[0].product_id[1]); // Translating the product name
        const orderImage = getImage(item.products[0].product_id[1]); // Getting the image

        return (
          <OrderCard
            key={item.id}
            orderName={productName}
            orderImage={orderImage}
            productionNeeded={String(item.products[0].product_qty)}
            deliveryDate={item.date_planned}
            price={String(item.products[0].price_unit)}
            actionView={
              <>
                <OnDeliveryDetail
                  approvalDate={item.date_approve}
                  recuperationDate={item.recuperation_date}
                  deliveryPerson={item.delivery_person_name}
                  phoneNumber={item.delivery_mobile}
                />
                <View style={styles.menu}>
                  <Link
                    href={{
                      pathname: "/orderDeliveredModal",
                      params: {
                        orderId: item.id,
                        orderName: productName,
                        orderImage, // Passing the order image as a parameter
                        productionNeeded: String(item.products[0].product_qty),
                        deliveryDate: item.date_planned,
                        price: String(item.products[0].price_unit),
                      },
                    }}
                    asChild
                  >
                    <Pressable hitSlop={20}>
                      <Text style={styles.linkText}>{t("Delivered")}</Text>
                    </Pressable>
                  </Link>
                </View>
              </>
            }
          />
        );
      }}
      ListEmptyComponent={
        <View style={styles.welcomeImage}>
        <Image source={faceImg} style={styles.imageFace} resizeMode="contain" />
        <Text style={styles.noOffersText}>
          {t("No products ready for pickup yet!")}
        </Text>
        <Text style={styles.relaxText}>
          {t("Prepare your best products! We’ll collect them soon and ensure they shine in our enterprise offerings!")}
        </Text>
      </View>
      }
    />
  );
};
