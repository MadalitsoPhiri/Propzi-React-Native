import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";

export default function Input({ width, placeholder, searchIcon }) {
  return (
    <View style={[styles.input, { width: width }]}>
      <TextInput
        autoCompleteType={"street-address"}
        placeholder={placeholder}
        autoCorrect={true}
        style={{
          fontSize: 17,
          fontWeight: "500",
          color: colors.SECONDARY_COLOR,
        }}
      />
      <TouchableOpacity style={styles.icon}>{searchIcon}</TouchableOpacity>
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
    bottom: "90%",
  },
});
