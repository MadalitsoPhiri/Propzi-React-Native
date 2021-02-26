import React, { useContext, useState, useEffect } from "react";
import TabNavigator from "../utils/navigation/TabNavigator.js";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack.js";
import { View, ActivityIndicator, Text } from "react-native";
import { AuthContext } from "../components/providers/AuthProvider";
import { firebase, dbh } from "../../firebase";
import PropziLogo from "../../assets/PropziLogo.svg";
import BarsIcon from "../../assets/bars-solid.svg";
import { TouchableOpacity, Dimensions } from "react-native";
import NotFoundHomeScreen from "./NotFoundHomeScreen";
import ManualAddHomeScreen from "./ManualAddHomeScreen";
import SearchHomeScreen from "./SearchHomeScreen";

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

const LoadingScreen = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default MainAppStack = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [hasProperty, setHasProperty] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dbh
      .collection("UserDetails")
      .doc(user.uid)
      .collection("Property")
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.size != 0) {
          //They have not property yet
          setHasProperty(true);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  console.log(user);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return hasProperty ? (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BarsIcon
                width={25}
                height={25}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="manual"
        component={ManualAddHomeScreen}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BarsIcon
                width={25}
                height={25}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="notFound"
        component={NotFoundHomeScreen}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BarsIcon
                width={25}
                height={25}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BarsIcon
                width={25}
                height={25}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="search"
        component={SearchHomeScreen}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),
          headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <BarsIcon
                width={25}
                height={25}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
