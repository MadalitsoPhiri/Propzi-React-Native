import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";

export default function NotFoundHome() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.title}>Home Details</Text>
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 40,
    fontWeight: "500",
  },
});
