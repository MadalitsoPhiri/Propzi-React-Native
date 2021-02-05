import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";
import { EvilIcons } from "@expo/vector-icons";

export default function Input({ onPress }) {
  return (
    <View style={styles.input}>
      <TextInput
        autoCompleteType={"street-address"}
        placeholder={"Search Address..."}
        autoCorrect={true}
      />
      <TouchableOpacity style={styles.icon}>
        <EvilIcons name="search" size={30} color={colors.BORDER_COLOR} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    padding: 16,
    borderRadius: 5,
    backgroundColor: colors.LIGHT_COLOR,
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: "90%",
  },
});
