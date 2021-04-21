import React,{useState,useContext,useEffect}from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,SafeAreaView} from "react-native";
import { Chip,Divider } from 'react-native-paper';
import {AuthContext} from "../components/providers/AuthProvider";



const BORDER_WIDTH = 2
export default function UpgradesScreen({navigation}){
    const {user,setUser,property,setproperty} = useContext(AuthContext)
    const [ammenities,setAmenities] = useState([])


    useEffect(()=>{
        FindAmenities()
      },[])
    function arrayUnique(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
    
        return a;
    }
    
  
      const FindAmenities = ()=>{
        setAmenities([])
        let fullAmenities = ["New Roof","Hardwood Floors","Hardwood Floors","Exterior Paint","Swimming Pool","Interior Paint","Landscaping","Driveway Interlocking","Front Lawn","Bathroom Tiles"]
        let finalArray = []
          fullAmenities.forEach((item,index)=>{
                   if(item == null || item == ""){
                    return 
                   }
                  const itemState = {name:item,selected:false}
                
                    // setAmenities(currentArray)
                    
                    finalArray.push(itemState)
                    return
        })
        setAmenities(prevArray => [...prevArray, ...finalArray])
        console.log(fullAmenities)
        // console.log("Ammenities",ammenities)
      }
     
return (<SafeAreaView style={{height:"100%"}}>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:"10%"}}>
    <Text style={styles.heading}>Have you done any home upgrades?</Text>
    <Text style={styles.subheading}>Choose renovations that you in your home since you moved in</Text>
    {ammenities.length != 0 ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16}} style={{marginTop:"12%"}}><View style={styles.scrollContainer}>
          {ammenities.map((item, index) => (
          <Chip key={index} icon="" onPress={() => {
            let newState = [...ammenities];
            newState[index].selected = !item.selected
            setAmenities(newState)
            console.log("Ammenities",ammenities)
          }} style={{backgroundColor:item.selected ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:"7%",borderWidth:BORDER_WIDTH,borderColor:"#46D0B6"}} ><Text style={{color:item.selected ? "#ffffff":"#46D0B6",fontSize:16,fontFamily:"Poppins-Regular"}}>{item.name}</Text></Chip>
        ))}
            </View></ScrollView>:null}
            <TouchableOpacity onPress={()=>{
                let temp = {...property}
                temp["upgrades"] = ammenities
                console.log(temp)
                setproperty(temp)
                navigation.navigate("unique")}} style={{alignSelf:"center",marginTop:"25%",backgroundColor:"#46D0B6",borderRadius:20,paddingHorizontal:30,paddingVertical:10}}><Text style={{color:"#fff",fontSize:18,fontFamily:"Poppins-Bold"}}>Next</Text></TouchableOpacity>
                </ScrollView>
</SafeAreaView>)
}

const styles = StyleSheet.create({
 heading:{
     fontFamily:"Poppins-Medium",
     fontSize:28,
     lineHeight:42,
     paddingHorizontal:"8%",
 },
 subheading:{
     fontFamily:"Poppins-Regular",
     fontSize:13,
     lineHeight:19.5,
     paddingHorizontal:"8%",
     marginTop:29
 },
 scrollContainer:{
    flexWrap: "wrap",
    flexDirection:'row',
    width:500
  }
})