import React,{useState,useEffect,useContext} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {ActivityIndicator,View} from "react-native";
import {AuthContext} from "./AuthProvider";
import {firebase} from "../../firebase";
import AuthStack from "../screens/AuthStack.js"
import MainAppStack from "../screens/MainAppStack.js";
import checkIfFirstLaunch from "../utils/navigation/checkFirstRun.js";
import IntroStack from "../screens/IntroStack";



const LoadingScreen = () => {
return(<View style={{flexDirection: "row",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}><ActivityIndicator size="large"/></View>);
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

{ user ? <MainAppStack/>:<AuthStack/>}

 
</NavigationContainer>
    );
}