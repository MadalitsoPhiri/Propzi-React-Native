import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated} from "react-native";


import SignupOptions from  "./SignupOptions";
  

const {width,height} = Dimensions.get("screen")
const CaroselData = [1,2,3]



export default function OffersScreen({ data, to }) {
  
return (<View style={{justifyContent:"center",alignItems:"center",flex:1}}>
  <Text>OffersScreen</Text>
</View>)
}


const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center' },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  carouselItem:{
     width:width - 32,
     margin:16,
     backgroundColor:"white",
     borderRadius:10,
     alignSelf:"center",
     shadowColor:"#000",
     shadowOffset:{width:0,height:10},
     shadowOpacity:0.05,
     shadowRadius:12,
     height:height / 3,
     justifyContent:"center",
     padding:16

     
 
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 60,
    padding: 20,
    shadowColor:"#333",
    shadowOffset:{width:1,height:1},
    backgroundColor:"white",
    shadowRadius:5,
    shadowOpacity:0.3,
    elevation:3,
    borderRadius:10,
  },

  cardHeader: {
    alignItems: "center",
  },

  homeImg: {
    marginBottom: 10,
    width: "100%",
    marginTop: 16,
  },

  propziPrice: {
    fontSize: 26,
    fontWeight: "bold",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },
});
