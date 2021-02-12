import React from 'react';
import TabNavigator from "../utils/navigation/TabNavigator.js";
import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack.js"

const Stack = createStackNavigator()

export default MainAppStack = () =>{
    return (<Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator}/>
        <Stack.Screen name="Auth" component={AuthStack}/>
    </Stack.Navigator>);
}

