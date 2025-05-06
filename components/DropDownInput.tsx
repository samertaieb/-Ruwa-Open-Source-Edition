import RNPickerSelect, { Item } from "react-native-picker-select";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { pickerSelectStylesDropDown,dropDownStyles } from "@/globalStyles";

interface DropDownInputProps {
  name: string;
  items: Item[];
  style?: StyleProp<any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder: string;
  control: Control<any>;
  error?: FieldError;
  loading?: boolean; // Add loading prop
}

export function DropDownInput({
  name,
  items,
  style,
  rules,
  placeholder,
  control,
  error,
  loading = false,
}: DropDownInputProps) {
  return (
    <View style={[dropDownStyles.container, style]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[dropDownStyles.label]}>{placeholder}</Text>
            <View style={[dropDownStyles.inputContainer, dropDownStyles.defaultBorder]}>
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <RNPickerSelect
                  items={items}
                  onValueChange={(val) => {
                    onChange(val);
                  }}
                  placeholder={{ label: "", value: null }} // Use empty label for placeholder
                  value={value}
                  style={pickerSelectStylesDropDown}
                  useNativeAndroidPickerStyle={true} // Use the default native styling
                />
              )}
            </View>
          </>
        )}
        name={name}
      />
      {error && <Text style={dropDownStyles.errorText}>{error.message}</Text>}
    </View>
  );
}




