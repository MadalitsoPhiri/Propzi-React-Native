import React,{useEffect} from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MainStackNavigator,
  OffersStackNavigator,
  ReportStackNavigator,
} from "./StackNavigator";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../styles";
import CommunityDataProvider from "../../components/providers/CommunityDataProvider";
import RecentSaleProvider from "../../components/providers/RecentSaleProvider";
import {getUserProperties,fetchProperties,fetchPropertiesFailure} from "../../state/PropertySlice"
import { useSelector,useDispatch} from "react-redux";
import { dbh } from "../../../firebase";
const Tabs = createBottomTabNavigator();

const TabNavigator = ({route}) => {
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProperties(user))
  }, [])

  return (
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
