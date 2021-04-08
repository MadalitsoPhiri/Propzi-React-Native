import React,{useState,useContext,useEffect} from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import {AuthContext} from "../components/providers/AuthProvider";
import { MaterialIcons } from '@expo/vector-icons';
import { dbh } from "../../firebase";
import Loader from "../components/Loader";



export default function changeDefault({navigation,route}){


    const {user} = useContext(AuthContext);
    const [isLoading,setLoading] = useState(false);
    const handlePropertySelected = (property)=>{
        //show alert
        Alert.alert(
           "Set New Default?",
           `Are you sure you want to set ${property.streetNumber} ${property.streetName} as default property?`,
           [
             {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
             },
             { text: "OK", onPress: () => {
                setLoading(true)
                dbh.collection("UserDetails")
                .doc(user.uid)
                .collection("Property").where("isDefault", "==", true)
                .get().then((querySnapshot)=>{
                    querySnapshot.forEach((doc) => {
                        dbh.collection("UserDetails")
                  .doc(user.uid)
                  .collection("Property").doc(doc.id).update({isDefault:false}).then(()=>{
                    dbh.collection("UserDetails")
                    .doc(user.uid)
                    .collection("Property").doc(property.id).update({isDefault:true}).then(()=>{
                        navigation.pop()
                    })
                  })
                   
                 
                    });
                })
               } 
           }
           ],
           { cancelable: false }
         );
        //make firebase call
   }

   if (isLoading) {
    return <Loader text="changing default..." />;
  }
    return (<View style={{marginTop:"10%"}}>
        <View>
        <Text style={{alignSelf:'center',fontSize:20,fontFamily:"Poppins-Medium"}}>Select a default property</Text>
        <View>
            {route.params.list.map((property,index)=>{
                return ( <TouchableOpacity onPress={()=>handlePropertySelected(property)} style={styles.addressContainer}>
                    <View style={{flex:1}}><Text style={styles.address}>Address</Text>
                    <Text
            style={styles.actualAddress}
          >{property.repliers.address.unitNumber == "" ?`${property.streetNumber} ${property.streetName}, ${property.neighbourhood}, ${property.city}`:`${property.repliers.address.unitNumber} ,${property.streetNumber} ${property.streetName}, ${property.neighbourhood}, ${property.city}`}</Text></View>
                  <View>
                  {property.isDefault?<MaterialIcons name="radio-button-checked" size={28} color="gray"/>:<MaterialIcons name="radio-button-unchecked" size={28} color="gray"/>}
                  </View>
          
                  </TouchableOpacity>)
            })}
        </View>
        </View>
        
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