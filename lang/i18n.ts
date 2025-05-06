import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import fr from "./fr.json";
import en from "./en.json";

const resources = {
  ar,
  fr,
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "ar", // Default language
  fallbackLng: "fr", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
