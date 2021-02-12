import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image,Dimensions} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import ManualAddHomeScreen from "../../screens/ManualAddHomeScreen";
import SearchHomeScreen from "../../screens/SearchHomeScreen";
import NotFoundHomeScreen from "../../screens/NotFoundHomeScreen";
import ReportScreen from "../../screens/ReportScreen";
import OffersScreen from "../../screens/OffersScreen";
import PropertyConfirmationScreen from "../../screens/PropertyConfirmationScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import LoginScreen from "../../screens/LoginScreen";
import Intro from "../../screens/Intro";
import BarsIcon from "../../../assets/bars-solid.svg"
import logo from "../../../assets/propzi-img/propzi-logo.webp";
import { colors } from "../../styles";

const Stack = createStackNavigator();
const {width,height} = Dimensions.get("window")
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Text></Text>,
          headerRight: () => (
            <TouchableOpacity>
              <BarsIcon width={20} height={20}/>
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
      <Stack.Screen
        name="Confirmation"
        component={PropertyConfirmationScreen}
      />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
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
               <BarsIcon width={20} height={20}/>
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
               <BarsIcon width={20} height={20}/>
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
