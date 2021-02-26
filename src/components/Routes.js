import React,{useState,useEffect,useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {View} from "react-native";
import {AuthContext} from "./providers/AuthProvider";
import {firebase} from "../../firebase";
import AuthStack from "../screens/AuthStack.js"
import MainAppStack from "../screens/MainAppStack.js";
import MainAppDrawerNavigator from "../utils/navigation/MainAppDrawerNavigator";
import checkIfFirstLaunch from "../utils/navigation/checkFirstRun.js";
import IntroStack from "../screens/IntroStack";
import {ActivityIndicator} from "react-native-paper";




const LoadingScreen = () => {
return(<View style={{flexDirection: "row",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><ActivityIndicator size="large" color="#46D0B6"/></View>);
}

export const Routes = () => {
    const [loading,setLoading] = useState(true)
    const {user,setUser} = useContext(AuthContext)
const [isFirstLaunch, setisFirstLaunch] = useState(false);
  
  
  



   


 
    useEffect(() => {
      
        firebase.auth().onAuthStateChanged((User) => {
          if (User != null) {
             setUser(User)
          }else{
            setUser(null)
             
          }
    //       const hasLaunched = AsyncStorage.getItem("hasLaunched");
    //      if (hasLaunched === null) {
    //  setisFirstLaunch(true)
    //  setLoading(false)
    // }else{
    //   setisFirstLaunch(false)
    //   setLoading(false)
    // }

    setLoading(false)
        
          
        });
        

       
        
      },[]);


   if(loading){
       return(<LoadingScreen/>)
   }

    return(
<NavigationContainer>

{ user ? <MainAppDrawerNavigator/>:<AuthStack/>}

 
</NavigationContainer>
    );
}