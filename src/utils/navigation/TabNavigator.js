import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MainStackNavigator,
  OffersStackNavigator,
  ReportStackNavigator,
} from "./StackNavigator";
import HomeScreen from "../../screens/HomeScreen";
import ReportScreen from "../../screens/ReportScreen";
import OffersScreen from "../../screens/OffersScreen";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles";

import { PropertyDataProvider } from "../../components/providers/PropertyDataProvider";
import CommunityDataProvider from "../../components/providers/CommunityDataProvider";
import RecentSaleProvider from "../../components/providers/RecentSaleProvider";
const Tabs = createBottomTabNavigator();
//src/components/providers/PropertyDataProvider.js

const TabNavigator = ({route}) => {
  const { user } = route.params;
  return (
    <PropertyDataProvider>
      <CommunityDataProvider>
        <RecentSaleProvider>
          <Tabs.Navigator
            tabBarOptions={{
              activeTintColor: colors.PRIMARY_COLOR,
              inactiveTintColor: "gray",
            }}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === "Home") {
                  return <AntDesign name="home" color={color} size={size} />;
                } else if (route.name === "Report") {
                  return (
                    <AntDesign name="filetext1" color={color} size={size} />
                  );
                } else if (route.name === "Offers") {
                  return <AntDesign name="tago" color={color} size={size} />;
                }

                return null;
              },
            })}
          >
            <Tabs.Screen name="Home" component={MainStackNavigator} initialParams={{user}}/>
            <Tabs.Screen name="Report" component={ReportStackNavigator} initialParams={user}/>
            <Tabs.Screen name="Offers" component={OffersStackNavigator} initialParams={user}/>
          </Tabs.Navigator>
        </RecentSaleProvider>
      </CommunityDataProvider>
      </PropertyDataProvider>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 56,
    height: 33,
  },
});

export default TabNavigator;
