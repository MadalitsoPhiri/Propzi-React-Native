import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btn}>{title}</Text>
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
    textAlign: "center",
    borderRadius: 25,
    width: "90%",
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
