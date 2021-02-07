import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ManualAddHomeScreen from "../../screens/ManualAddHomeScreen";
import SearchHomeScreen from "../../screens/SearchHomeScreen";
import NotFoundHomeScreen from "../../screens/NotFoundHomeScreen";
import ReportScreen from "../../screens/ReportScreen";
import OffersScreen from "../../screens/OffersScreen";

import logo from "../../../assets/propzi-img/propzi-logo.webp";
import { colors } from "../../styles";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SearchHomeScreen}
        options={{
          headerTitle: () => <Text></Text>,
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="bars"
                size={27}
                color={colors.SECONDARY_COLOR}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View>
              <Image source={logo} style={styles.logo} />
            </View>
          ),
          headerLeftContainerStyle: {
            paddingHorizontal: 20,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ReportStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerTitle: () => <Text></Text>,
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="bars"
                size={27}
                color={colors.SECONDARY_COLOR}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View>
              <Image source={logo} style={styles.logo} />
            </View>
          ),
          headerLeftContainerStyle: {
            paddingHorizontal: 20,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const OffersStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          headerTitle: () => <Text></Text>,
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesome5
                name="bars"
                size={27}
                color={colors.SECONDARY_COLOR}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View>
              <Image source={logo} style={styles.logo} />
            </View>
          ),
          headerLeftContainerStyle: {
            paddingHorizontal: 20,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 56,
    height: 33,
  },
});

export { MainStackNavigator, OffersStackNavigator, ReportStackNavigator };
