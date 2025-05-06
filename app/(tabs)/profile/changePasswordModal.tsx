import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/Button";
import { StringInput } from "@/components/StringInput";
import { useChangePassword } from "@/api/authApi";
import CustomAlert from "@/components/CustomAlert"; 
import { changePasswordStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";

type ChangePasswordInputs = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePasswordModal() {
  const { t } = useTranslation();
  const { mutate: changePassword } = useChangePassword();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [buttonText, setButtonText] = useState(t("OK"));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();

  const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
    setIsSubmitting(true);

    changePassword(data, {
      onSuccess: () => {
        setIsSubmitting(false);
        setAlertTitle(t("Success"));
        setAlertMessage(t("Password changed successfully."));
        setButtonText(t("OK"));
        setAlertVisible(true);
      },
      onError: (error) => {
        setAlertTitle(t("Error"));
        setAlertMessage(t(`Failed to change password: ${error.message}`));
        setButtonText(t("Retry"));
        setAlertVisible(true);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <View style={changePasswordStyles.container}>
      {/* Overlaying CustomAlert */}
      {alertVisible && (
        <View style={changePasswordStyles.overlay}>
          <CustomAlert
            messageTitle={alertTitle}
            messageBody={alertMessage}
            buttonText={buttonText}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      )}

      <KeyboardAwareScrollView contentContainerStyle={changePasswordStyles.formContainer}>
        {/* <Text style={changePasswordStyles.title}>{t("Change Password")}</Text> */}

        <StringInput
          name="oldPassword"
          rules={{ required: t("Old password is required") }}
          placeholder={t("Old Password")}
          secureTextEntry
          control={control}
          error={errors.oldPassword}
        />
        <StringInput
          name="newPassword"
          rules={{ required: t("New password is required") }}
          placeholder={t("New Password")}
          secureTextEntry
          control={control}
          error={errors.newPassword}
        />

        <Button 
          title={t("Change Password")}
          loading={isSubmitting}
          disabled={isSubmitting || Object.keys(errors).length > 0}
          onPress={handleSubmit(onSubmit)} 
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
