import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import MainAppStack from "../../screens/MainAppStack.js";
import { OffersStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import {DrawerContent} from "../../screens/DrawerContent";

const Drawer = createDrawerNavigator();

const MainAppDrawerNavigator = () => {
  return (
    <Drawer.Navigator  drawerPosition="right" drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Home" component={MainAppStack} />
      <Drawer.Screen name="Offers" component={OffersStackNavigator} />
    </Drawer.Navigator>
  );
};

export default MainAppDrawerNavigator;
