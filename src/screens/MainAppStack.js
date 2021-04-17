import React, { useContext, useState, useEffect } from "react";
import TabNavigator from "../utils/navigation/TabNavigator.js";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../components/providers/AuthProvider";
import { dbh } from "../../firebase";
import PropziLogo from "../../assets/PropziLogo.svg";
import BarsIcon from "../../assets/bars-solid.svg";
import { TouchableOpacity, Dimensions } from "react-native";
import NotFoundHomeScreen from "./NotFoundHomeScreen";
import ManualAddHomeScreen from "./ManualAddHomeScreen";
import SearchHomeScreen from "./SearchHomeScreen";
import PropziUpgradesScreen from "./PropziUpgradesScreen";
import PropziVisit from "./PropziVisit";
import Loader from "../components/Loader";
import PropertyType from "./PropertyType";
import changeDefault from "./changeDefault";
import CondoSearchScreen from "./CondoSearchScreen";
import AmmenitiesScreen from "./AmmenitiesScreen";
import UpgradesScreen from "./UpgradesScreen";
import UniqueScreen from "./UniqueScreen";
import { Entypo,AntDesign } from "@expo/vector-icons";
import { CardWebView } from "../components/CardWebView";

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

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

  if (isLoading) {
    return <Loader text="" />;
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
              <AntDesign name="menufold"
                size={height * 0.04}
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
              <AntDesign name="menuunfold"
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />



<Stack.Screen
        name="ammenities"
        component={AmmenitiesScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="changeDefault"
        component={changeDefault}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="WebView"
        component={CardWebView}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="propertyType"
        component={PropertyType}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="condoSearch"
        component={CondoSearchScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="upgrades"
        component={UpgradesScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />



<Stack.Screen
        name="unique"
        component={UniqueScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
        }}
      />




<Stack.Screen
        name="ammenities"
        component={AmmenitiesScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: null,
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

      <Stack.Screen
        name="propertyType"
        component={PropertyType}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          
        }}
      />

      <Stack.Screen
        name="condoSearch"
        component={CondoSearchScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          
        }}
      />

      <Stack.Screen
        name="upgrades"
        component={UpgradesScreen}
        options={{
          headerTitle: (props) => (
            <PropziLogo
              height={height * 0.1}
              width={width * 0.2}
              style={{ marginBottom: "5%" }}
            />
          ),headerRight: (props) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      ),
        }}
      />

      <Stack.Screen
        name="visit"
        component={PropziVisit}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: null,
        }}
      />

<Stack.Screen
        name="unique"
        component={UniqueScreen}
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
              <AntDesign name="menufold"
                size={height * 0.04}
                style={{ marginRight: 15 }}
                color={"black"}
              />
            </TouchableOpacity>
          ),
          headerLeft: ({size}) =>(
           
            <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-thin-left" size={32} style={{ marginLeft: 20 }} color="gray"/></TouchableOpacity>
                      )
        }}
      />

    </Stack.Navigator>
  );
};
