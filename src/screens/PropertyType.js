import React,{useState,useContext,useEffect} from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Button,Dimensions} from 'react-native';


const {width,height} = Dimensions.get("window");
export default function PropertyType({navigation}){

    return (<View style={styles.container}> 
        <View style={styles.title} >
            <Text style={{fontFamily:"Poppins-Medium",fontSize:28,lineHeight:42}}>What type of home do you live in?</Text>
        </View>       
     
            <View style={{flexDirection:"row",width,paddingHorizontal:"15%"}}>
            <TouchableOpacity style={styles.tileContainer} onPress={()=>{navigation.navigate("condoSearch")}}>
               <View style={styles.tile}/>
               <Text style={{marginTop:"5%",fontFamily:"Poppins-Medium",fontSize:18,textAlign:"center"}}>Condo</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.tileContainer} onPress={()=>{navigation.navigate("search")}}>
               <View style={styles.tile}/>
               <Text style={{marginTop:"5%",fontFamily:"Poppins-Medium",fontSize:18,textAlign:"center"}}>TownHouse</Text>
           </TouchableOpacity>
            </View>



            <View style={{flexDirection:"row",width,paddingHorizontal:"15%"}}>
            <TouchableOpacity style={styles.tileContainer} onPress={()=>{navigation.navigate("search")}}>
               <View style={styles.tile}/>
               <Text style={{marginTop:"5%",fontFamily:"Poppins-Medium",fontSize:18,textAlign:"center"}}>Detached</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.tileContainer} onPress={()=>{navigation.navigate("search")}}>
               <View style={styles.tile}/>
               <Text style={{marginTop:"5%",fontFamily:"Poppins-Medium",fontSize:18,textAlign:"center"}}>Bungalow</Text>
           </TouchableOpacity>
            </View>
          


          
        
      </View>);
}

const styles = StyleSheet.create({
    container: {
      width,
      marginTop:"15%",
      flex: 1,
      marginTop: "5%",
      backgroundColor: "#fff",
      alignItems: "center",
      padding:16
    },
    title: {
        marginBottom: 30,
    },
    tile: {
        width: 81,
        marginTop: 30,
        height: 71,
        backgroundColor: '#C4C4C4',
        borderRadius:12 
    },
    tileContainer:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
        
    },
    nextButton: {
        marginTop: 50,
    }
  });