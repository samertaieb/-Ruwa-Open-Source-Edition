import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@/components/Button";
import CustomAlert from "@/components/CustomAlert";
import { useRouter } from "expo-router";
import { MicrocreditModalStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";

export default function MicrocreditModal() {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(true); // Show alert initially
  const router = useRouter();

  // Close modal and return to the previous screen
  const handleClose = () => {
    setShowAlert(false);
    router.back(); // Go back to the previous screen
  };

  return (
    <View style={MicrocreditModalStyles.container}>
      {/* Custom Alert for Microcredit Request */}
      {showAlert && (
        <CustomAlert
          messageTitle={t("Microcredit Request")}
          messageBody={t("Your microcredit request is coming soon. Stay tuned for updates!")}
          buttonText={t("Close")}
          onClose={handleClose}
        />
      )}
    </View>
  );
}
