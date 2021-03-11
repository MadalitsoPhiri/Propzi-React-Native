import React,{useState,useContext,useEffect} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';


export default function PropertyType({navigation}){
   const [loaded] = useFonts({
    'Poppins-Medium':require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-Regular':require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Bold':require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Thin':require('../../assets/fonts/Poppins/Poppins-Thin.ttf'),

   })
 //

    if(!loaded){
     return (<View style={{justifyContent:"center",alignItems:"center"}}>
         <Text>Loading...</Text>
     </View>)
    }
    return (<View style={{marginTop:"10%"}}>
        <Text style={{alignSelf:'center',fontSize:20,fontFamily:"Poppins-Medium"}}>Please Select a property type</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('condoSearch')}} style={{borderRadius:20,backgroundColor:"#6FCF97",paddingVertical:10,paddingHorizontal:20,justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:"15%",width:120}}><Text style={{color:"#ffffff",fontFamily:"Poppins-Medium"}}>Condo</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('search')}} style={{borderRadius:20,backgroundColor:"#6FCF97",paddingVertical:10,paddingHorizontal:20,justifyContent:"center",alignItems:"center", alignSelf:"center",marginTop:"5%",width:120}}><Text style={{color:"#ffffff",fontFamily:"Poppins-Medium"}}>Residential</Text></TouchableOpacity>
    </View>);
}