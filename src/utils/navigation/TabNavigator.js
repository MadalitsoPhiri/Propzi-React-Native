import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MainStackNavigator,
  OffersStackNavigator,
  ReportStackNavigator,
} from "./StackNavigator";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../styles";

import FileIcon from "../../../assets/file-alt-regular.svg"
import HomeIcon from "../../../assets/home-solid.svg"
import CartIcon from "../../../assets/shopping-cart-solid.svg"

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.PRIMARY_COLOR,
        inactiveTintColor: "gray",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return (<HomeIcon width={size.width} height={size.height}/>);
          } else if (route.name === "Report") {
            return (<FileIcon width={size.width} height={size.height}/>);
          } else if (route.name === "Offers") {
            return (<CartIcon width={size.width} height={size.height}/>);
          }

          return null;
        },
      })}
    >
      <Tabs.Screen name="Home" component={MainStackNavigator} />
      <Tabs.Screen name="Report" component={ReportStackNavigator} />
      <Tabs.Screen name="Offers" component={OffersStackNavigator} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 56,
    height: 33,
  },
});

export default TabNavigator;
