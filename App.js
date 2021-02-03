import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:25,
    paddingHorizontal:20,
    backgroundColor:'#f9f9f9'
  },
});
