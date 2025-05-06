import { I18nManager } from "react-native";
import i18n from "@/lang/i18n";

export const changeLanguage = async (language: string) => {
  try {
    const isRTL = language === "ar";

    // Change language in i18next
    await i18n.changeLanguage(language);

    // Apply RTL settings dynamically
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      console.log(`RTL layout updated to: ${isRTL}`);
    }
  } catch (error) {
    console.error("Error switching language:", error);
  }
};
