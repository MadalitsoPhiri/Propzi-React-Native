import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import PropziLogo from "../../assets/PropziLogo.svg"
import forgotpassword from "./Forgotpassword";

import {
    Dimensions,
  } from "react-native";



const {width,height} = Dimensions.get("window")


const AuthStackNavigator = createStackNavigator();


export default AuthStack = ()=>{
    return(<AuthStackNavigator.Navigator initialScreen={LoginScreen}>
        <AuthStackNavigator.Screen name="login" component={LoginScreen} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        <AuthStackNavigator.Screen name="signUp" component={SignUpScreen} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        <AuthStackNavigator.Screen name="forgot" component={forgotpassword} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        </AuthStackNavigator.Navigator>)
};

