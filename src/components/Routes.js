import React,{useState,useEffect,useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {View} from "react-native";
import {AuthContext} from "./providers/AuthProvider";
import {firebase} from "../../firebase";
import AuthStack from "../screens/AuthStack.js"
import MainAppDrawerNavigator from "../utils/navigation/MainAppDrawerNavigator";
import IntroStack from "../screens/IntroStack";
import {ActivityIndicator} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login,logout } from "../state/Authentication"
import {useSelector,useDispatch} from "react-redux";






const LoadingScreen = () => {
return(<View style={{flexDirection: "row",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><ActivityIndicator size="large" color="#46D0B6"/></View>);
}



export const Routes = () => {
    const store = useSelector((state=>state))
    console.log("store",store)
    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
const [viewedOnboarding,setViewedOnboarding] = useState(false);

  
const checkOnboarding = async () => {
    try{
   const value = await AsyncStorage.getItem('@viewedOnboarding');
        if (value !== null){
            setViewedOnboarding(true)
        }

    }catch{
    console.log('Error @checkOnboarding:',err)
    }finally{
      setLoading(false)
    }
}
  



   


 
    useEffect(() => {
       
        // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
       
        firebase.auth().onAuthStateChanged((User) => {
          if (User != null) {
             dispatch(login(User))
          }else{
            dispatch(logout())
             
          }
    
        checkOnboarding()
        
          
        });
        

       
        
      },[]);


   if(loading){
       return(<LoadingScreen/>)
   }

   if(!viewedOnboarding){
      return <NavigationContainer>
          <IntroStack/>
      </NavigationContainer>
   }

    return(
<NavigationContainer>

{ auth.user ? <MainAppDrawerNavigator/>:<AuthStack/>}

 
</NavigationContainer>
    );
}