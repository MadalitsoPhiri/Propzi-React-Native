import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated,Pressable, FlatList} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PropertyDataContext } from "../components/providers/PropertyDataProvider"
import FinanceIcon from "../../assets/FinanceHome.svg";
import { colors } from "../styles";
import { Divider} from 'react-native-paper';
import { color } from "react-native-reanimated";
import { Entypo,MaterialIcons } from "@expo/vector-icons";



const {width,height} = Dimensions.get("screen")
const cardIconHeight = height * 0.1
const cardIconWidth = width * 0.39
const offerData = [{},{},{}]




export default function OffersScreen() {
 return (<View style={{flex:1,backgroundColor:"white"}}>
   <ScrollView>
   <Text style={styles.Heading}>Offers</Text>
   <View style={styles.offerCard}>
     <Text style={styles.offerHeading}>TD Special Mortgage Rates</Text>
     <Text style={styles.offerDetail}>With an online Mortgage pre-approval,you're ready to let the house hunting begin.</Text>
     <View style={styles.termSection}>
     <View style={styles.term}>
            <Text style={styles.termText}>{`Term: 5 Years Fixed`}</Text>
            <Text style={styles.termText}>{`Special Rate: 2.14%`}</Text>
            <Text style={styles.termText}>{`APR: 2.16%`}</Text>
     </View>
       <FinanceIcon height={cardIconHeight} width={cardIconWidth}/>
     </View>
     <View style={styles.offersButtonContainer}>
     <TouchableOpacity style={styles.viewOfferButton}>
       <Text style={styles.offerButtonText}>View Offer</Text>
     </TouchableOpacity>
     </View>
     
   </View>

   <View style={styles.options}>
 {/* begin new option */}
 <TouchableOpacity
            style={styles.addressContainer}
          >
            <View style={styles.optionView}>
              <View style={[styles.optionChipView,{backgroundColor:"rgba(249, 180, 45,1)",}]}>
              <FinanceIcon style={styles.optionIcon} />
              </View>
              <Text style={styles.address}>Mortgages</Text>
              
            </View>
            <View style={{marginRight:"2%"}}>
              <MaterialIcons name="chevron-right" size={35} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addressContainer}
          >
            <View style={styles.optionView}>
              <View style={[styles.optionChipView,{backgroundColor:"rgba(137, 196, 244, 1)",}]}>
              <FinanceIcon style={styles.optionIcon} />
              </View>
              <Text style={styles.address}>HELOC and Loans</Text>
              
            </View>
            <View style={{marginRight:"2%"}}>
              <MaterialIcons name="chevron-right" size={35} color="black" />
            </View>
          </TouchableOpacity>
        
        {/* begin new option */}
          <TouchableOpacity
            style={styles.addressContainer}
          >
            <View style={styles.optionView}>
              <View style={[styles.optionChipView,{backgroundColor:'rgba(70, 208, 182, 0.6)'}]}>
              <FinanceIcon style={styles.optionIcon} />
              </View>
              <Text style={styles.address}>Home Insurance</Text>
              
            </View>
            <View style={{marginRight:"2%"}}>
              <MaterialIcons name="chevron-right" size={35} color="black" />
            </View>
          </TouchableOpacity>
   </View>
   </ScrollView>
 </View>)
}


const styles = StyleSheet.create({
  Heading:{
    fontSize:25,
    fontFamily:"Poppins-Bold",
    paddingHorizontal:20,
    marginTop:"5%"
  },
  offerHeading:{
    fontSize:16,
    fontFamily:"Poppins-Medium",
    marginBottom:"5%"
    
  },
  offerDetail:{
  fontFamily:"Poppins-Regular",
  fontSize:13,
  lineHeight:25
  },
  offerCard:{
  backgroundColor:'rgba(70, 208, 182, 0.6)',
  padding:20,
  margin:16,
  borderRadius:25,
  shadowColor: "#000",
  shadowOffset: { width: 5, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation:8
  },
  termSection:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  termText:{
    fontSize:13,
    fontFamily:"Poppins-Regular"
  },
  viewOfferButton:{
    borderRadius:20,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:"orange",
  },
  offersButtonContainer:{
    marginTop:"10%",
    alignSelf:"center",
  },
  offerButtonText:{
    fontSize:13,
    fontFamily:"Poppins-Bold",
    color:"black",
 
  },
  term:{
    marginTop:"5%"
  },
  addressContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    borderColor: "rgba(158, 150, 158, .5)",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  actualAddress: {
    fontWeight: "300",
    fontFamily: "Poppins-Medium",
    color: "gray",
  },
  options:{
    padding:16
  },
  optionChipView:{
  borderTopLeftRadius:10,
  borderBottomLeftRadius:10,
  marginRight:"5%"
},
  optionIcon:{
    width:"20%",
    height:"20%"
  },
  optionView:{
    flexDirection:"row",
    flex:1,
    alignItems:"center"
  }
});