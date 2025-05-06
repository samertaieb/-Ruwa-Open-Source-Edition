import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { styles } from "@/globalStyles";

interface ProductCardProps {
  orderName: string;
  orderImage: any; // Consider specifying more detailed type information or use ImageSourcePropType
  productionNeeded: string;
  deliveryDate: string;
  price: string;
  amountTotal: number;
  paymentState: string;
  invoiceDateDue: string;
  actionView: ReactElement;
  pickingStates: string;
  amountResidualSigned?: number;
}

const HistoryOrderCard: React.FC<ProductCardProps> = ({
  orderName,
  orderImage,
  productionNeeded,
  deliveryDate,
  price,
  amountTotal,
  paymentState,
  invoiceDateDue,
  actionView,
  pickingStates,
  amountResidualSigned,
}) => {
  const { t, i18n } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Determine the display value for pickingStates
  const pickingStatusDisplay =
    pickingStates[0] === "assigned"
      ? t("Not yet")
      : pickingStates[0] === "done"
      ? t("Recepted")
      : pickingStates[0];

  // Determine the display value for paymentState
  let paymentStateDisplay;
  if (paymentState === "not_paid") {
    paymentStateDisplay = t("Not paid");
  } else if (paymentState === "paid") {
    paymentStateDisplay = t("Paid");
  } else if (paymentState === "partial") {
    paymentStateDisplay = t("Partial payment");
  } else {
    paymentStateDisplay = t("Not invoiced");
  }

  const isRTL = i18n.language === 'ar'; // Check if the language is RTL

  const textCommonStyle: ViewStyle = {
    ...styles.textCommon,
    flexDirection: isRTL ? 'row-reverse' : 'row', // Adjust direction based on language
  };

  const textStyle: TextStyle = {
    fontWeight: "bold",
    textAlign: isRTL ? 'right' : 'left', // Adjust text alignment based on language
  };

  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <View style={styles.info}>
          <Text style={[styles.textCommon, styles.invoiceName]}>{orderName}</Text>
          
         
          
          <View style={textCommonStyle}>
            <Text>{t("Amount Total")}</Text>
            <Text style={textStyle}>{amountTotal} {t("DT")}</Text>
          </View>
         
          <View style={textCommonStyle}>
            <Text>{t("Payment State")}</Text>
            <Text style={textStyle}>{paymentStateDisplay}</Text>
          </View>
        </View>
      </View>

      <Pressable onPress={handleToggleDetails}>
        <Text style={styles.linkText}>
          {showDetails ? t("Hide Details") : t("See Details")}
        </Text>
      </Pressable>

      {showDetails && (
        <View style={[styles.detailsHistory, { flexDirection: "column" }]}>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: "space-between" }}>
            <Text>{t("Invoice Due Date")}</Text>
            <Text style={textStyle}>{invoiceDateDue}</Text>
          </View>

          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: "space-between" }}>
            <Text>{t("Quantity")}</Text>
            <Text style={textStyle}>{productionNeeded} {t("kg")}</Text>
          </View>

          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: "space-between" }}>
            <Text>{t("Delivery Date")}</Text>
            <Text style={textStyle}>
              {deliveryDate ? deliveryDate.split(" ")[0] : ""}
            </Text>
          </View>



          {paymentState === "partial" && (
           <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: "space-between" }}>
             <Text>{t("Amount Residual Signed")}</Text>
             <Text style={textStyle}>
               {`${Math.abs(amountResidualSigned ?? 0)} DT`}
             </Text>
             
           </View>
          )}
        </View>
      )}

      {actionView}
    </View>
  );
};

export default HistoryOrderCard;
