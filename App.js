import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Header from "./src/components/Header";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={{ backgroundColor: "#f9f9f9" }}>
      <View style={styles.container}>
        <Header />
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS == "android" ? 25 : 0,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
