import React from "react";
import { StyleSheet,Text} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/HomeScreen";
import MainAppStack from "../../screens/MainAppStack.js";
import { OffersStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import {DrawerContent} from "../../screens/DrawerContent";
import { PropertyDataProvider } from "../../components/providers/PropertyDataProvider";

const Drawer = createDrawerNavigator();

const MainAppDrawerNavigator = () => {
  return (
    <PropertyDataProvider>
    <Drawer.Navigator  drawerPosition="right" drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Home" component={MainAppStack} />
      <Drawer.Screen name="Offers" component={OffersStackNavigator} />
    </Drawer.Navigator>
    </PropertyDataProvider>

    // <Text>Logged In</Text>
  );
};

export default MainAppDrawerNavigator;
