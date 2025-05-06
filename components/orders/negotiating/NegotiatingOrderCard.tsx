import { styles } from "@/globalStyles";
import { Link } from "expo-router";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

interface ProductCardProps {
  orderNameOffering: string;
  orderImageOffering: any;
  productionNeededOffering: string;
  deliveryDateOffering: string;
  priceOffering: string;
  orderNameCounterOffer: string;
  orderImageCounterOffer: any;
  productionNeededCounterOffer: string;
  deliveryDateCounterOffer: string;
  priceCounterOffer: string;
  actionView: ReactElement;
}

const NegotiatingOrderCard: React.FC<ProductCardProps> = ({
  orderNameOffering,
  orderImageOffering,
  productionNeededOffering,
  deliveryDateOffering,
  priceOffering,
  orderNameCounterOffer,
  orderImageCounterOffer,
  productionNeededCounterOffer,
  deliveryDateCounterOffer,
  priceCounterOffer,
  actionView,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.card]}>
      {/* Offering Section */}
      <View style={styles.details}>
        <Image source={orderImageOffering} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.textCommon, styles.offer]}>{t("Offering")}</Text>
          <Text style={[styles.textCommon, styles.orderName]}>
            {orderNameOffering}
          </Text>
          <View style={styles.textCommon}>
            <Text>{t("Production Needed")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {productionNeededOffering} {t("kg")}
            </Text>
          </View>
          <View style={styles.textCommon}>
            <Text>{t("Delivery Date")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {deliveryDateOffering.split(" ")[0]}
            </Text>
          </View>
          <View style={styles.textCommon}>
            <Text>{t("Price")}</Text>
            <Text style={{ fontWeight: "bold" }}>{priceOffering} {t("DT")}</Text>
          </View>
        </View>
      </View>

      {/* Counter Offer Section */}
      <View style={styles.details}>
        <Image style={styles.imageHide} />
        <View style={styles.info}>
          <Text style={[styles.textCommon, styles.counterOffer]}>{t("Counter Offer")}</Text>
          <Text style={[styles.textCommon, styles.orderName]}>
            {orderNameCounterOffer}
          </Text>
          <View style={styles.textCommon}>
            <Text>{t("Production Needed")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {productionNeededCounterOffer} {t("kg")}
            </Text>
          </View>
          <View style={styles.textCommon}>
            <Text>{t("Delivery Date")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {deliveryDateCounterOffer.split(" ")[0]}
            </Text>
          </View>
          <View style={styles.textCommon}>
            <Text>{t("Price")}</Text>
            <Text style={{ fontWeight: "bold" }}>{priceCounterOffer} {t("DT")}</Text>
          </View>
        </View>
      </View>
      
      {actionView}
    </View>
  );
};

export default NegotiatingOrderCard;
