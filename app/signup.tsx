import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StringInput } from "@/components/StringInput";
import { governorateDropdownData } from "@/data/dropdownData/governorateData";
import { cityDropdownData } from "@/data/dropdownData/cityData";
import { DropDownInput } from "@/components/DropDownInput";
import { DateInput } from "@/components/DateInput";
import { DateType, isOver18 } from "@/data/dropdownData/dateData";
import { useSignUp } from "@/api/authApi";
import { signUpStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import { useRouter } from "expo-router";
import CustomAlert from "@/components/CustomAlert";
import { roleData } from "@/data/dropdownData/roleData";
import { hasBeenSoldData } from "@/data/dropdownData/hasBeenSoldData";

const stateIdMapping: { [key: string]: number } = {
  "Tunis (TN)": 701,
 
};

export type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  reEnterPassword: string;
  birthDate: DateType;
  childrenNumber: string;
  street: string;
  state_id: string;
  city: string;
  role: string;
  has_already_sold_products: string | boolean;
  recent_activities_type: string | boolean;
};

export default function SignUp() {
  const { isPending, mutate: signUp } = useSignUp();
  const { t } = useTranslation();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error message

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>({
    defaultValues: {
      birthDate: { year: "", month: "", day: "" },
    },
  });

  const watchState = watch("state_id");
  const cityData = cityDropdownData[watchState] || null;

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    const stateId = stateIdMapping[data.state_id]
      ? String(stateIdMapping[data.state_id]) // Convert state ID to string
      : "";

    const year = data.birthDate.year;
    const month = data.birthDate.month?.padStart(2, "0");
    const day = data.birthDate.day?.padStart(2, "0");

    const birthdate_date = year && month && day ? `${year}-${month}-${day}` : null;

    if (!birthdate_date) {
      setErrorMessage(t("Invalid birthdate format"));
      return;
    }

    const hasSoldProduct = data.recent_activities_type ? true : false;

    signUp(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.email,
        street: data.street,
        city: data.city,
        state_id: stateId,
        birthdate_date,
        children_number: parseInt(data.childrenNumber, 10) || 0,
        role: data.role,
        has_already_sold_products: hasSoldProduct,
        recent_activities_type: data.recent_activities_type || "",
      },
      {
        onSuccess: () => {
          setShowAlert(true);
        },
        onError: (error) => {
          console.error("Error during sign-up:", error);
          setErrorMessage(t("An error occurred during sign-up. Please try again."));
        },
      }
    );
  };

  if (isPending) {
    return <Spinner message={t("Wait, we are registering your account")} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={signUpStyles.container}
        contentContainerStyle={signUpStyles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form inputs */}
        <StringInput
          name="name"
          rules={{ required: t("Name is required") }}
          placeholder={t("Full Name")}
          autoCapitalize="words"
          control={control}
          error={errors.name}
        />
        <StringInput
          name="email"
          rules={{ required: t("Phone is required") }}
          placeholder={t("Phone")}
          keyboardType="email-address"
          control={control}
          error={errors.email}
        />
        <StringInput
          name="password"
          rules={{ required: t("Password is required") }}
          placeholder={t("Password")}
          secureTextEntry
          control={control}
          error={errors.password}
        />
        <StringInput
          name="reEnterPassword"
          rules={{
            required: t("Re-enter Password is required"),
            validate: (value) =>
              value === watch("password") || t("Passwords do not match"),
          }}
          placeholder={t("Re-enter Password")}
          secureTextEntry
          control={control}
          error={errors.reEnterPassword}
        />
        <DateInput
          name="birthDate"
          label={t("Date of Birth")}
          rules={{
            validate: (value) => {
              if (!value.year || !value.month || !value.day)
                return t("Date of Birth is required");
              if (!isOver18(value.year, value.month, value.day))
                return t("Under minimum age");
              return true;
            },
          }}
          control={control}
          error={errors.birthDate}
        />
        <StringInput
          name="childrenNumber"
          placeholder={t("Number of Children")}
          control={control}
          error={errors.childrenNumber}
        />
        <DropDownInput
          name="state_id"
          items={governorateDropdownData.map((item) => ({
            ...item,
            label: t(item.label),
          }))}
          rules={{ required: t("Select Governorate is required") }}
          placeholder={t("Select Governorate")}
          control={control}
          error={errors.state_id}
        />
        {cityData && (
          <DropDownInput
            name="city"
            items={cityData.map((item) => ({
              ...item,
              label: t(item.label),
            }))}
            rules={{ required: t("Select City is required") }}
            placeholder={t("Select City")}
            control={control}
            error={errors.city}
          />
        )}
        <StringInput
          name="street"
          rules={{ required: t("Street Address is required") }}
          placeholder={t("Street Address")}
          control={control}
          error={errors.street}
        />
        <DropDownInput
          name="role"
          items={roleData.map((item) => ({ ...item, label: t(item.label) }))}
          rules={{ required: t("Role is required") }}
          placeholder={t("Role")}
          control={control}
          error={errors.role}
        />
        <DropDownInput
          name="recent_activities_type"
          items={hasBeenSoldData.map((item) => ({
            ...item,
            label: t(item.label),
          }))}
          rules={{
            required: t("'Has the product been sold before?' is required"),
          }}
          placeholder={t("Has the product been sold before?")}
          control={control}
          error={errors.recent_activities_type}
        />
        <Button title={t("Sign Up")} onPress={handleSubmit(onSubmit)} />
      </KeyboardAwareScrollView>

      {/* Success Alert */}
      {showAlert && (
        <Modal visible={showAlert} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <CustomAlert
              messageTitle={t("Registration Successful")}
              messageBody={t(
                "Your account has been created successfully. Please sign in."
              )}
              buttonText={t("Go to Sign-In")}
              onClose={() => {
                setShowAlert(false);
                router.push("/signin");
              }}
            />
          </View>
        </Modal>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <Modal visible={!!errorMessage} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <CustomAlert
              messageTitle={t("Error")}
              messageBody={t("User with this email already exists")}
              buttonText={t("Exit")}
              onClose={() => {
                setErrorMessage(null); // Clear the error message
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
