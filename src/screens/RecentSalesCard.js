import React,{useContext,useEffect,useState} from "react";
import {View,Text,StyleSheet, SafeAreaView, ScrollView,Dimensions,Image} from "react-native";
import {AntDesign,Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';

const {width,height} = Dimensions.get("window");
const CARD_HEIGHT = height * 0.4
const CARD_WIDTH = width * 0.6
const IMAGE_WIDTH = CARD_WIDTH - 1 // subtracting 1 becuase of the border width
const IMAGE_HEIGHT = "100%"
const imgUrl = "https://qph.fs.quoracdn.net/main-qimg-fea3205ddaf22e96874d3bad78c85cbe"
const address = "90 Stadium, Unit 313"
const neighbourhoodCity = "Niagara Torronto"
const numBedrooms = "3"
const numBathrooms = "3"
const sqft = "500"
const soldDate = "5/31/2021"
const soldPrice = "$516,500"
const cardIconSize = CARD_WIDTH  * 0.12

const testingData = {

}

const styles = StyleSheet.create({
        container:{
            backgroundColor:"white",
            borderRadius:17,
            shadowColor:"#000",
            shadowOffset:{width:5,height:10},
            shadowOpacity:0.08,
            shadowRadius:16,
            borderWidth:1,
            borderColor: 'rgba(158, 150, 158, .5)',
            width:CARD_WIDTH,
            height:CARD_HEIGHT,
            margin:12
        
        },
        cardBody:{
           flex:4 ,
           backgroundColor:"cyan",
           borderTopRightRadius: 17,
           borderTopLeftRadius: 17,
        },
        cardFooter:{
         flex:0.8,
         backgroundColor:"white",
         borderBottomRightRadius: 17,
         borderBottomLeftRadius: 17,
         justifyContent:"center",
         alignItems:"flex-start",
         paddingHorizontal:16
        },
        cardMiddle:{
           flex:1,
           backgroundColor:"white",
           paddingTop:10,
           paddingHorizontal:15, 
          
        },
        imageContainer:{
            flex:1,
            backgroundColor:"red",
            borderTopRightRadius: 17,
            borderTopLeftRadius: 17,
            flexDirection:"row",
            justifyContent:"flex-end"
        },
        image:{
            resizeMode: "cover",
            borderTopRightRadius: 17,
            borderTopLeftRadius: 17,
        },
        categoryBadge:{
            borderRadius:17,
            maxWidth:CARD_WIDTH  *0.5,
            paddingHorizontal:10,
            paddingVertical:5,
            marginRight:"7%",
            marginTop:"7%",
            backgroundColor:'rgba(0,0,0, .6)',
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"flex-start",
           
        },
        categoryBadgeText:{
            color:"white",
            fontSize:12
        },
        titleText:{
            color:"black",
            fontFamily:"Poppins-Medium"
        },
        sourceText:{
            color:"gray",
            fontSize:12,
            fontFamily:"Poppins-Regular",
            marginTop:"2%"
        },
        descriptionText:{
            color:"black",
            fontSize:10,
            fontFamily:"Poppins-Medium",
            marginTop:"2%"
        },
        infoContainer:{
            justifyContent:"space-evenly",
            flexDirection:"row",
            alignItems:"center",
            marginTop:"10%"
        },
        infoText:{
            fontFamily:"Poppins-Medium",
            fontSize:12,
            color:"gray"
        }

       
    })

export default RecentSalesCard = ()=>{
    return <View style={styles.container}>
         <View style={styles.cardBody}>
                  <View style={styles.imageContainer}>
                  <Image source={{ uri: imgUrl }}style={[StyleSheet.absoluteFill,styles.image]} />
                 
                  </View>
                  <View style={styles.cardMiddle}> 
                  <Text style={styles.titleText}>{address}</Text>
                  <Text style={styles.sourceText}>{neighbourhoodCity}</Text>
                  <View style={styles.infoContainer}>
                      <View>
                      <Ionicons name="md-bed" size={cardIconSize} color="black" style={{alignSelf:"center",marginBottom:"10%"}} />
                      <Text style={styles.infoText}>{`${numBedrooms} Beds`}</Text>
                      </View>

                      <View>
                      <FontAwesome name="bathtub" size={cardIconSize} color="black" style={{alignSelf:"center",marginBottom:"10%"}}/>
                      <Text style={styles.infoText}>{`${numBathrooms} Baths`}</Text>
                      </View>


                      <View>
                      <MaterialIcons  name="square-foot" color="black" size={cardIconSize} style={{alignSelf:"center",marginBottom:"10%"}}/>
                      <Text style={styles.infoText}>{`${sqft} sqft`}</Text>
                      </View>

                  </View>
                  </View>

         </View>
         <View style={styles.cardFooter}>
            {/* Here is where the like feature will live */}
            <AntDesign name="hearto" size={24} color="black" />
         </View>
    
             
    </View>
}
