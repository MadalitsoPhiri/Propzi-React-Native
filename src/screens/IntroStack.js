import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import Intro from "./Intro";
import PropziLogo from "../../assets/PropziLogo.svg"
import forgotpassword from "./Forgotpassword";
import {Entypo} from "@expo/vector-icons";
import {TouchableOpacity} from 'react-native';
import SignupOptions from  "./SignupOptions";
import {
    Dimensions,
  } from "react-native";



const {width,height} = Dimensions.get("window")


const IntroStackNavigator = createStackNavigator();


export default IntroStack = ()=>{
    return(<IntroStackNavigator.Navigator initialScreen={Intro}>
        <IntroStackNavigator.Screen name="intro" component={Intro} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        <IntroStackNavigator.Screen name="login" component={LoginScreen}  options={({ route,navigation }) => ({ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} />, headerLeft: props =>(
           
           <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-with-circle-left" size={32} style={{ marginLeft: 20 }} color="#6FCF97"/></TouchableOpacity>
                     ) })}/>
        <IntroStackNavigator.Screen name="signupOptions" component={SignupOptions} options={{ headerShown: false, }}/>
        <IntroStackNavigator.Screen name="signUp" component={SignUpScreen} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> }}/>
        <IntroStackNavigator.Screen name="forgot" component={forgotpassword} options={{ headerTitle: props => <PropziLogo height={height* 0.1} width={width*0.2} style={{marginBottom:"5%"}} /> ,headerLeft: ({size}) =>(
           
           <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-with-circle-left" size={32} style={{ marginLeft: 20 }} color="#6FCF97"/></TouchableOpacity>
                     )}}/>
        </IntroStackNavigator.Navigator>)

}