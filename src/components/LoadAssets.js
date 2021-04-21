import React,{ ReactNode} from 'react';
import {Text,View} from 'react-native';
import { useFonts } from 'expo-font';
import Loader from "../components/Loader";


 const LoadAssets = (props) => {
    const [loaded] = useFonts({
        'Poppins-Medium':require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Regular':require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold':require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-Thin':require('../../assets/fonts/Poppins/Poppins-Thin.ttf'),
    
       })
 
      
    
    if(!loaded){
     return <Loader text="loading..."/>;
    }
    return <>{props.children}</>;
}

export default LoadAssets;