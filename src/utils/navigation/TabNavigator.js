import React,{useEffect} from "react";
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
import {HomeScreenProvider} from "../../components/providers/HomeScreenProvider";
import {getDefaultProperty,fetchPropertiesSuccess,fetchProperties,fetchPropertiesFailure} from "../../state/PropertySlice"
import { useSelector,useDispatch} from "react-redux";
import { dbh } from "../../../firebase";
const Tabs = createBottomTabNavigator();

const TabNavigator = ({route}) => {
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()

  const getProperties =  ()=>{
        dispatch(fetchProperties())
        dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .onSnapshot((querySnapshot) => {
          
          if(querySnapshot.empty){
    
          }else{
            let Properties = []
       
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
                let data = doc.data()
                data["identity"] = doc.id
               
                Properties.push(data);
    
            
              
              
            
              
            });
            // setRepliers(Properties[0].repliers.address);
            dispatch(fetchPropertiesSuccess(Properties))
            console.log("Fetch properties Successful")
           
         
          }
          
        })
    }

  useEffect(() => {
    getProperties()
    dispatch(getDefaultProperty())

    return ()=>{
      getProperties()
    }
  

  }, [])

  return (
   
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
            <Tabs.Screen name="Home" component={MainStackNavigator} />
            <Tabs.Screen name="Report" component={ReportStackNavigator} />
            <Tabs.Screen name="Offers" component={OffersStackNavigator} />
          </Tabs.Navigator>
          
        </RecentSaleProvider>
      </CommunityDataProvider>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 56,
    height: 33,
  },
});

export default TabNavigator;
