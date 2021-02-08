import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../styles";

export default function Input({
  width,
  placeholder,
  authIcon,
  onChangeText,
  value,
}) {
  return (
    <View style={[styles.input, { width: width }]}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={true}
        onChangeText={onChangeText}
        value={value}
        style={{
          fontSize: 17,
          fontWeight: "500",
          color: colors.SECONDARY_COLOR,
        }}
      />
      <TouchableOpacity style={styles.icon}>{authIcon}</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 5,
    backgroundColor: colors.LIGHT_COLOR,
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: "75%",
  },
});
