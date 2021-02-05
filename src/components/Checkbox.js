import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";

export default function Checkbox({ width, Icon }) {
  return (
    <View style={[styles.input, { width: width }]}>
      <TouchableOpacity style={styles.icon}>{Icon}</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    padding: 11,
    borderRadius: 5,
    backgroundColor: colors.LIGHT_COLOR,
    alignItems: "center",
  },
});
