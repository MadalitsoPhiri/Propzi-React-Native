import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles";

export default function Button({
  title,
  onPress,
  width,
  marginTop,
  borderRadius,
  paddingVertical = 15,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <View
        style={[
          styles.btn,
          {
            width: width,
            marginTop: marginTop,
            borderRadius: borderRadius,
            paddingVertical,
          },
        ]}
      >
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
    paddingHorizontal: 30,
    backgroundColor: colors.PRIMARY_COLOR,
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
  },
});
