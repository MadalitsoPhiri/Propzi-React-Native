import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
  },

  btn: {
    paddingVertical: 13,
    paddingHorizontal: 30,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 25,
    width: "90%",
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
  },
});
