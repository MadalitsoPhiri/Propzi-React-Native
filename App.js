import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import Home from "./src/screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
});
