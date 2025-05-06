import { useGetOrdersHistory } from "@/api/ordersApi";
import { FlatList, Pressable, View, Text,Image } from "react-native";
import HistoryOrderCard from "./HistoryOrderCard";
import { OrdersHistorySchema } from "@/api/schemas/schemas";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import { styles } from "@/globalStyles";
import { useState } from "react";
import faceImg from "@/assets/face-content.png";


export const HistoryOrders = () => {
  const { data, isPending, error, isSuccess } = useGetOrdersHistory();
  const { t } = useTranslation();

  if (isSuccess) {
    const validatedResponse = OrdersHistorySchema.safeParse(data);

    // Handle schema validation error
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
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => {
        return (
          <HistoryOrderCard
            key={index}
            orderName={item.name}
            orderImage=""
            productionNeeded={String(item.products[0].quantity)}
            deliveryDate={item.recuperation_date}
            price={String(item.amount_total)}
            amountTotal={item.amount_total}
            paymentState={item.invoice.payment_state}
            invoiceDateDue={item.invoice.invoice_date_due}
            pickingStates={item.picking_states}
            amountResidualSigned={item.invoice.amount_residual_signed}
            actionView={
              <View style={styles.menu}>
              
              </View>
            }
          />
        );
      }}
      ListEmptyComponent={
        <View style={styles.welcomeImage}>
        <Image source={faceImg} style={styles.imageFace} resizeMode="contain" />
        <Text style={styles.noOffersText}>
        {t("No history available yet!")}
        </Text>
        <Text style={styles.relaxText}>
        {t("Keep up the great work! Your past payments and product receptions will appear here soon.")}
        </Text>
      </View>
      }
    />
  );
};
