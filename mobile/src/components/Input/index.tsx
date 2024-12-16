import React from "react";
import { View, Text, TextInput } from "react-native";

import { styles } from "./styles";

type InputProps = {
  keyboardType?: "default" | "decimal-pad" | "email-address" | "phone-pad";
  text: string;
  value: string | boolean | Date | undefined | number;
  maxLength?: number;
  placeholder?: string;
  password?: boolean;
  returnKeyType?: "done" | "send" | "next";

  onChangeText: (text: any) => void;
  onBlur?: () => void;
};

export default function Input({
  text,
  value,
  maxLength,
  password = false,
  onChangeText,
  onBlur,
  placeholder,
  keyboardType,
  returnKeyType,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
    </View>
  );
}
