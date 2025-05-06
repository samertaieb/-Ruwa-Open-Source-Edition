import React, { useState } from "react";
import { Text, View } from "react-native";
import { useGetFinancialData } from "@/api/financialApi";
import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useRouter } from "expo-router";
import { globalStyles, financialScreenStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";

export default function FinancialScreen() {
  const { t } = useTranslation();
  const { data: totalAmountDue, isLoading } = useGetFinancialData();
  const router = useRouter();

  if (isLoading) {
    return <Spinner message={t("Loading financial data...")} />;
  }

  return (
    <View style={financialScreenStyles.container}>
      {/* Display total amount due */}
      <View style={financialScreenStyles.balanceHeader}>
        <Text style={financialScreenStyles.balanceText}>
          {t("Balance")}: {Math.abs(totalAmountDue || 0)} {t("DT")}
        </Text>
      </View>

      {/* Request Microcredit Button */}
      <Button
        title={t("Request Microcredit")}
        onPress={() => router.push("finances/microcreditModal")} // Open the modal screen
        style={financialScreenStyles.requestButton}
      />
    </View>
  );
}
