import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { CheckBox } from "@rneui/themed";
import { Button } from "@/components/Button";
import { rulesData } from "@/data/rulesData";
import { useFetchQualityChart, useUpdateQualityChart } from "@/api/profileApi";
import CustomAlert from "@/components/CustomAlert";
import Spinner from "@/components/Spinner";
import { useRouter } from "expo-router";
import { ButtonSecondary } from "@/components/ButtonSecondary";
import { useTranslation } from "react-i18next";

export default function RulesModal() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [agreedRules, setAgreedRules] = useState<{ [key: string]: boolean }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertCloseAction, setAlertCloseAction] = useState<() => void>(() => () => {});
  const {
    data: isQualityChartSigned,
    refetch,
    isLoading,
  } = useFetchQualityChart();
  const { mutate: updateQualityChart } = useUpdateQualityChart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!isLoading && isQualityChartSigned !== undefined) {
      if (isQualityChartSigned) {
        setAlertMessage(t("You have already signed the Quality Charter."));
        setShowAlert(true);
        setAlertCloseAction(() => () => router.push("/(tabs)/profile/profileScreen"));
      }
    }
  }, [isLoading, isQualityChartSigned]);

  const batchSize = 6;
  const currentBatch = rulesData.slice(
    currentBatchIndex * batchSize,
    (currentBatchIndex + 1) * batchSize
  );
  const hasNextBatch = (currentBatchIndex + 1) * batchSize < rulesData.length;
  const hasPreviousBatch = currentBatchIndex > 0;
  const isFinalBatch = !hasNextBatch;

  const handleCheckboxChange = (ruleValue: string) => {
    setAgreedRules((prev) => ({
      ...prev,
      [ruleValue]: !prev[ruleValue],
    }));
  };

  const handleNext = () => {
    if (hasNextBatch) setCurrentBatchIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (hasPreviousBatch) setCurrentBatchIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const allAgreed =
      Object.keys(agreedRules).length === rulesData.length &&
      Object.values(agreedRules).every((value) => value);

    if (allAgreed) {
      setIsSubmitting(true);

      updateQualityChart(undefined, {
        onSuccess: () => {
          setAlertMessage(t("Quality Charter Signed!"));
          setShowAlert(true);
          setIsSubmitting(false);
          setAlertCloseAction(() => () => router.push("/(tabs)/profile/profileScreen"));
        },
        onError: (error) => {
          setAlertMessage(t("Failed to sign the quality charter:") + " " + error.message);
          setShowAlert(true);
          setIsSubmitting(false);
          setAlertCloseAction(() => () => setShowAlert(false));
        },
      });
    } else {
      setAlertMessage(t("Please agree to all rules before submitting."));
      setShowAlert(true);
      setAlertCloseAction(() => () => setShowAlert(false));
    }
  };

  const handleCloseAlert = () => {
    alertCloseAction();
  };

  if (isLoading) {
    return <Spinner message={t("Loading Quality Chart...")} />;
  }

  if (showAlert) {
    return (
      <CustomAlert
        messageTitle={t("Quality Charter")}
        messageBody={alertMessage}
        buttonText={t("Close")}
        onClose={handleCloseAlert}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("Hygiene Rules")}</Text>

      {!isQualityChartSigned && (
        <>
          <FlatList
            data={currentBatch}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.ruleContainer,
                  isArabic && { flexDirection: "row-reverse" },
                ]}
              >
                <CheckBox
                  title={t(item.label)}
                  checked={agreedRules[item.value] || false}
                  onPress={() => handleCheckboxChange(item.value)}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  checkedColor="#97D077"
                  iconRight={isArabic}
                />
              </View>
            )}
            contentContainerStyle={styles.rulesList}
          />

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <ButtonSecondary
                title={t("Previous")}
                onPress={handlePrevious}
                disabled={!hasPreviousBatch}
                style={styles.navButton}
              />
            </View>
            <View style={styles.buttonWrapper}>
              {isFinalBatch ? (
                <Button
                  title={t("Submit")}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onPress={handleSubmit}
                  style={styles.navButton}
                />
              ) : (
                <ButtonSecondary
                  title={t("Next")}
                  onPress={handleNext}
                  disabled={!hasNextBatch}
                  style={styles.navButton}
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B7447",
  },
  rulesList: {
    marginBottom: 20,
  },
  ruleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  navButton: {
    width: "100%",
    paddingVertical: 12,
  },
  checkedText: {
    color: "#4B7447",
  },
});
