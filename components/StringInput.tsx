import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from "react-native";
import { StringInputStyles } from "@/globalStyles";

interface StringInputProps {
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  control: Control<any>;
  error?: FieldError;
  editable?: boolean;
  rightText?: string; // Added rightText prop
}

export const StringInput = ({
  name,
  rules,
  placeholder,
  autoCapitalize,
  keyboardType,
  secureTextEntry = false,
  control,
  error,
  editable = true,
  rightText, // Destructure the rightText prop
}: StringInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={StringInputStyles.container}>
            <Text style={StringInputStyles.stringInputLabel}>{placeholder}</Text>
            <View style={StringInputStyles.inputContainer}>
              <TextInput
                style={[StringInputStyles.input, !editable ? StringInputStyles.disabledInput : {}]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                editable={editable}
              />
              {/* Display the rightText if provided */}
              {rightText && <Text style={StringInputStyles.unit}>{rightText}</Text>}
            </View>
          </View>
        )}
      />
      {error && error.type === "validate" && name === "reEnterPassword" && (
        <Text style={StringInputStyles.errorText}>The passwords don't match</Text>
      )}
      {error && <Text style={StringInputStyles.errorText}>{error.message}</Text>}
    </>
  );
};


