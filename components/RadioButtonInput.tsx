import RNPickerSelect, { Item } from "react-native-picker-select";
import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { radioButtonStyles } from "@/globalStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RadioButtonInputProps {
  name: string;
  options: Item[];
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder: string;
  control: Control<any>;
  error?: FieldError;
}

export function RadioButtonInput({
  name,
  options,
  rules,
  placeholder,
  control,
  error,
}: RadioButtonInputProps) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <Text>{placeholder}</Text>
              <View style={radioButtonStyles.container}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={radioButtonStyles.optionContainer}
                    onPress={() => onChange(option.value)}
                  >
                    <View style={radioButtonStyles.circle}>
                      {value === option.value && (
                        <View style={radioButtonStyles.checkedCircle} />
                      )}
                    </View>
                    <Text style={radioButtonStyles.label}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          );
        }}
      />
      {error && <Text style={radioButtonStyles.errorText}>{error.message}</Text>}
    </>
  );
}


