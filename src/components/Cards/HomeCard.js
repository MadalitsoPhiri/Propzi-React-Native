import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated,Pressable} from "react-native";
import { Ionicons,AntDesign,Feather,Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { PropertyDataContext } from "../providers/PropertyDataProvider";



const {width,height} = Dimensions.get("screen")




export default function HomeCard({ properties, to, navigation }) {
  const {defaultHome, setdefaultHome } = useContext(PropertyDataContext);
  let CaroselData = []
  if(properties.length > 5){
    CaroselData = properties.slice(0,5)
  }else{
    CaroselData = [1,...properties]
  }
  
  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)
return (<View style={{width,height:height/2.5,marginTop:15,marginBottom:20}}>


<ScrollView horizontal pagingEnabled contentContainerStyle={{marginBottom:20}} onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                    )} showsHorizontalScrollIndicator={false}>
                      {properties.map((data,index)=>{
                       
                        if(index>3){
                         return
                        }
              
                        return  <View style={styles.carouselItem} key={index}>
                          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <View  style={[{paddingHorizontal:15,paddingVertical:5,borderColor:"gray",borderWidth:2,borderRadius:30,zIndex:1}]}>
                            <Text style={{fontFamily:"Poppins-Bold",fontSize:10,color:"gray"}}>{data.repliers.address.unitNumber == "" ? `${data.streetNumber} ${data.streetName}`:`${data.repliers.address.unitNumber}, ${data.streetNumber} ${data.streetName}`}</Text>
                            </View>
                         
                           {data.isDefault ? <Pressable style={{paddingHorizontal:10,paddingVertical:5,borderColor:"gray",borderWidth:2,borderRadius:30,zIndex:1,right:"3%"}}><Text style={{fontFamily:"Poppins-Bold",fontSize:10,color:"black",color:"gray"}}>Default</Text></Pressable>:null}
                           </View>
                        
                        <View style={styles.cardHeader}>
                         
                          <AntDesign name="home" size={100} color={"#46D0B6"}/>
                          <Text style={styles.propziPrice}>
                            {data.cmaPrice != "" ? (
                              <Text style={{ fontFamily:"Poppins-Bold"}}>{data.cmaPrice}</Text>
                            ) : (
                              <Text style={{ fontFamily:"Poppins-Medium",color:"gray"}}>Calculating</Text>
                            )}
                          </Text>
                          <Text style={{ fontFamily:"Poppins-Medium",}}>Propzi Price</Text>
                        </View>
                  
                        <View style={styles.cardFooter}>
                          <View>
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Propzi Visit</Text>
                            <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>Not Available</Text>
                          </View>
                          <View>
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Last Sold Price</Text>
                            <Text>
                              {console.log("last:",data.repliers.soldPrice)}
                              {data.repliers.soldPrice != null ? (
                                <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>{'$'+ Math.round(data.repliers.soldPrice).toLocaleString()}</Text>
                              ) : (
                                <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>Not Available</Text>
                              )}
                            </Text>
                          </View>
                        </View>
                        </View>
                      })}
     
      <TouchableOpacity onPress={()=>{
         navigation.navigate("propertyType")
      }}>
      <View style={[styles.carouselItem,{alignItems:"center",}]}>
      <View style={{marginBottom:10}}><Feather name="plus-circle" size={50} color="gray" /></View>
        <Text style={{fontFamily:"Poppins-Medium",fontSize:17}}>Add Another Property</Text>
      </View>
      </TouchableOpacity>
   
  </ScrollView>
 <View style={styles.dotView}>
                    {CaroselData.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 5, width: 7, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

                </View>
</View>)
}


const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center' },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  carouselItem:{
     width:width - 32,
     margin:16,
     backgroundColor:"white",
     borderRadius:10,
     alignSelf:"center",
     shadowColor:"#000",
     shadowOffset:{width:5,height:10},
     shadowOpacity:0.08,
     shadowRadius:12,
     height:height / 3,
     justifyContent:"center",
     padding:16,
     borderWidth:1,
     borderColor: 'rgba(158, 150, 158, .5)'

     
 
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