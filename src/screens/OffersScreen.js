import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <Text>OffersScreen</Text>
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
