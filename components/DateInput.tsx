import RNPickerSelect from "react-native-picker-select";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  RegisterOptions,
} from "react-hook-form";
import { Text, View } from "react-native";
import {
  getDaysData,
  getYearsData,
  monthsData,
} from "@/data/dropdownData/dateData";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { pickerSelectStyles, dateInputStyles } from "@/globalStyles";
import { useTranslation } from "react-i18next";

interface DateInputProps {
  name: string;
  label: string;
  style?: Record<string, any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<any>;
  error?:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          year: string;
          month: string;
          day: string;
        }>
      >
    | undefined;
}

export function DateInput({
  name,
  label,
  style,
  rules,
  control,
  error,
}: DateInputProps) {
  const { t } = useTranslation();
  const [dayItems, setDayItems] = useState(getDaysData(31)); // Default to 31 days

  // Translate month labels using t function
  const translatedMonthsData = monthsData.map((month) => ({
    ...month,
    label: t(month.label),
  }));

  const updateDayOptions = (
    selectedMonth?: string,
    selectedYear?: string,
    currentDay?: string
  ) => {
    console.log("Selected Month:", selectedMonth, "Selected Year:", selectedYear);

    if (!selectedMonth || selectedMonth === "") {
      setDayItems(getDaysData(31)); // Default to 31 days
      return currentDay; // No update for day
    }

    const monthIndex = parseInt(selectedMonth, 10);
    const year = parseInt(selectedYear || "", 10);

    let maxDays;
    if (monthIndex === 2) {
      // Handle February
      const isLeapYear =
        year && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
      maxDays = isLeapYear ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(monthIndex)) {
      maxDays = 30; // Months with 30 days
    } else {
      maxDays = 31; // Months with 31 days
    }

    console.log("Max Days for Month:", maxDays);
    setDayItems(getDaysData(maxDays));

    // Adjust the current day if it exceeds the maximum valid day
    if (currentDay && parseInt(currentDay, 10) > maxDays) {
      return maxDays.toString();
    }

    return currentDay; // Return the current day if valid
  };

  return (
    <View style={[dateInputStyles.dateInputContainer, style]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          console.log("Current Value:", value); // Log the current value for debugging

          return (
            <>
              <Text style={dateInputStyles.dateInputLabel}>{label}</Text>
              <View style={dateInputStyles.dateInputRow}>
                {/* Day Picker */}
                <View style={dateInputStyles.dateInputPickerWrapper}>
                  <RNPickerSelect
                    items={dayItems}
                    onValueChange={(e) => {
                      console.log("Selected Day:", e); // Log selected day
                      onChange({ ...value, day: e });
                    }}
                    placeholder={{ label: t("Day"), value: "" }}
                    value={value?.day}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <Ionicons name="chevron-down" size={20} color="#777" />
                    )}
                  />
                </View>

                {/* Month Picker */}
                <View style={dateInputStyles.dateInputPickerWrapper}>
                  <RNPickerSelect
                    items={translatedMonthsData}
                    onValueChange={(e) => {
                      console.log("Selected Month:", e); // Log selected month
                      const updatedDay = updateDayOptions(
                        e,
                        value?.year,
                        value?.day
                      );
                      onChange({ ...value, month: e, day: updatedDay });
                    }}
                    placeholder={{ label: t("Month"), value: "" }}
                    value={value?.month}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <Ionicons name="chevron-down" size={20} color="#777" />
                    )}
                  />
                </View>

                {/* Year Picker */}
                <View style={dateInputStyles.dateInputPickerWrapper}>
                  <RNPickerSelect
                    items={getYearsData()}
                    onValueChange={(e) => {
                      console.log("Selected Year:", e); // Log selected year
                      const updatedDay = updateDayOptions(
                        value?.month,
                        e,
                        value?.day
                      );
                      onChange({ ...value, year: e, day: updatedDay });
                    }}
                    placeholder={{ label: t("Year"), value: "" }}
                    value={value?.year}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => (
                      <Ionicons name="chevron-down" size={20} color="#777" />
                    )}
                  />
                </View>
              </View>
            </>
          );
        }}
        name={name}
      />
      {/* Error Handling */}
      {error && (
        <Text style={dateInputStyles.dateInputErrorText}>{error.message}</Text>
      )}
    </View>
  );
}
