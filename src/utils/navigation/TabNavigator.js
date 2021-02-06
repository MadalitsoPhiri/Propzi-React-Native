import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MainStackNavigator,
  OffersStackNavigator,
  ReportStackNavigator,
} from "./StackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles";

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
            iconName = "ios-home-outline";
          } else if (route.name === "Report") {
            iconName = "ios-document-outline";
          } else if (route.name === "Offers") {
            iconName = "ios-pricetag-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
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
