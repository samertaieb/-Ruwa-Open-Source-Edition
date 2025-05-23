import { theme } from "@/theme";
import { StyleSheet, Text, Pressable, Platform, ViewStyle, ActivityIndicator } from "react-native";
import * as Haptics from "expo-haptics";
import { styles } from "@/globalStyles";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;  // New loading prop
  style?: ViewStyle;
};

export function Button({ title, onPress, disabled = false, loading = false, style }: Props) {
  const handlePressed = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePressed}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && !disabled && !loading && styles.buttonPressed,
        (disabled || loading) && styles.buttonDisabled,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />  // Spinner when loading
      ) : (
        <Text style={[styles.buttonText, (disabled || loading) && styles.textDisabled]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}


