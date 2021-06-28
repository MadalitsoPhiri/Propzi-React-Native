import React,{useState,useContext} from 'react';
import { StyleSheet, Text, View,Dimensions,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Loader from "../components/Loader";
import { dbh } from "../../firebase";
import {AuthContext} from "../components/providers/AuthProvider";
const {width,height}  = Dimensions.get("window")

const MorningTimeSelecter = ()=>{
  const [isEightSelected,setIsEightSelected] = useState(false)
  const [isNineSelected,setIsNineSelected] = useState(false)
  const [isTenSelected,setIsTenSelected] = useState(false)
  const [isElevenSelected,setIsElevenSelected] = useState(false)
  const {user,setUser,property,setproperty} = useContext(AuthContext)
  const [isLoading,setLoading] = useState(false)

  const onEightSelected = ()=>{
    setIsEightSelected(true)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }

  const onNineSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(true)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }


  const onTenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(true)
    setIsElevenSelected(false)
  }

  const onElevenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(true)
  }


  

return(<View style={styles.timeContainer}>
  <TouchableOpacity style={[styles.time,{backgroundColor:isEightSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onEightSelected}> 
   <Text style={[styles.timeText,{color:isEightSelected ? "#46D0B6":"#A9A9A9"}]}>08.00 AM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isNineSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onNineSelected}> 
   <Text style={[styles.timeText,{color:isNineSelected ? "#46D0B6":"#A9A9A9"}]}>09.00 AM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isTenSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onTenSelected}> 
   <Text style={[styles.timeText,{color:isTenSelected ? "#46D0B6":"#A9A9A9"}]}>10.00 AM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isElevenSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onElevenSelected}> 
   <Text style={[styles.timeText,{color:isElevenSelected ? "#46D0B6":"#A9A9A9"}]}>11.00 AM</Text>
   </TouchableOpacity>

   

  </View>)
}



const AfternoonTimeSelecter = ()=>{
  const [isEightSelected,setIsEightSelected] = useState(false)
  const [isNineSelected,setIsNineSelected] = useState(false)
  const [isTenSelected,setIsTenSelected] = useState(false)
  const [isElevenSelected,setIsElevenSelected] = useState(false)

  const onEightSelected = ()=>{
    setIsEightSelected(true)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }

  const onNineSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(true)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }


  const onTenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(true)
    setIsElevenSelected(false)
  }

  const onElevenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(true)
  }


return(<View style={styles.timeContainer}>
  <TouchableOpacity style={[styles.time,{backgroundColor:isEightSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onEightSelected}> 
   <Text style={[styles.timeText,{color:isEightSelected ? "#46D0B6":"#A9A9A9"}]}>12.00 PM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isNineSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onNineSelected}> 
   <Text style={[styles.timeText,{color:isNineSelected ? "#46D0B6":"#A9A9A9"}]}>01.00 PM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isTenSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onTenSelected}> 
   <Text style={[styles.timeText,{color:isTenSelected ? "#46D0B6":"#A9A9A9"}]}>02.00 PM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isElevenSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onElevenSelected}> 
   <Text style={[styles.timeText,{color:isElevenSelected ? "#46D0B6":"#A9A9A9"}]}>03.00 PM</Text>
   </TouchableOpacity>

   

  </View>)
}

const EveningTimeSelecter = ()=>{
  const [isEightSelected,setIsEightSelected] = useState(false)
  const [isNineSelected,setIsNineSelected] = useState(false)
  const [isTenSelected,setIsTenSelected] = useState(false)
  const [isElevenSelected,setIsElevenSelected] = useState(false)

  const onEightSelected = ()=>{
    setIsEightSelected(true)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }

  const onNineSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(true)
    setIsTenSelected(false)
    setIsElevenSelected(false)
  }


  const onTenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(true)
    setIsElevenSelected(false)
  }

  const onElevenSelected = ()=>{
    setIsEightSelected(false)
    setIsNineSelected(false)
    setIsTenSelected(false)
    setIsElevenSelected(true)
  }


return(<View style={styles.timeContainer}>
  <TouchableOpacity style={[styles.time,{backgroundColor:isEightSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onEightSelected}> 
   <Text style={[styles.timeText,{color:isEightSelected ? "#46D0B6":"#A9A9A9"}]}>04.00 PM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isNineSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onNineSelected}> 
   <Text style={[styles.timeText,{color:isNineSelected ? "#46D0B6":"#A9A9A9"}]}>05.00 PM</Text>
   </TouchableOpacity>

   <TouchableOpacity style={[styles.time,{backgroundColor:isTenSelected ? "#D6F5EF":"#F2F2F2"}]} onPress={onTenSelected}> 
   <Text style={[styles.timeText,{color:isTenSelected ? "#46D0B6":"#A9A9A9"}]}>06.00 PM</Text>
   </TouchableOpacity>

  

   

  </View>)
}



export default function PropziVisit({navigation}) {
  const [isMorningSelected,setIsMorningSelected] = useState(true)
const [isAfternoonSelected,setIsAfternoonSelected] = useState(false)
const [isEveningSelected,setIsEveningSelected] = useState(false)
const [selectedDate,setSelectedDate] = useState({})
const [isLoading,setLoading] = useState(false)
const {user,setUser,property,setproperty} = useContext(AuthContext)

const onMorningSelected = ()=>{
    setIsEveningSelected(false)
    setIsAfternoonSelected(false)
    setIsMorningSelected(true)
 }

 const onAfternoonSelected = ()=>{
  setIsEveningSelected(false)
  setIsAfternoonSelected(true)
  setIsMorningSelected(false)
}

const onEveningSelected = ()=>{
  setIsEveningSelected(true)
  setIsAfternoonSelected(false)
  setIsMorningSelected(false)
}


const handlePropertyAdding = ()=>{
  setLoading(true)
      const dataToSave = {
  bedrooms: property.details.numBedrooms,
  bathrooms: property.details.numBathrooms,
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

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView>
      <Text style={{marginHorizontal:20,fontSize:22,lineHeight:33,fontWeight:"500",marginBottom:"5%"}}>Book Your Propzi Visit</Text>
      <Text style={{marginHorizontal:20,fontSize:15,lineHeight:20,fontWeight:"200",marginBottom:"5%",textAlign:"center",color:"#000000",width:300}} numberoflines={3}>Get a professional assessment from our team of Propzi home surveyors. Your first visit is free!</Text>
      <Text style={{marginHorizontal:20,fontSize:16,lineHeight:33,fontWeight:"500",marginBottom:"5%",alignSelf:"flex-start",color:"#696969"}}>Date</Text>
     <Calendar style={{width:width - 60}}  enableSwipeMonths={true}  markedDates={selectedDate
  } onDayPress={(day)=>{ 
    // 
  

  }} horizontal={true} pagingEnabled={true} theme={{
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#DBF5FF',
    selectedDayTextColor: '#000000',
    todayTextColor: '#46D0B6',
    dayTextColor: '#000000',
    textDisabledColor: '#d9e1e8',
    dotColor: '#DBF5FF',
    selectedDotColor: '#DBF5FF',
    arrowColor: '#46D0B6',
    disabledArrowColor: '#d9e1e8',
    indicatorColor: '#46D0B6',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  }}/>
     <Text style={{marginHorizontal:20,fontSize:16,lineHeight:33,fontWeight:"500",marginBottom:"5%",marginTop:"10%",alignSelf:"flex-start",color:"#696969"}}>Time</Text>
     <View>
       <View style={styles.timeButtonSelectorContainer}>
         <TouchableOpacity style={[styles.pills,{backgroundColor:isMorningSelected ? "#46D0B6":"#ffffff"}]}onPress={onMorningSelected}> 
         <Text style={{color:isMorningSelected ?"#ffffff":"#A9A9A9"}}>Morning</Text>
        </TouchableOpacity>

        
         <TouchableOpacity style={[styles.pills,{backgroundColor:isAfternoonSelected ? "#46D0B6":"#ffffff"}]} onPress={onAfternoonSelected}> 
         <Text style={{color:isAfternoonSelected ?"#ffffff":"#A9A9A9"}}>Afternoon</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pills,{backgroundColor:isEveningSelected ? "#46D0B6":"#ffffff"}]} onPress={onEveningSelected}> 
         <Text style={{color:isEveningSelected ?"#ffffff":"#A9A9A9"}}>Evening</Text>
        </TouchableOpacity>
       </View>
      
      {isMorningSelected ? <MorningTimeSelecter/>:isAfternoonSelected ? <AfternoonTimeSelecter/>: isEveningSelected ? <EveningTimeSelecter/>:<MorningTimeSelecter/>}
     
    
     
     </View>
     <TouchableOpacity style={{height:54,backgroundColor:"#46D0B6",justifyContent:"center",alignItems:"center",borderRadius:6,width:300,marginTop:"5%"}}>
       <Text style={{fontSize:18,lineHeight:21,textAlign:"center",color:"white"}}>Continue</Text>
     </TouchableOpacity>
     <View style={{flexDirection: "row",justifyContent:"space-between"}}>
                <TouchableOpacity style={{backgroundColor:"#46D0B6",height:54,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:40,marginTop:"10%",marginBottom:"10%",paddingHorizontal:20,paddingVertical:10}} onPress={()=>{navigation.goBack();}}>
                    <Text style={{fontSize:18,color:"white",fontWeight:"500",lineHeight:27}}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:"#46D0B6",height:54,flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"center",borderRadius:40,marginTop:"10%",marginBottom:"10%",paddingHorizontal:20,paddingVertical:10}} onPress={handlePropertyAdding}>
                    <Text style={{fontSize:18,color:"white",fontWeight:"500",lineHeight:27}}>next</Text>
                </TouchableOpacity>
             </View>

            </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:"5%"

  },
  timeButtonSelectorContainer:{
  flexDirection:"row",
  width:width - 60

  },
  pills:{
    borderRadius:40,
    height:41,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    
  },
  pillText:{
    lineHeight:24,
    fontWeight:"500",
    fontSize:16,
    color:"#A9A9A9"
  },
  timeContainer:{
   flexDirection:"row",
   marginTop:"10%",
   marginBottom:"10%",
   flexWrap:"wrap",
  },
  time:{
    borderRadius:5,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    height:39,
    flex:1,
    marginRight:"2.5%",
    marginLeft:"2.5%",

    

  },
  timeText:{
    fontSize:14,
    fontWeight:"500",
    lineHeight:21
  }
});
