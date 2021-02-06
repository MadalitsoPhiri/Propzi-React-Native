import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles";

export default function Checkbox({ width, Icon }) {
  return (
    <TouchableOpacity>
      <View style={[styles.input, { width: width }]}>{Icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    padding: 14,
    borderRadius: 5,
    backgroundColor: colors.LIGHT_COLOR,
    alignItems: "center",
  },
});
