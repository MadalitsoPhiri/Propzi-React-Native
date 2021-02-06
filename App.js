import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/utils/navigation/TabNavigator";

// TODO://Refactor Navigation Setup
export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: Platform.OS == "android" ? 25 : 0,
  },

  logo: {
    width: 56,
    height: 33,
  },
});
