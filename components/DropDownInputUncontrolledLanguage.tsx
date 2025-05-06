import RNPickerSelect, { Item } from "react-native-picker-select";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { pickerSelectStylesDropDown ,dropDownStyles} from "@/globalStyles";

interface DropDownInputUncontrolledProps {
  items: Item[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export function DropDownInputUnControlledLanguage({
  items,
  value,
  onChange,
  placeholder,
}: DropDownInputUncontrolledProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={dropDownStyles.languageContainer}>
      <Text style={dropDownStyles.dropDownLabel}>{placeholder}</Text>
      <View style={[dropDownStyles.inputContainer, dropDownStyles.defaultBorder]}>
        {/* Floating label logic */}
        <RNPickerSelect
          items={items}
          onValueChange={(val) => {
            setIsFocused(!!val);
            onChange(val);
          }}
          placeholder={{ label: "", value: null }} // Use empty label for placeholder
          value={value}
          style={pickerSelectStylesDropDown}
          useNativeAndroidPickerStyle={true} // Use the default native styling
          onOpen={() => setIsFocused(true)} // Set focused state on open
          onClose={() => setIsFocused(!!value)} // Set focused state on close
        />
      </View>
    </View>
  );
}




