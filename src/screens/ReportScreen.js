import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";

export default function ReportScreen({ route, navigation }) {
  // const { data } = route.params;
  // console.warn(route);
  return (
    <View style={styles.container}>
      <Text>ReportScreen</Text>
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
