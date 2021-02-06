import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import {
  MainStackNavigation,
  OffersStackNavigation,
  ReportStackNavigation,
} from "./StackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles";

const Tabs = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Contact" component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 56,
    height: 33,
  },
});

export default DrawerNavigator;
