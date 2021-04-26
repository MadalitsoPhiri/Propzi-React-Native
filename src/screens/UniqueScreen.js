import React,{useState,useContext,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,Dimensions,SafeAreaView,TouchableOpacity,ScrollView,TouchableRipple} from 'react-native';
import { Chip,Divider } from 'react-native-paper';
import { dbh } from "../../firebase";
import Check from "../../assets/Check.svg"
import {AuthContext} from "../components/providers/AuthProvider";
import Loader from "../components/Loader";
import { useFonts } from 'expo-font';
import {Entypo} from "@expo/vector-icons";



const {width} = Dimensions.get("window");

const BORDER_WIDTH = 2


const styles = StyleSheet.create({
  pill: {
    display:"flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:100,
    height:35,

  },
  scrollContainer:{
    flexWrap: "wrap",
    flexDirection:'row',
    width:700
  },
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


export default function UniqueScreen({navigation}){

    
    const [isLoading,setLoading] = useState(false)
    const {user,setUser,property,setproperty} = useContext(AuthContext)
    const [ammenities,setAmenities] = useState([])
    const didMount = useRef(false);
    


    useEffect(()=>{
      if(didMount.current){
        handlePropertyAdding()
      }else{
        didMount.current = true;
      }
     
    },[property])

    useEffect(()=>{
      
        FindAmenities()
        
      },[])

      
 
    
    

    const handlePropertyAdding = ()=>{
      setLoading(true)
      const dataToSave = {
        bedrooms: property.details.numBedrooms,
        bedroomsPlus: property.details.numBedroomsPlus,
        bathrooms: property.details.numBathrooms,
        bathroomsPlus: property.details.numBathroomsPlus,
        squareFeet: property.details.sqft,
        propertyType: property.details.propertyType,
        propertyClass: property.class,
        area: property.address.area,
        city: property.address.city,
        cmaPrice: "",
        propziPrice:"",
        neighbourhood: property.address.neighborhood,
        streetName: property.address.streetName,
        streetNumber: property.address.streetNumber,
        unitNumber: property.address.unitNumber,
        Ammenities:property.ammenities,
        Upgrades:property.upgrades,
        UniqueFeatures:property.uniqueFeatures,
        repliers:property,
        isDefault:true

      };
  



      dbh.collection("UserDetails")
      .doc(user.uid)
      .collection("Property").where("isDefault", "==", true)
      .get()
      .then((querySnapshot) => {

        if (querySnapshot.size != 0) {
          //User already has property
          querySnapshot.forEach((doc) => {
            dbh.collection("UserDetails")
      .doc(user.uid)
      .collection("Property").doc(doc.id).update({isDefault:false})
       
     
        });

        dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .add(dataToSave)
        .then(
          (info) => {
            info.get().then((ds) => {
              if (ds.data()) {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Main'}],
                });
               
              }
            });
          },
          (err) => {
            console.log(err.message)
            setLoading(false)
          }
        );
        }else{
          dbh
          .collection("UserDetails")
          .doc(user.uid)
          .collection("Property")
          .add(dataToSave)
          .then(
            (info) => {
              info.get().then((ds) => {
                if (ds.data()) {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}],
                  });
                 
                }
              });
            },
            (err) => {
              console.log(err.message)
              setLoading(false)
            }
          );
        }

         
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
          setLoading(false)
      });


   
     
    
    }

    // const mapMLS = ()=>{
    //   ammenities.map((item,index)=>{
    //       const [`${index}`,setItem] = useState({isSelected:false,name:item})
    //   })
    // } 


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
      
      let fullAmenities =  ["Beautiful Front Door","Cozy","Great for Hosting","Bike Racks","Tesla/Car Charger","Solar Roof","Bright & Sunny","Smart Home","Breakfast Bar"]
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
      console.log(ammenities)
    }

    
  
    if (isLoading) {
      return <Loader text="adding property..."/>;
    }
      
    return(<SafeAreaView style={{height:"100%"}}>
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:"10%"}}>
         <Text style={styles.heading}>What makes your home unique?</Text>
    <Text style={styles.subheading}>Choose details about your home that best describes your home</Text>
          
         {ammenities.length != 0 ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16}} style={{marginTop:"12%"}}><View style={styles.scrollContainer}>
          {ammenities.map((item, index) => (
          <Chip key={index} icon="" onPress={() => {
            let newState = [...ammenities];
            newState[index].selected = !item.selected
            setAmenities(newState)
          }} style={{backgroundColor:item.selected ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:"7%",borderWidth:BORDER_WIDTH,borderColor:"#46D0B6"}} ><Text style={{color:item.selected ? "#ffffff":"#46D0B6",fontSize:16,fontFamily:"Poppins-Regular"}}>{item.name}</Text></Chip>
        ))}
            </View></ScrollView>:null}
            <TouchableOpacity onPress={()=>{
                let temp = {...property}
                temp["uniqueFeatures"] = ammenities
                console.log(temp)
                setproperty(temp)
                // handlePropertyAdding()
                }} style={{alignSelf:"center",marginTop:"25%",backgroundColor:"#46D0B6",borderRadius:20,paddingHorizontal:30,paddingVertical:10}}><Text style={{color:"#fff",fontSize:18,fontFamily:"Poppins-Bold"}}>Finish</Text></TouchableOpacity> 
         
            </ScrollView>
        
            
             
           
        </SafeAreaView>)
}

