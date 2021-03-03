import React, { useState,useContext } from 'react';
import { StyleSheet, Text,TextInput, View ,Dimensions,ScrollView,Animated,SafeAreaView,TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get("window")
import { dbh } from "../../firebase";
import {AuthContext} from "../components/providers/AuthProvider";
import PropziVisit from "./PropziVisit";
import PropziUpgradesScreen from "./PropziUpgradesScreen";
import { ActivityIndicator,Modal,Provider,Portal, Dialog} from 'react-native-paper';
import Loader from "../components/Loader";



const Input = ({ width, placeholder, searchIcon, onChangeText,value ,editable})=> {
  return (
    <View style={[styles.input, { width: width }]}>
      <TextInput
        autoCompleteType={"street-address"}
        placeholder={placeholder}
        autoCorrect={true}
        onChangeText={onChangeText}
        value={value}
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: "gray",
        }}
        editable={editable}
      />
      <TouchableOpacity style={styles.icon}>{searchIcon}</TouchableOpacity>
    </View>
  );
}



const cleanAddress = (raw)=>{
  const postGridAddress = raw.split(" ");
    // ._dispatchInstances.memoizedProps.children[0].props.children.props.children.toLowerCase();
    let streetName;
    let streetNumber;

    if (postGridAddress.length == 3){
      let lastItem = postGridAddress[postGridAddress.length - 1]
       

        if(lastItem.length <= 2){
          streetNumber = postGridAddress[0]
          streetName = postGridAddress[1]
        }else{
          streetNumber = postGridAddress[0]
          postGridAddress.shift()
          let streetNameArray = []
          postGridAddress.forEach((item)=>{
            streetNameArray.push(item)
          })
         streetName = streetNameArray.join(" ").toLowerCase()
        }
    
     return {streetNumber,streetName}

  }else if (postGridAddress.length > 3){
      let lastItem = postGridAddress[postGridAddress.length - 1]
      let secondLastItem = postGridAddress[postGridAddress.length - 2]
      
      if (secondLastItem.length == 2 && lastItem.length == 1){
        postGridAddress.pop()
        postGridAddress.pop()
       
           streetNumber = postGridAddress[0]
   
          let streetNameArray = []
          let index;
          for (index = 0; index < postGridAddress.length; index++){
              if (index != 0){
                  streetNameArray.push(postGridAddress[index])
              }
              
          }
         streetName = streetNameArray.join(" ").toLowerCase()
   
         return {streetNumber,streetName}
         
          
          
          
      }else{
        if(lastItem.length == 1){
          postGridAddress.pop()
          streetNumber = postGridAddress[0]
         let streetNameArray = []
         let index;
         for (index = 0;index < postGridAddress.length; index++){
             if (index != 0){
               streetNameArray.push(postGridAddress[index])
             }
           
         }
          streetName = streetNameArray.join(" ").toLowerCase()
        }else{
          streetNumber = postGridAddress[0]
          postGridAddress.shift()
          let streetNameArray = []
          postGridAddress.forEach((item)=>{
            streetNameArray.push(item)
          })
         streetName = streetNameArray.join(" ").toLowerCase()
          
        }
        return {streetNumber,streetName}
//                                       
         
      }
      
  }else{
  
      console.log("Error addressArray larger than expected!")
      streetNumber = postGridAddress[0]
     streetName = postGridAddress[1]
     return {streetNumber,streetName}
      
  }
}





export default function SearchHomeScreen({navigation}) {
  const [searchResults,setSearchResults] = useState(null)
  const [noResults,setnoResults] = useState(false)
  const [isFetching,setisFetching] = useState(false)
  const [searchValue,setsearchValue] = useState("")
  const [propertyFound,setpropertyFound] = useState(false);
  const [propertyNotFound,setpropertyNotFound] = useState(false)
  const [isLoading,setLoading] = useState(false)
  const {user,setUser,property,setproperty} = useContext(AuthContext)
  const [isMLSSelected,setMLSSelected] = useState(true)
  const [isUpgradesSelected,setUpgradesSelected] = useState(false)
  const [isPropziVisitSelected,setPropziVisitSelected] = useState(false)
  const [bedroom,setBedroom] = useState("")
  const [bedroomPlus,setBedroomPlus] = useState("")
  const [bathrooms,setBathrooms] = useState("")
  const [bathroomsPlus,setBathroomsPlus] = useState("")

  const [bedroomVisible, setbedroomVisible] = React.useState(false);
  const [bathroomVisible, setbathroomVisible] = React.useState(false);

  const showBathroomEdit = () => {
    if(property.details.numBathrooms != null || property.details.numBathrooms != ""){
      setBathrooms(property.details.numBathrooms)
    }else{
      setBathrooms("0")
    }

    if(property.details.numBathroomsPlus != null || property.details.numBathroomsPlus != ""){
      setBathroomsPlus(property.details.numBathroomsPlus)
    }else{
      setBathroomsPlus("0")
    }
   
    
    setbathroomVisible(true);
  }
  const showBedroomEdit = () => {

    if(property.details.numBedrooms == null || property.details.numBedrooms == ""){
      setBedroom("0")
    }else{
     
      setBedroom(property.details.numBedrooms)
    }

    if(property.details.numBedroomsPlus == null || property.details.numBedroomsPlus == ""){
      
      setBedroomPlus("0")
    }else{
      setBedroomPlus(property.details.numBedroomsPlus)
    }
    
    setbedroomVisible(true)
  
  };
  
  
  const hideBedroomDialog = () => setbedroomVisible(false);
  const hideBathroomDialog = () => setbathroomVisible(false);


  const getPropertyDetails = (raw)=>{
     const {streetNumber,streetName} = cleanAddress(raw)
     console.log(streetName)
     console.log(streetNumber)
    const REPLIERS_OPTIONS = {
      method: "GET",
      headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
    };

    const REPLIERS_ENDPOINT_WITHOUT_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName}&streetNumber=${streetNumber}`;

    const REPLIERS_ENDPOINT_WITH_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName}&streetNumber=${streetNumber}&status=U`;

    const ACHEIVED_LISTING_URL = `https://api.repliers.io/listings/archived/?streetName=${streetName}&streetNumber=${streetNumber}`;

     console.log(REPLIERS_ENDPOINT_WITHOUT_STATUS_U)
    fetch(REPLIERS_ENDPOINT_WITHOUT_STATUS_U,REPLIERS_OPTIONS).then(res=>res.json())
.then(obj=>{
     console.log(obj)
     if(obj.listings.length == 0){
        //try another end point
        fetch(REPLIERS_ENDPOINT_WITH_STATUS_U,REPLIERS_OPTIONS).then(res=>res.json()).then(obj=>{
          if(obj.listings.length == 0){
          // try yet another end point
           fetch(ACHEIVED_LISTING_URL,REPLIERS_OPTIONS).then(res=>res.json()).then(obj=>{
             if(obj.listings.length == 0){
               setpropertyNotFound(true)
               setisFetching(false)
             }else{
                   setisFetching(false)
                   setproperty(obj.listings[0])
                   setpropertyFound(true)
                  
                   console.log(obj.listings[0])
             }
           }).catch(err=>{
             console.log(err)
             setisFetching(false)
          })
          }else{
            setisFetching(false)
            setproperty(obj.listings[0])
            setpropertyFound(true)
           
            console.log(obj.listings[0])
          }
        }).catch(err=>{
          console.log(err.message)
          setisFetching(false)
        })
     }else{
       setisFetching(false)
       setproperty(obj.listings[0])
       setpropertyFound(true)
     
       console.log(obj.listings[0])
     }
}).catch(err=>{
  console.log(err.message)
  setisFetching(false)
})
  }
  



  const handleSearch = (e)=>{
     setsearchValue(e)
     setpropertyFound(false)
     setpropertyNotFound(false)
    setnoResults(false)
    if(e == " "){
       setSearchResults(null)
  
    }else{
      getAddressPreview(e)
      
    }
    
     
      
  }

  const handleSelect = (index)=>{
    setisFetching(true)
    let RawAddress = searchResults.data[index].preview.address
    setsearchValue(RawAddress)
    setSearchResults(null)
    //Call Repliers
    getPropertyDetails(RawAddress);
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
  const getAddressPreview = (term)=>{
    const APK_KEY = "live_sk_dRCPsWquUqHFmErbqbFd7f";
  const END_POINT = `https://api.postgrid.com/v1/addver/completions?partialStreet=${term}&countryFilter=CA`;
    const OPTIONS = {
      method: "GET",
      headers: {
        "x-api-key": APK_KEY,
      },
    };
        fetch(END_POINT,OPTIONS).then(res=>res.json()).then((data)=>{
          console.log(data)
          if(data.data.length == 0){
            setSearchResults(null)
            setnoResults(true)
          }else{
            setSearchResults(data)
          }
          
        }).catch(err=>{
          console.log(err)
        });
  }

  const onMLSSelected = () =>{
    setMLSSelected(true)
    setUpgradesSelected(false)
    setPropziVisitSelected(false)
  }


  const onUPgradesSelected = () =>{
    setMLSSelected(false)
    setUpgradesSelected(true)
    setPropziVisitSelected(false)
  }

  const onPropziVisitSelected = () =>{
    setMLSSelected(false)
    setUpgradesSelected(false)
    setPropziVisitSelected(true)
  }

  const handleBedroomEdit = (e) =>{
        setBathrooms(e)
  }

  const handleBedroomPlusEdit = (e) =>{
        setBedroomPlus(e)
  }

if(isLoading){
return <Loader text=""/>;
}

  return (
    <Provider>
    <SafeAreaView style={styles.container}>


      <ScrollView style={{height:"100%"}}>
      <Animated.View>
      <View style={styles.resultsContainer}> 
      <Input placeholder="Search Address..." onChangeText={handleSearch} value={searchValue}editable={isFetching?false:true}/>
      {noResults ? <Text style={{fontSize:20,justifyContent:"center",alignItems:"center",flexDirection:"row",width:"100%",textAlign:"center",marginBottom:"5%"}}>no results</Text>:null}
      <ScrollView >
      {searchResults && searchResults.data ? 
      searchResults.data.map((result,index) => (
        <TouchableOpacity onPress={()=>handleSelect(index)}style={{height:40}}><Text key={index} style={{color:"#B9B9B9",fontSize:13,padding:20}}>{`${result.preview.address}, ${result.preview.city}, ${result.preview.pc}`}</Text></TouchableOpacity>
      ))
      :null}
       
        
     

      </ScrollView>
       
      </View>

      <Portal>
        {/* Dialog 1 */}
      <Dialog visible={bedroomVisible} onDismiss={hideBedroomDialog} dismissable={false}>
        <Dialog.Content>
          <View style={{flexDirection:"row",alignItems: "center"}}>
            <Text style={{flex:1}}>number of Bedrooms:</Text>
          <Input style={{flex:1,borderWidth:1,borderColor:"#000000"}} placeholder="Enter number of bedrooms" onChangeText={handleBedroomEdit} value={bedroom}/>
          </View>

          <View style={{flexDirection:"row",alignItems: "center"}}>
            <Text style={{flex:1}}>number of BedroomsPlus:</Text>
            <Input  onChangeText={handleBedroomPlusEdit} value={bedroomPlus} />
          </View>
        
       
          <TouchableOpacity style={{backgroundColor:"#46D0B6",borderRadius:10,paddingHorizontal:20,paddingVertical:10,width:80,alignSelf:"center",marginTop:"5%"}} onPress={hideBedroomDialog}><Text style={{color:"#ffffff"}}>Done</Text></TouchableOpacity>
        </Dialog.Content>

      </Dialog>
          {/* Dialog 2 */} 
      <Dialog visible={bathroomVisible} onDismiss={hideBathroomDialog} dismissable={false}>
        <Dialog.Content>
        <Input  onChangeText={handleBedroomEdit} value={""}/>
        <Input placeholder="Enter number of bathrooms Plus" onChangeText={handleBedroomPlusEdit} value={""}/>
       <TouchableOpacity style={{backgroundColor:"#46D0B6",borderRadius:10,paddingHorizontal:20,paddingVertical:10,marginTop:"5%"}} onPress={hideBathroomDialog}><Text style={{color:"#ffffff"}}>Done</Text></TouchableOpacity>
        </Dialog.Content>
        
      </Dialog>
        {/* Dialog 3 */} 
      <Dialog visible={bathroomVisible} onDismiss={hideBathroomDialog} dismissable={false}>
        <Dialog.Content>
        <Input placeholder="Enter number of bathrooms" onChangeText={handleBedroomEdit} value={""}/>
       <TouchableOpacity onPress={hideBathroomDialog}><Text>Done</Text></TouchableOpacity>
        </Dialog.Content>
        
      </Dialog>
        </Portal>
      </Animated.View>
      <Text style={{fontSize:14,padding:16,textAlign:"center",color:"#828282",marginTop:"5%"}}>Enter your address and we will try to search for it automatically.</Text>
      {isFetching ? <View style={{marginTop:"20%"}}>
        <ActivityIndicator size="large" color="#46D0B6"/>
        <Text style={{fontSize:15,marginTop:"5%",marginHorizontal:20,textAlign:"center"}}>finding your home</Text>
        </View>:null}
        {propertyNotFound ?<View style={{marginTop:"10%",marginHorizontal:16,alignSelf:"center",JustifySelf:"center"}}>
          <Text style={{fontSize:20,fontWeight:"semi-bold",marginBottom:"4%",textAlign:"center"}}>Oops! We can’t find your home info</Text>
          <Text style={{fontSize:17,textAlign:"center",color:"#828282"}}>we were unable to find your home details, press continue below to enter the details manually.</Text>

          <TouchableOpacity style={styles.continueButton} onPress={() =>navigation.navigate("manual")}><Text style={{color:"white",fontSize:18}}>Continue</Text></TouchableOpacity>
          </View>
        :null}
        {propertyFound ? <View style={{padding:20,marginBottom:"20%"}}>
    <Text style={{fontSize:24}}>Home Details</Text>



<View>
<View style={{marginTop:"10%"}}>
  <View style={{marginBottom:"5%"}}>
  <Text style={{fontWeight:"500",fontSize:16}}>Address</Text>
    <Text style={{fontWeight:"500",fontSize:14,color:"#A4A4A4",marginTop:"5%"}}>{property.address.streetNumber} {property.address.streetName}  {property.address.neighborhood} {property.address.district} {property.address.state}</Text>
  </View>
<View style={{flexDirection:"row"}}> 
    <View style={{flex:1}}>
       <Text style={{fontWeight:"500",fontSize:16}}>Bedrooms</Text>
       <Text style={{fontWeight:"500",fontSize:14,color:"#A4A4A4",marginTop:"5%"}}>{` number of Bedrooms ${property.details.numBedrooms} + ${property.details.numBedroomsPlus == "" || property.details.numBedroomsPlus == null ?"0":property.details.numBedroomsPlus}`}</Text>
      </View>
      <View style={{flex:0.5,flexDirection:"row",alignItems:"center",justifyContent: "center"}}>
        <TouchableOpacity onPress={showBedroomEdit}style={{borderRadius:10, backgroundColor:"#34D1B6",flexDirection:"row",alignItems: "center",justifyContent: "center"}}><Text style={{color:"#ffffff",paddingVertical:10,paddingHorizontal:20}}>Edit</Text></TouchableOpacity>
      </View>
    </View>

    <View style={{flexDirection:"row",marginTop:"5%"}}> 
    <View style={{flex:1}}>
       <Text style={{fontWeight:"500",fontSize:16}}>Bathrooms</Text>
       <Text style={{fontWeight:"500",fontSize:14,color:"#A4A4A4",marginTop:"5%"}}>{`number of Bathrooms ${property.details.numBathrooms} + ${property.details.numBathroomsPlus == "" || property.details.numBathroomsPlus == null?"0":property.details.numBedroomsPlus}`}</Text>
      </View>
      <View style={{flex:0.5,flexDirection:"row",alignItems:"center",justifyContent: "center"}}>
        <TouchableOpacity onPress={showBathroomEdit}style={{borderRadius:10, backgroundColor:"#34D1B6",flexDirection:"row",alignItems: "center",justifyContent: "center"}}><Text style={{color:"#ffffff",paddingVertical:10,paddingHorizontal:20}}>Edit</Text></TouchableOpacity>
      </View>
    </View>


    <View style={{flexDirection:"row",marginTop:"5%"}}> 
    <View style={{flex:1}}>
       <Text style={{fontWeight:"500",fontSize:16}}>Space:Main Interior</Text>
       <Text style={{fontWeight:"500",fontSize:14,color:"#A4A4A4",marginTop:"5%"}}>{` Sqft: ${property.details.sqft}`}</Text>
      </View>
      <View style={{flex:0.5,flexDirection:"row",alignItems:"center",justifyContent: "center"}}>
        <TouchableOpacity style={{borderRadius:10, backgroundColor:"#34D1B6",flexDirection:"row",alignItems: "center",justifyContent: "center"}}><Text style={{color:"#ffffff",paddingVertical:10,paddingHorizontal:20}}>Edit</Text></TouchableOpacity>
        </View>

    </View>
</View>
    

<TouchableOpacity style={styles.addHomeButton} onPress={()=>{navigation.navigate("upgrades")}}>
  <Text style={{fontSize:18,color:"white"}}>Next</Text>
</TouchableOpacity>
</View>
  </View>:null}
        </ScrollView>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center",
    flexDirection:"row"
   
  },
  resultsContainer:{
    shadowColor:"#333",
    shadowOffset:{width:1,height:1},
    backgroundColor:"white",
    shadowRadius:5,
    shadowOpacity:0.3,
    borderRadius:10,
    width:width - 40,
    maxHeight:height / 2,
    marginTop:30,
    alignSelf:"center",
    elevation:5
   


  },
  continueButton:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"#34D1B6",
    height:50,
    width:width - 50,
    alignSelf:"center",
    marginTop:"10%"
  },
  pill:{
    flex:1,
    height:35,
    borderRadius:40,
    alignItems:"center",
    justifyContent:"center",
    margin:"1%",
    marginTop:"5%",
    paddingHorizontal:10
  
  },
  addHomeButton:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50,
    backgroundColor:"#34D1B6",
    height:50,
    paddingVertical:10,paddingHorizontal:30,
    alignSelf:"center",
    marginTop:"20%"
  },
  input: {
    borderRadius: 5,
    backgroundColor:"white",
    height:50,
    justifyContent:"center",
    marginHorizontal:16,
   
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: "75%",
  },
});
