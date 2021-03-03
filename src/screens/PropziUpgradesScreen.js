import React,{useState} from 'react';
import { StyleSheet, Text, View,Dimensions,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import { Chip } from 'react-native-paper';
import Check from "../../assets/Check.svg"





export default function PropziUpgradesScreen(){

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


    return(<SafeAreaView style={{marginTop:"10%"}}>
          <View>
          <Text style={{fontWeight:"500",fontSize:20,lineHeight:30,textAlign: "center"}}>Have you done any upgrades?</Text>
          <Text style={{fontWeight:"200",fontSize:13,lineHeight:19,textAlign: "center",marginTop:"2%"}}>Choose renovations that you have done in your home since you moved in:</Text>
          </View>
           
            <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:"5%"}}>
            <Chip icon="" onPress={() => setNewRoof(!newRoof)} style={{backgroundColor:newRoof ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} textStyle={newRoof ? "#46D0B6":"#ffffff"} ><Text style={{color:newRoof ? "#ffffff":"#46D0B6",fontSize:16}}>New Roof</Text></Chip>
            <Chip icon="" onPress={() => setHardwoodFloors(!hardwoodFloors)} style={{backgroundColor:hardwoodFloors ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:hardwoodFloors ? "#ffffff":"#46D0B6",fontSize:16}}>Hardwood Floors</Text></Chip>
            <Chip icon="" onPress={() => setExteriorPaint(!exteriorPaint)} style={{backgroundColor:exteriorPaint ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:exteriorPaint ? "#ffffff":"#46D0B6",fontSize:16}}>Exterior Paint</Text></Chip>
            <Chip icon="" onPress={() => setSwimmingPool(!swimmingPool)} style={{backgroundColor:swimmingPool ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}><Text style={{color:swimmingPool ? "#ffffff":"#46D0B6",fontSize:16}}>Swimming Pool</Text></Chip>
            <Chip  icon="" onPress={() => setInteriorPaint(!interiorPaint)} style={{backgroundColor:interiorPaint ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:interiorPaint ? "#ffffff":"#46D0B6",fontSize:16}}>Interior Paint</Text></Chip>
            <Chip  icon="" onPress={() => setLandscaping(!Landscaping)} style={{backgroundColor:Landscaping ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:Landscaping ? "#ffffff":"#46D0B6",fontSize:16}}>Landscaping</Text></Chip>
            <Chip  icon="" onPress={() => setFrontLawn(!frontLawn)} style={{backgroundColor:frontLawn ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:frontLawn ? "#ffffff":"#46D0B6",fontSize:16}}>Front Lawn</Text></Chip>
            <Chip  icon="" onPress={() => setbathroomTiles(!bathroomTiles)} style={{backgroundColor:bathroomTiles ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:bathroomTiles ? "#ffffff":"#46D0B6",fontSize:16}}>Bathroom Tiles</Text></Chip>
            </View>


            <View style={{marginTop:"10%"}}> 
          <Text style={{fontWeight:"500",fontSize:20,lineHeight:30,textAlign: "center"}}>What makes your home unique?</Text>
          <Text style={{fontWeight:"200",fontSize:13,lineHeight:19,textAlign: "center",marginTop:"2%"}}>Choose details about your home that best describe your home:</Text>
          </View>
           
            <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:"5%"}}>
            <Chip icon="" onPress={() => setNewRoof(!newRoof)} style={{backgroundColor:newRoof ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} textStyle={newRoof ? "#46D0B6":"#ffffff"} ><Text style={{color:newRoof ? "#ffffff":"#46D0B6",fontSize:16}}>New Roof</Text></Chip>
            <Chip icon="" onPress={() => setAlwaysSunny(!alwaysSunny)} style={{backgroundColor:alwaysSunny ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:alwaysSunny ? "#ffffff":"#46D0B6",fontSize:16}}>Always Sunny</Text></Chip>
            <Chip icon="" onPress={() => setCloseToSchool(!closeToSchool)} style={{backgroundColor:closeToSchool ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:closeToSchool ? "#ffffff":"#46D0B6",fontSize:16}}>Close to School</Text></Chip>
            <Chip icon="" onPress={() => setSwimmingPool(!swimmingPool)} style={{backgroundColor:swimmingPool ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}><Text style={{color:swimmingPool ? "#ffffff":"#46D0B6",fontSize:16}}>Swimming Pool</Text></Chip>
            <Chip  icon="" onPress={() => setHotTub(!hotTub)} style={{backgroundColor:hotTub ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:hotTub ? "#ffffff":"#46D0B6",fontSize:16}}>Hot Tub</Text></Chip>
            <Chip  icon="" onPress={() => setCloseToChurch(!closeToChurch)} style={{backgroundColor:closeToChurch ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:closeToChurch ? "#ffffff":"#46D0B6",fontSize:16}}>Close to Church</Text></Chip>
            <Chip  icon="" onPress={() => setBackyardDeck(!backyardDeck)} style={{backgroundColor:backyardDeck ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}}  ><Text style={{color:backyardDeck ? "#ffffff":"#46D0B6",fontSize:16}}>Backyard Deck</Text></Chip>
            <Chip  icon="" onPress={() => setBigBedrooms(!bigBedrooms)} style={{backgroundColor:bigBedrooms ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:bigBedrooms ? "#ffffff":"#46D0B6",fontSize:16}}>Big Bedrooms</Text></Chip>
            <Chip  icon="" onPress={() => setOpenLayout(!openLayout)} style={{backgroundColor:openLayout ? "#46D0B6":"#D6F5EF",marginLeft:"2%",marginBottom:"5%"}} ><Text style={{color:openLayout ? "#ffffff":"#46D0B6",fontSize:16}}>Open Layout</Text></Chip>
            </View>



            <View style={{marginTop:"10%"}}>
          <Text style={{fontWeight:"500",fontSize:20,lineHeight:30,textAlign: "center"}}>Get another opinion from Propzi</Text>
          <Text style={{fontWeight:"200",fontSize:13,lineHeight:19,textAlign: "center",marginTop:"2%"}}>Get a professional assessment from our team of Propzi home surveyors. Your first visit is free!</Text>
          </View>

             <TouchableOpacity style={{backgroundColor:"#46D0B6",width:279,height:54,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:6,marginTop:"10%"}}>
                 <Text style={{fontSize:18,color:"white",fontWeight:"500",lineHeight:27}}>Book a Propzi Visit</Text>
             </TouchableOpacity>
        </SafeAreaView>)
}