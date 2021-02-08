import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";

export default function PropertyConfirmationScreen({ data }) {
  // const { data } = route.params;
  console.warn(data);
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
