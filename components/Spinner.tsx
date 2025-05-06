import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { spinnerStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";

interface SpinnerProps {
  message?: string;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  message,
  color = "#4B7447",  // Updated to Earth Green for consistency with the app theme
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={spinnerStyles.container}>
      <ActivityIndicator size="large" color={color} />
      <Text style={spinnerStyles.message}>{message || t("Loading...")}</Text>
    </View>
  );
};

export default Spinner;
