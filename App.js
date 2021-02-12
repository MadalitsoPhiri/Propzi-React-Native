import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/utils/navigation/TabNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import Intro from "./src/screens/Intro";
import DrawerNavigator from "./src/utils/navigation/DrawerNavigator";
import { firebase } from "./firebase";
import checkIfFirstLaunch from "./src/utils/navigation/checkFirstRun.js";
import {Providers} from "./src/components/Providers";

// TODO://Refactor Navigation Setup
export default Providers 
  // const [isFirstLaunch, setisFirstLaunch] = useState(false);
  
  // const [hasCheckedAsyncStorage, sethasCheckedAsyncStorage] = useState(false);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const check = async () => {
  //   const checked = await checkIfFirstLaunch();
  //   sethasCheckedAsyncStorage(true);
  //   setisFirstLaunch(checked);
  // };

  // useEffect(() => {
  //   check();
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       setLoggedIn(true);
  //     }
  //   });

  //   return setLoggedIn(false);
  // }, []);

  // if (!hasCheckedAsyncStorage) {
  //   return null;
  // }

  
 
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: Platform.OS == "android" ? 25 : 0,
  },

  logo: {
    width: 56,
    height: 33,
  },
});
