import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet, Pressable, ViewStyle } from "react-native";
import { styles } from "@/globalStyles";

interface ProductCardProps {
  orderName: string;
  orderImage: any; // Consider specifying a more appropriate type here
  productionNeeded: string;
  deliveryDate: string;
  price: string;
  actionView: ReactElement;
}

const OrderCard: React.FC<ProductCardProps> = ({
  orderName,
  orderImage,
  productionNeeded,
  deliveryDate,
  price,
  actionView,
}) => {
  const { t, i18n } = useTranslation();

  // Ensuring that the flexDirection value is a valid value accepted by TypeScript
  const flexDirection: "row" | "row-reverse" = i18n.language === 'ar' ? "row-reverse" : "row";
  const textCommonStyle: ViewStyle = {
    ...styles.textCommon,
    flexDirection: flexDirection,
  };

  return (
    <View style={[styles.card]}>
      <View style={[styles.details, { flexDirection }]}>
        <Image source={orderImage} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.textCommon, styles.orderName, { textAlign: flexDirection === 'row-reverse' ? 'right' : 'left' }]}>{orderName}</Text>
          <View style={textCommonStyle}>
            <Text>{t("Production Needed")}</Text>
            <Text style={{ fontWeight: "bold" }}>{productionNeeded} {t("kg")}</Text>
          </View>
          <View style={textCommonStyle}>
            <Text>{t("Delivery Date")}</Text>
            <Text style={{ fontWeight: "bold" }}>
              {deliveryDate ? deliveryDate.split(" ")[0] : ""}
            </Text>
          </View>
          <View style={textCommonStyle}>
            <Text>{t("Price")}</Text>
            <Text style={{ fontWeight: "bold" }}>{price} {t("DT")}</Text>
          </View>
        </View>
      </View>
      {actionView}
    </View>
  );
};

export default OrderCard;
