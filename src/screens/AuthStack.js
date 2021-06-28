import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import PropziLogo from "../../assets/PropziLogo.svg"
import forgotpassword from "./Forgotpassword";
import {Entypo} from "@expo/vector-icons";
import SignupOptions from  "./SignupOptions";
import { useNavigation } from '@react-navigation/native'

import {
    Dimensions,TouchableOpacity
  } from "react-native";



const {width,height} = Dimensions.get("window")



const AuthStackNavigator = createStackNavigator();


export default AuthStack = ()=>{
  
    return(<AuthStackNavigator.Navigator initialScreen={SignupOptions}>
        <AuthStackNavigator.Screen name="SignupOptions" component={SignupOptions} options={{ headerShown: false, }}/>
        <AuthStackNavigator.Screen name="login" component={LoginScreen}   options={({ route,navigation }) => ({ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} />, headerLeft: props =>(
           
           <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-with-circle-left" size={32} style={{ marginLeft: 20 }} color="#6FCF97"/></TouchableOpacity>
                     ) })}/>
        <AuthStackNavigator.Screen name="signUp" component={SignUpScreen} options={({ route,navigation }) => ({ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} />, headerLeft: props =>(
           
           <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-with-circle-left" size={32} style={{ marginLeft: 20 }} color="#6FCF97"/></TouchableOpacity>
                     ) })}/>
        <AuthStackNavigator.Screen name="forgot" component={forgotpassword} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        </AuthStackNavigator.Navigator>)
};

