import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Modal, I18nManager } from "react-native";
import { Button } from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StringInput } from "@/components/StringInput";
import { useSignIn } from "@/api/authApi";
import { useTranslation } from "react-i18next";
import { Link, router } from "expo-router";
import Spinner from "@/components/Spinner";
import CustomAlert from "@/components/CustomAlert"; // Import the CustomAlert component
import { signInStyles } from "@/globalStyles";
import { changeLanguage } from "i18next";
import RNRestart from "react-native-restart"; // To restart the app
import i18n from "@/lang/i18n";
import { DropDownInputUnControlledLanguage } from "@/components/DropDownInputUncontrolledLanguage";

// import * as Updates from "expo-updates";

export type SignInInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { isPending, mutate: signIn } = useSignIn();
  const { control, handleSubmit, formState: { errors } } = useForm<SignInInputs>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To track error message visibility
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);


  const flexDirection: "row" | "row-reverse" = i18n.language === "ar" ? "row-reverse" : "row";


  const handleLanguageChange = async () => {
    try {
      const newLanguage = currentLanguage === "ar" ? "en" : "ar";
      setCurrentLanguage(newLanguage);
  
      // Change language
      await changeLanguage(newLanguage);
  
      // Apply RTL settings for Arabic
      const isRTL = newLanguage === "ar";
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
  
        // Restart the app to apply layout changes
        console.log("Restarting app for RTL changes...");
        RNRestart.Restart();
      }
    } catch (error) {
      console.error("Error switching language:", error);
    }
  };
  
  
  
  
  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    setLoading(true);
  
    signIn(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          setLoading(false);
  
          const token = response.data.token;
          const referencement = response.data.referencement;
  
          if (token) {
            console.log("Token:", token);
            console.log("Referencement:", referencement);
  
            // Navigate based on referencement status
            if (referencement === "referenced") {
              router.replace("/(tabs)");
            } else {
              router.replace(`/referencementStatus?referencement=${referencement}`);
            }
          } else {
            console.error("Sign-in failed: No token received.");
            setErrorMessage(t("Sign-in failed. Please try again."));
          }
        },
        onError: (error: Error) => {
          setLoading(false);
        
          // Extract server message or use default
          const serverMessage = error.message || "Sign-in failed. Please try again.";
        
          // Translate the server message
          const translatedMessage = t(serverMessage) || t("Sign-in failed. Please try again.");
        
          setErrorMessage(translatedMessage); // Show translated error message
          console.error("Error during sign-in:", serverMessage);
        },
        
      }
    );
  };
  
  
  if (loading || isPending) {
    return <Spinner message={t("Signing in...")} />;
  }

  return (
    <>
      <KeyboardAwareScrollView
        style={signInStyles.container}
        contentContainerStyle={signInStyles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >



        <Image source={require("../assets/icon.png")} style={signInStyles.logo} />
        <Text style={signInStyles.welcomeText}>{t("Welcome to RUWA")}</Text>

        <View style={signInStyles.inputContainer}>
          <StringInput
            name="email"
            rules={{ required: t("Email is required") }}
            placeholder={t("Your Phone Number")}
            keyboardType="email-address"
            control={control}
            error={errors.email}
          />
        </View>

        <View style={signInStyles.inputContainer}>
          <StringInput
            name="password"
            rules={{ required: t("Password is required") }}
            placeholder={t("Password")}
            secureTextEntry
            control={control}
            error={errors.password}
          />
        </View>

        <Button title={t("LOGIN")} onPress={handleSubmit(onSubmit)} style={signInStyles.button} />
        <View style={[signInStyles.linkContainer, { flexDirection }]}>
  <Text style={[signInStyles.linkText, { textAlign: flexDirection === "row-reverse" ? "right" : "left" }]}>
    {t("Don't have an account?")}{" "}
  </Text>
  <Link href="/signup" asChild>
    <Text style={signInStyles.joinUsText}>{t("Join Us")}</Text>
  </Link>
</View>

        {/* <DropDownInputUnControlledLanguage
          value={i18n.language}
          items={[
            // { value: "ar", label: t("Arabic") },
            //  { value: "fr", label: t("French") },
            // { value: "en", label: t("English") },
            { value: "ar", label: t("Arabic") },
          ]}
          onChange={i18n.changeLanguage}
          placeholder={t("Select Language")}
        /> */}
      </KeyboardAwareScrollView>

      {/* Display CustomAlert if there's an error */}
      {errorMessage && (
        <Modal visible={!!errorMessage} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <CustomAlert
              messageTitle={t("Error")}
              messageBody={errorMessage}
              buttonText={t("Close")}
              onClose={() => setErrorMessage(null)} // Clear the error message on close
            />
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a transparent background
  },
});
