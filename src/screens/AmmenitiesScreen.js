import React,{useState,useContext,useEffect}from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,SafeAreaView,Dimensions} from "react-native";
import { Chip,Divider } from 'react-native-paper';
import {AuthContext} from "../components/providers/AuthProvider";
import {RepliersLookupSuccessful} from "../state/OnboardingSlice"
import { useDispatch,useSelector } from "react-redux"; 


const {width,height} = Dimensions.get("window");
const BORDER_WIDTH = 2
export default function AmmenitiesScreen({navigation}){
    const {property} = useSelector(state=>state.onboarding)
    const [ammenities,setAmenities] = useState([])
    const dispatch = useDispatch()



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
        let CondominiumAmmenities = property.condominium.ammenities
        let nearbyAmmenities = property.nearby.ammenities
        let fullAmenities =  arrayUnique(CondominiumAmmenities.concat(nearbyAmmenities))
        let finalArray = []
          fullAmenities.forEach((item,index)=>{
                   if(item == null || item == "" || item == undefined){
                    return 
                   }
                  const itemState = {name:item,selected:true}
                
                    // setAmenities(currentArray)
                    
                    finalArray.push(itemState)
                    return
        })
        setAmenities(prevArray => [...prevArray, ...finalArray])
        console.log(fullAmenities)
        console.log(ammenities)
      }
     
return (<SafeAreaView style={{height:"100%"}}>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:"10%",justifyContent:"space-between"}}>
    {property.class == "CondoProperty" ?<Text style={styles.heading}>Are these the latest amenities in your condo building?</Text>:<Text style={styles.heading}>Are these the latest amenities in your house?</Text>}
    <Text style={styles.subheading}>These amenities were listed on the latest MLS listing for your home.</Text>
    
    {ammenities.length != 0 ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16}} style={{marginTop:"12%"}}><View style={styles.scrollContainer}>
          {ammenities.map((item, index) => (
          <Chip key={index} icon="" onPress={() => {
            let newState = [...ammenities];
            newState[index].selected = !item.selected
            setAmenities(newState)
          }} style={{backgroundColor:item.selected ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:"7%",borderWidth:BORDER_WIDTH,borderColor:"#46D0B6", shadowOffset:{width:5,height:10},
          shadowOpacity:0.15,
          shadowRadius:12,
          elevation:7}} ><Text style={{color:item.selected ? "#ffffff":"#46D0B6",fontSize:16,fontFamily:"Poppins-Regular"}}>{item.name}</Text></Chip>
        ))}
            </View></ScrollView>:null}
            <TouchableOpacity onPress={()=>{
                let temp = {...property}
                temp["ammenities"] = ammenities
                console.log(temp)
                dispatch((RepliersLookupSuccessful(temp)));
                navigation.navigate("upgrades")
                }} style={styles.continueButton}><Text style={{color:"#fff",fontSize:18,fontFamily:"Poppins-Bold"}}>Next</Text></TouchableOpacity>
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
 continueButton:{
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:6,
  backgroundColor:"#34D1B6",
  height:50,
  width:width - 50,
  alignSelf:"center",
  marginTop:"10%",
  shadowColor:"#000",
  shadowOffset:{width:5,height:10},
  shadowOpacity:0.15,
  shadowRadius:12,
  elevation:7,
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
    width:600,
    marginBottom:"10%",
    marginTop:"5%"
  }
})