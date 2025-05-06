import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "@/components/Button";
import { CheckBox } from "@rneui/themed";
import { styles } from "@/globalStyles";

interface AlertProps {
  messageTitle: string;
  messageBody: string;
  buttonText: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const CustomAlert: React.FC<AlertProps> = ({
  messageTitle,
  messageBody,
  buttonText,
  onClose,
  children,
}) => {
  return (
    <View style={styles.alertContainer}>
      {/* Message Title */}
      <Text style={styles.messageTitle}>{messageTitle}</Text>

      {/* Message Body */}
      <Text style={styles.messageBody}>{messageBody}</Text>

      {/* Render children (e.g., checkbox) */}
      {children}

      {/* Custom Button */}
      <Button title={buttonText} onPress={onClose} />
    </View>
  );
};



export default CustomAlert;
