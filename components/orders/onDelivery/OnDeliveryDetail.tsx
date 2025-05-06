import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { styles } from "@/globalStyles";

interface OnDeliveryDetailProps {
  approvalDate: string;
  recuperationDate: string;
  deliveryPerson: string;
  phoneNumber: string;
}

export const OnDeliveryDetail = ({
  approvalDate,
  recuperationDate,
  deliveryPerson,
  phoneNumber,
}: OnDeliveryDetailProps) => {
  const { t, i18n } = useTranslation();

  // Check if the current language is Arabic or another RTL language
  const isRTL = i18n.language === 'ar'; // or use a more robust check for RTL languages

  // Define conditional styles based on the language
  const textCommonStyle: ViewStyle = {
    ...styles.textCommon,
    flexDirection: isRTL ? 'row-reverse' : 'row',
  };

  return (
    <View style={styles.details}>
      <View style={styles.info}>
        <Text style={[styles.orderInfos, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t("Information")}
        </Text>
        <View style={textCommonStyle}>
          <Text style={{ flex: 1 }}>{t("Approval Date")}</Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: isRTL ? 'right' : 'left' }}>
            {approvalDate.split(" ")[0]}
          </Text>
        </View>
        <View style={textCommonStyle}>
          <Text style={{ flex: 1 }}>{t("Recuperation Date")}</Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: isRTL ? 'right' : 'left' }}>{recuperationDate}</Text>
        </View>
        <View style={textCommonStyle}>
          <Text style={{ flex: 1 }}>{t("Delivery Person")}</Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: isRTL ? 'right' : 'left' }}>{deliveryPerson}</Text>
        </View>
        <View style={textCommonStyle}>
          <Text style={{ flex: 1 }}>{t("Phone Number")}</Text>
          <Text style={{ flex: 1, fontWeight: "bold", textAlign: isRTL ? 'right' : 'left' }}>{phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default OnDeliveryDetail;
