import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ReportScreen from "../../screens/ReportScreen";
import OffersScreen from "../../screens/OffersScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import Detailspage from "../../screens/Detailspage";
import LoginScreen from "../../screens/LoginScreen";
import Intro from "../../screens/Intro";

const Stack = createStackNavigator();
const { width, height } = Dimensions.get("window");
const MainStackNavigator = ({route}) => {

  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => null,
          headerLeftContainerStyle: {
            paddingHorizontal: 20,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 20,
          },
        }}
      />
      <Stack.Screen name="detailspage" component={Detailspage} />

      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const ReportStackNavigator = ({route}) => {
 
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerTitle: () => null,
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

const OffersStackNavigator = ({route}) => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          headerTitle: () => null,
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
