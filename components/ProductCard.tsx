import React from "react";
import { Product } from "@/api/schemas/types"; // Adjust the import path as necessary
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Image,
  Pressable,
  I18nManager,
} from "react-native";
import { productCardStyles } from "@/globalStyles";

interface ProductCardProps {
  productName: string;
  productImage: any;
  productionCapacity?: number;
  price: number;
  category?: string; // Add category as optional
  status: "validated" | "pending" | "rejected";
  onAction: (product: Product) => void; // Update to accept Product type
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productImage,
  category,
  productionCapacity,
  price,
  status,
  onAction,
}) => {
  const { t, i18n } = useTranslation();

  // Determine layout direction
  const isRTL = i18n.language === "ar";
  const flexDirection: "row" | "row-reverse" = isRTL ? "row-reverse" : "row";
  const textAlign = isRTL ? "left" : "right";

  const rawProductName = productName; // Preserve the raw name
  const translatedProductName = t(productName, productName); // Translate with fallback
  const borderColor =
    status === "validated"
      ? "#4B7447" // Earth Green for validated
      : status === "pending"
      ? "#97D077" // Medium Light Green for pending
      : "#3B7A57"; // Dark Green for rejected

  return (
    <View style={[productCardStyles.card, { borderRightColor: borderColor }]}>
      {/* Adjust layout direction for content */}
      <View style={[productCardStyles.content, { flexDirection }]}>
        <Image source={productImage} style={productCardStyles.image} />
        {/* Adjust text alignment and layout in details */}
        <View
          style={[
            productCardStyles.details,
            { alignItems: isRTL ? "flex-end" : "flex-start" },
          ]}
        >
          <Text
            style={[
              productCardStyles.productName,
              { textAlign },
            ]}
          >
            {translatedProductName}
          </Text>
          {productionCapacity !== undefined && (
            <Text
              style={[
                productCardStyles.info,
                { textAlign },
              ]}
            >
              {t("Production Capacity")}: {productionCapacity} {t("kg/year")}
            </Text>
          )}
          <Text
            style={[
              productCardStyles.price,
              { textAlign },
            ]}
          >
            {t("Price")}: {price} {t("DT")}
          </Text>

          <Pressable
            onPress={() =>
              onAction({
                id: 0, // Replace with actual product ID if available
                name: rawProductName, // Pass raw name for logic
                price: price,
                status,
                imageUrl: productImage.uri, // Ensure image works with raw name
                total_production_capacity: productionCapacity,
                categ_id: category,
              })
            }
          >
            {/* Uncomment if you want to allow status change */}
            {/* <Text style={productCardStyles.linkText}>{t("Change")}</Text> */}
          </Pressable>
        </View>
      </View>

      {/* Pending message */}
      {status === "pending" && (
        <Text
          style={[
            productCardStyles.pendingMessage,
            { textAlign },
          ]}
        >
          {t("Product pending validation")}
        </Text>
      )}
    </View>
  );
};

export default ProductCard;
