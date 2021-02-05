import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Header from "./src/components/Header";
import HomeScreen from "./src/screens/HomeScreen";
import NotFoundHome from "./src/screens/NotFoundHome";
import SearchHome from "./src/screens/SearchHome";
import ManualAddHome from "./src/screens/ManualAddHome";

export default function App() {
  return (
    <SafeAreaView style={{ backgroundColor: "#f9f9f9" }}>
      <View style={styles.container}>
        <Header />
        {/* <HomeScreen /> */}
        <NotFoundHome />
        {/* <SearchHome /> */}
        {/* <ManualAddHome /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    paddingVertical: Platform.OS == "android" ? 25 : 0,
    width: "91%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
