import React,{useState,useContext,useEffect} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';



export default function PropertyType({navigation}){

    return (<View style={{marginTop:"10%"}}>
        <View style={{borderWidth:1,borderColor:"#ccc",borderRadius:16,paddingVertical:16,margin:16}}>
        <Text style={{alignSelf:'center',fontSize:20,fontFamily:"Poppins-Medium"}}>Please Select a property type</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('condoSearch')}} style={{borderRadius:20,backgroundColor:"#6FCF97",paddingVertical:10,paddingHorizontal:20,justifyContent:"center",alignItems:"center",alignSelf:"center",marginTop:"10%"}}><Text style={{color:"#ffffff",fontFamily:"Poppins-Medium"}}>Condo</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('search')}} style={{borderRadius:20,backgroundColor:"#6FCF97",paddingVertical:10,paddingHorizontal:20,justifyContent:"center",alignItems:"center", alignSelf:"center",marginTop:"5%"}}><Text style={{color:"#ffffff",fontFamily:"Poppins-Medium"}}>Residential</Text></TouchableOpacity>
        </View>
        
    </View>);
}