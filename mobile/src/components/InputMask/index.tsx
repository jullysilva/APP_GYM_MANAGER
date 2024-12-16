import React from "react";
import { View, Text, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { styles } from "./styles";

type InputProps = {
  keyboardType?: "default" | "decimal-pad" | "email-address" | "phone-pad" | "numeric";
  text: string;
  value: string | boolean | Date | undefined | number;
  maxLength?: number;
  placeholder?: string;
  password?: boolean;
  returnKeyType?: "done" | "send" | "next";
  maskType?: string;
  options?: object;

  onChangeText: (text: any) => void;
  onBlur?: () => void;
};

export default function InputMask({
  text,
  value,
  maxLength,
  password = false,
  onChangeText,
  onBlur,
  placeholder,
  keyboardType,
  returnKeyType,
  maskType,
  options,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {maskType ? (
        <TextInputMask
          type={maskType}
          options={options}
          value={value?.toString()}
          style={styles.input}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={password}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
        />
      ) : (
        <TextInput
          keyboardType={keyboardType}
          value={value?.toString()}
          style={styles.input}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={password}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
        />
      )}
    </View>
  );
}
