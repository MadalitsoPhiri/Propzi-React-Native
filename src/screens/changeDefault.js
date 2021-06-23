import React,{useState,useContext,useEffect} from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import {AuthContext} from "../components/providers/AuthProvider";
import {PropertyDataContext} from "../components/providers/PropertyDataProvider";
import { MaterialIcons } from '@expo/vector-icons';
import { dbh } from "../../firebase";
import Loader from "../components/Loader";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function changeDefault({navigation,route}){


    const {user} = useContext(AuthContext);
    const {defaultProperty,Properties,setdefaultHome} = useContext(PropertyDataContext);
    const [isLoading,setLoading] = useState(false);
    async function setDefaultProperty(id){
      try{
          await AsyncStorage.setItem('@defaultProperty',id);
         
      }catch{
        console.log('Error @checkOnboarding:',err)
      }finally{
        setdefaultHome(id)
      }
  
      
    }

   if (isLoading) {
    return <Loader text="changing default..." />;
  }
    return (<View style={{marginTop:"10%",flex:1}}>
      <ScrollView>
        <View>
        <Text style={{alignSelf:'center',fontSize:20,fontFamily:"Poppins-Medium"}}>Select a default property</Text>
        <View>
            {Properties.map((property,index)=>{
                return ( <TouchableOpacity onPress={()=>setDefaultProperty(property.identity)} style={styles.addressContainer}>
                    <View style={{flex:1}}><Text style={styles.address}>Address</Text>
                    <Text
            style={styles.actualAddress}
          >{property.repliers.address.unitNumber == "" ?`${property.streetNumber} ${property.streetName}, ${property.neighbourhood}, ${property.city}`:`${property.repliers.address.unitNumber}, ${property.streetNumber} ${property.streetName}, ${property.neighbourhood}, ${property.city}`}</Text></View>
                  <View>
                  {property.identity == defaultProperty ?<MaterialIcons name="radio-button-checked" size={28} color="gray"/>:<MaterialIcons name="radio-button-unchecked" size={28} color="gray"/>}
                  </View>
          
                  </TouchableOpacity>)
            })}
        </View>
        </View>
        </ScrollView>
    </View>);
}


const styles = StyleSheet.create({
    addressContainer:{
        paddingVertical:10,paddingHorizontal:10,borderColor: 'rgba(158, 150, 158, .5)',borderWidth:1,backgroundColor:"white",
        borderRadius:10,shadowColor:"#000",
         shadowOffset:{width:5,height:10},
         shadowOpacity:0.08,
         shadowRadius:12,marginTop:16,
        flexDirection:"row",alignItems:"center",marginHorizontal:16},
        address: {
            marginTop: 10,
            fontSize: 16,
            fontFamily:"Poppins-Medium",
          },
          actualAddress: {
            fontWeight: "300",
            fontFamily:"Poppins-Medium",
            color:"gray"
          },
})