import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View,Dimensions,SafeAreaView,TouchableOpacity,ScrollView,TouchableRipple} from 'react-native';
import { Chip } from 'react-native-paper';
import { dbh } from "../../firebase";
import Check from "../../assets/Check.svg"
import {AuthContext} from "../components/providers/AuthProvider";
import Loader from "../components/Loader";


const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
  pill: {
    display:"flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:100,
    height:35,

  }
})


export default function PropziUpgradesScreen({navigation}){

    const [newRoof,setNewRoof] = useState(false)
    const [hardwoodFloors,setHardwoodFloors] = useState(false)
    const [exteriorPaint,setExteriorPaint] = useState(false)
    const [swimmingPool,setSwimmingPool] = useState(false)
    const [interiorPaint,setInteriorPaint] = useState(false)
    const [Landscaping,setLandscaping] = useState(false)
    const [frontLawn,setFrontLawn] = useState(false)
    const [bathroomTiles,setbathroomTiles] = useState(false)
    const [alwaysSunny,setAlwaysSunny] = useState(false)
    const [closeToSchool,setCloseToSchool] = useState(false)
    const [hotTub,setHotTub] = useState(false)
    const [closeToChurch,setCloseToChurch] = useState(false)
    const [backyardDeck,setBackyardDeck] = useState(false)
    const [bigBedrooms,setBigBedrooms] = useState(false)
    const [openLayout,setOpenLayout] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const {user,setUser,property,setproperty} = useContext(AuthContext)


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
      };
  
   
      dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .add(dataToSave)
        .then(
          (info) => {
            info.get().then((ds) => {
              if (ds.data()) {
                 navigation.replace("Main");
               
              }
            });
          },
          (err) => {
            console.log(err.message)
            setLoading(false)
          }
        );
    
    }

    if(isLoading){
      return <Loader text="Processing..."/>;
      }
      
    return(<SafeAreaView style={{marginHorizontal:18,marginTop:"2%"}}>
    
          <View>
          <Text style={{fontWeight:"500",fontSize:20,lineHeight:30,textAlign: "center"}}>Have you done any upgrades?</Text>
          <Text style={{fontWeight:"200",fontSize:13,lineHeight:19,textAlign: "center",marginTop:"2%"}}>Choose renovations that you have done in your home since you moved in:</Text>
          </View>
           
            <View style={{marginTop:"5%"}}>

              
             
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom:16}}> 
              <Chip icon="" onPress={() => setSwimmingPool(!swimmingPool)} style={{backgroundColor:swimmingPool ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}><Text style={{color:swimmingPool ? "#ffffff":"#46D0B6",fontSize:16}}>Swimming Pool</Text></Chip>
               <Chip  icon="" onPress={() => setLandscaping(!Landscaping)} style={{backgroundColor:Landscaping ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:Landscaping ? "#ffffff":"#46D0B6",fontSize:16}}>Landscaping</Text></Chip>
               <Chip  icon="" onPress={() => setFrontLawn(!frontLawn)} style={{backgroundColor:frontLawn ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:frontLawn ? "#ffffff":"#46D0B6",fontSize:16}}>Front Lawn</Text></Chip></ScrollView>
              
      
             
           
          
            
            

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
            <Chip icon="" onPress={() => setNewRoof(!newRoof)} style={{backgroundColor:newRoof ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} textStyle={newRoof ? "#46D0B6":"#ffffff"} ><Text style={{color:newRoof ? "#ffffff":"#46D0B6",fontSize:16}}>New Roof</Text></Chip>
            <Chip icon="" onPress={() => setHardwoodFloors(!hardwoodFloors)} style={{backgroundColor:hardwoodFloors ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:hardwoodFloors ? "#ffffff":"#46D0B6",fontSize:16}}>Hardwood Floors</Text></Chip>
            <Chip icon="" onPress={() => setExteriorPaint(!exteriorPaint)} style={{backgroundColor:exteriorPaint ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:exteriorPaint ? "#ffffff":"#46D0B6",fontSize:16}}>Exterior Paint</Text></Chip>
            <Chip  icon="" onPress={() => setbathroomTiles(!bathroomTiles)} style={{backgroundColor:bathroomTiles ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:bathroomTiles ? "#ffffff":"#46D0B6",fontSize:16}}>Bathroom Tiles</Text></Chip>
            <Chip  icon="" onPress={() => setInteriorPaint(!interiorPaint)} style={{backgroundColor:interiorPaint ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:interiorPaint ? "#ffffff":"#46D0B6",fontSize:16}}>Interior Paint</Text></Chip>
            </ScrollView>

            </View>
          


            <View style={{marginTop:"10%"}}> 
          <Text style={{fontWeight:"500",fontSize:20,lineHeight:30,textAlign: "center"}}>What makes your home unique?</Text>
          <Text style={{fontWeight:"200",fontSize:13,lineHeight:19,textAlign: "center",marginTop:"2%"}}>Choose details about your home that best describe your home:</Text>
          </View>
           
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:"10%"}}> 
            <Chip icon="" onPress={() => setNewRoof(!newRoof)} style={{backgroundColor:newRoof ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} textStyle={newRoof ? "#46D0B6":"#ffffff"} ><Text style={{color:newRoof ? "#ffffff":"#46D0B6",fontSize:16}}>New Roof</Text></Chip>
            <Chip icon="" onPress={() => setAlwaysSunny(!alwaysSunny)} style={{backgroundColor:alwaysSunny ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:alwaysSunny ? "#ffffff":"#46D0B6",fontSize:16}}>Always Sunny</Text></Chip>
            <Chip icon="" onPress={() => setCloseToSchool(!closeToSchool)} style={{backgroundColor:closeToSchool ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:closeToSchool ? "#ffffff":"#46D0B6",fontSize:16}}>Close to School</Text></Chip>
            <Chip icon="" onPress={() => setSwimmingPool(!swimmingPool)} style={{backgroundColor:swimmingPool ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}><Text style={{color:swimmingPool ? "#ffffff":"#46D0B6",fontSize:16}}>Swimming Pool</Text></Chip>
            <Chip  icon="" onPress={() => setHotTub(!hotTub)} style={{backgroundColor:hotTub ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:hotTub ? "#ffffff":"#46D0B6",fontSize:16}}>Hot Tub</Text></Chip>
            <Chip  icon="" onPress={() => setCloseToChurch(!closeToChurch)} style={{backgroundColor:closeToChurch ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:closeToChurch ? "#ffffff":"#46D0B6",fontSize:16}}>Close to Church</Text></Chip>
            <Chip  icon="" onPress={() => setBackyardDeck(!backyardDeck)} style={{backgroundColor:backyardDeck ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}}  ><Text style={{color:backyardDeck ? "#ffffff":"#46D0B6",fontSize:16}}>Backyard Deck</Text></Chip>
            <Chip  icon="" onPress={() => setBigBedrooms(!bigBedrooms)} style={{backgroundColor:bigBedrooms ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:bigBedrooms ? "#ffffff":"#46D0B6",fontSize:16}}>Big Bedrooms</Text></Chip>
            <Chip  icon="" onPress={() => setOpenLayout(!openLayout)} style={{backgroundColor:openLayout ? "#46D0B6":"#D6F5EF",marginLeft:16,marginBottom:16}} ><Text style={{color:openLayout ? "#ffffff":"#46D0B6",fontSize:16}}>Open Layout</Text></Chip>
            </ScrollView>



        
            
             <View style={{flexDirection: "row",justifyContent:"space-between", position: 'relative',
    bottom:0,
    width:"100%"}}>
                <TouchableOpacity style={{backgroundColor:"#46D0B6",height:54,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:40,marginTop:"10%",marginBottom:"10%",paddingHorizontal:20,paddingVertical:10}} onPress={()=>{navigation.goBack();}}>
                    <Text style={{fontSize:18,color:"white",fontWeight:"500",lineHeight:27}}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:"#46D0B6",height:54,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:40,marginTop:"10%",marginBottom:"10%",paddingHorizontal:20,paddingVertical:10}} onPress={handlePropertyAdding}>
                    <Text style={{fontSize:18,color:"white",fontWeight:"500",lineHeight:27}}>next</Text>
                </TouchableOpacity>
             </View>
           
        </SafeAreaView>)
}

