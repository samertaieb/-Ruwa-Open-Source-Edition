import React, { createContext, useContext, useState, ReactNode } from "react";
import { I18nManager } from "react-native";
import i18n from "@/lang/i18n";
import RNRestart from "react-native-restart";

interface LanguageContextProps {
  currentLanguage: string;
  isRTL: boolean;
  switchLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
  const [isRTL, setIsRTL] = useState<boolean>(I18nManager.isRTL);

  const switchLanguage = async (language: string) => {
    const isRTL = language === "ar";
    setCurrentLanguage(language);

    await i18n.changeLanguage(language);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      setIsRTL(isRTL);

      // Restart app to fully apply layout changes
      RNRestart.Restart();
    }
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, isRTL, switchLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
