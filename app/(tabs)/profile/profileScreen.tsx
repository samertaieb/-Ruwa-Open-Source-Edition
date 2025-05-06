import React, { useEffect, useState } from "react";
import {  View, Text, Modal } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/Button";
import { ButtonSecondary } from "@/components/ButtonSecondary";
import { StringInput } from "@/components/StringInput";
import { DropDownInput } from "@/components/DropDownInput";
import { DateInput } from "@/components/DateInput";
import { useRouter, useSegments } from "expo-router";
import { useFetchPartnerInfo, useUpdatePartnerInfo } from "@/api/profileApi";
import { DateType, isOver18 } from "@/data/dropdownData/dateData";
import { governorateDropdownData } from "@/data/dropdownData/governorateData";
import { cityDropdownData } from "@/data/dropdownData/cityData";
import { roleData } from "@/data/dropdownData/roleData";
import { hasBeenSoldData } from "@/data/dropdownData/hasBeenSoldData";
import { useSignOut } from "@/api/authApi";
import Spinner from "@/components/Spinner";
import CustomAlert from "@/components/CustomAlert";
import { useTranslation } from "react-i18next";
import { DropDownInputUnControlled } from "@/components/DropDownInputUncontrolled";
import { profileScreenStyles, styles } from "@/globalStyles";

const stateIdMapping: { [key: string]: number } = {
  "Tunis (TN)": 701,
  "Ariana (TN)": 679,
  "Ben Arous (TN)": 681,
  "La Manouba (TN)": 691,
  "Nabeul (TN)": 694,
  "Zaghouan (TN)": 702,
  "Bizerte (TN)": 682,
  "Béja (TN)": 680,
  "Jendouba (TN)": 685,
  "Le Kef (TN)": 689,
  "Siliana (TN)": 697,
  "Kairouan (TN)": 686,
  "Kasserine (TN)": 687,
  "Sidi Bouzid (TN)": 696,
  "Sousse (TN)": 698,
  "Monastir (TN)": 693,
  "Mahdia (TN)": 690,
  "Sfax (TN)": 695,
  "Gafsa (TN)": 684,
  "Tozeur (TN)": 700,
  "Kébili (TN)": 688,
  "Gabès (TN)": 683,
  "Médenine (TN)": 692,
  "Tataouine (TN)": 699,};

export type ProfileInputs = {
  name: string;
  email: string;
  birthDate: DateType;
  childrenNumber: string;
  street: string;
  state_id: string;
  city: string;
  role: string;
  has_already_sold_products: string;
  recent_activities_type: string | boolean;
};

export default function ProfileScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const segments = useSegments();
  const { signOut } = useSignOut();

  const { data: partnerInfo, isLoading } = useFetchPartnerInfo();
  const { mutate: updatePartnerInfo } = useUpdatePartnerInfo();

  const isModalOpen =
    segments.includes("rulesModal") || segments.includes("changePasswordModal");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: "",
      email: "",
      birthDate: { year: "", month: "", day: "" },
      childrenNumber: "",
      street: "",
      state_id: "",
      city: "",
      role: "",
      has_already_sold_products: "",
      recent_activities_type: "",
    },
  });

  const watchState = watch("state_id");

  useEffect(() => {
    if (!isLoading && partnerInfo) {
      // Set name and email with fallback values
      setValue("name", partnerInfo.name || "");
      setValue("email", partnerInfo.email || "");
  
      // Handle birthDate parsing
      if (typeof partnerInfo.birthdate_date === "string") {
        const [year, month, day] = partnerInfo.birthdate_date.split("-");
  
        // Ensure year, month, and day are valid before setting them
        setValue("birthDate", {
          year: year || "",
          month: month && parseInt(month, 10) > 0 ? String(parseInt(month, 10)) : "",
          day: day && parseInt(day, 10) > 0 ? String(parseInt(day, 10)) : "",
        });
      } else {
        // If birthDate is not a string, reset to empty fields
        setValue("birthDate", { year: "", month: "", day: "" });
      }
  
      // Set children number with fallback to an empty string
      setValue("childrenNumber", partnerInfo.children_number !== undefined ? String(partnerInfo.children_number) : "");
  
      // Set address-related fields with fallback values
      setValue("street", partnerInfo.street || "");
      setValue("city", partnerInfo.city || "");
      setValue("state_id", partnerInfo.state_id || "");
  
      // Set role and activity-related fields
      setValue("role", partnerInfo.statut || "");
      setValue(
        "has_already_sold_products",
        partnerInfo.has_already_sold_products ? "yes" : "no"
      );
      setValue(
        "recent_activities_type",
        partnerInfo.recent_activities_type || ""
      );
    }
  }, [isLoading, partnerInfo, setValue]);
  

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
    const stateId = stateIdMapping[data.state_id]
      ? String(stateIdMapping[data.state_id])
      : "";
    setIsSubmitting(true);

    const transformedData = {
      ...data,
      has_already_sold_products:
        data.has_already_sold_products === "yes" ? "yes" : "no",
      state_id: stateId,
      children_number: parseInt(data.childrenNumber, 10) || 0,
    };

    updatePartnerInfo(transformedData, {
      onSuccess: () => {
        setIsSubmitting(false);
        setAlertProps({
          title: t("Success"),
          body: t("Profile updated successfully!"),
        });
        setAlertVisible(true);
      },
      onError: (error) => {
        setIsSubmitting(false);
        setAlertProps({
          title: t("Error"),
          body: t("Failed to update profile"),
        });
        setAlertVisible(true);
      },
    });
  };

  if (isLoading) {
    return (
      <Spinner message={t("Loading Profile Information...")}  />
    );
  }

  return (
    <View style={profileScreenStyles.container}>
      <KeyboardAwareScrollView contentContainerStyle={profileScreenStyles.contentContainer}>
        {!isModalOpen && (
          <Text style={styles.subheader}>{t("Update Profile")}</Text>
        )}

        <StringInput
          name="name"
          rules={{ required: t("Name is required") }}
          placeholder={t("Full Name")}
          control={control}
          error={errors.name}
        />
        <StringInput
          name="email"
          rules={{ required: t("Phone is required") }}
          placeholder={t("Phone")}
          control={control}
          error={errors.email}
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

        {cityDropdownData[watchState]?.length ? (
          <DropDownInput
            name="city"
            items={cityDropdownData[watchState].map((item) => ({
              ...item,
              label: t(item.label),
            }))}
            rules={{ required: t("Select City is required") }}
            placeholder={t("Select City")}
            control={control}
            error={errors.city}
          />
        ) : null}

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

        <Button
          title={t("Update Profile")}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
        <Button
          title={t("Change Password")}
          onPress={() => router.push("(tabs)/profile/changePasswordModal")}
        />
        <Button
          title={t("Sign Quality Charter")}
          onPress={() => router.push("(tabs)/profile/rulesModal")}
        />
        <ButtonSecondary title={t("Sign Out")} onPress={() => signOut()} />

        <DropDownInputUnControlled
          value={i18n.language}
          items={[
             { value: "fr", label: t("French") },
            // { value: "en", label: t("English") },
            { value: "ar", label: t("Arabic") },
          ]}
          onChange={i18n.changeLanguage}
          placeholder={t("Select Language")}
        />
      </KeyboardAwareScrollView>

      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={profileScreenStyles.overlay}>
          <CustomAlert
            messageTitle={alertProps.title}
            messageBody={alertProps.body}
            buttonText={t("Close")}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}


