import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated,Pressable} from "react-native";
import { Ionicons,AntDesign,Feather,Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { PropertyDataContext } from "../providers/PropertyDataProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch} from "react-redux";
import {setDefaultProperty,setCurrentHomeCardIndex} from "../../state/PropertySlice"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const {width,height} = Dimensions.get("screen")
const skeletonCardHeight = height * 0.35




export default function HomeCard({ navigation }) {
  const {all,loading,error,defaultHome} = useSelector(state=>state.property.Properties)
  const dispatch = useDispatch()


 
  let CaroselData = []
  if(all.length > 5){
    CaroselData = all.slice(0,5)
  }else{
    CaroselData = [1,...all]
  }
  
  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)
  // React.useEffect(()=>{
  //   setFocusedProperty(properties[position.__getValue()])
  //   console.log("The Animated Value is: ",properties[position.__getValue()])
  // },[position])


  function handleOnScroll(e){
    scrollX.Value = e.nativeEvent.contentOffset.x
    //calculate screenIndex by contentOffset and screen width
    console.log('currentScreenIndex', parseInt(e.nativeEvent.contentOffset.x/Dimensions.get('window').width));
    let limit = all.length - 1
    let currentIndex = parseInt(e.nativeEvent.contentOffset.x/Dimensions.get('window').width)
    if(currentIndex <= limit ){
      dispatch(setCurrentHomeCardIndex(currentIndex))
    }
 }

return (all.length > 0 ?<View style={{width,marginTop:15,marginBottom:30}}>


<ScrollView horizontal pagingEnabled contentContainerStyle={{}} 
onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX} } }],{
        listener: event => {
          handleOnScroll(event);
        },
        useNativeDriver:false
      },
      )} scrollEventThrottle={20} showsHorizontalScrollIndicator={false}>
                      {all.map((data,index)=>{
                       
                        if(index>3){
                         return
                        }
              
                        return <View style={styles.carouselItem} key={index}>
                          <View style={{flexDirection:"row",justifyContent:"flex-end",marginVertical:10}}>
                            {/* <View  style={[{paddingHorizontal:15,paddingVertical:5,borderColor:"gray",borderWidth:2,borderRadius:30,zIndex:1}]}>
                            <Text style={{fontFamily:"Poppins-Bold",fontSize:10,color:"gray"}}>{data.repliers.address.unitNumber == "" ? `${data.streetNumber} ${data.streetName}`:`${data.repliers.address.unitNumber}, ${data.streetNumber} ${data.streetName}`}</Text>
                            </View> */}
                         
                           {data.identity == defaultHome.id ? <View style={{paddingHorizontal:10,paddingVertical:5,borderColor:"gray",borderWidth:2,borderRadius:30,zIndex:1,left:"3%"}}><Text style={{fontFamily:"Poppins-Bold",fontSize:10,color:"black",color:"gray"}}>default</Text></View>:<Pressable onPress={()=>dispatch(setDefaultProperty(data))} style={{paddingHorizontal:10,paddingVertical:5,borderColor:"gray",borderWidth:2,borderRadius:30,zIndex:1,right:"3%"}}><Text style={{fontFamily:"Poppins-Bold",fontSize:10,color:"black",color:"gray"}}>pin to default</Text></Pressable>}
                           </View>
                        
                        <View style={styles.cardHeader}>
                         
                          <AntDesign name="home" size={width/3.8} color={"#46D0B6"}/>
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
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Last Sold Date</Text>
                            <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>{new Date(data.repliers.soldDate).toLocaleDateString("en-US")}</Text>
                          </View>
                          <View>
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Last Sold Price</Text>
                            <Text>
                              {console.log("last:",data.repliers.soldPrice)}
                              {data.repliers.soldPrice == null || data.repliers.soldPrice == "0.00" || data.repliers.soldPrice == "" ? (
                                 <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>Not Available</Text>
                               
                              ) : (
                                <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>{'$'+ Math.round(data.repliers.soldPrice).toLocaleString()}</Text>
                              )}
                            </Text>
                          </View>
                        </View>
                        </View>
                      })}
     
      <TouchableOpacity onPress={()=>{
         navigation.navigate("condoSearch")
      }}>
      <View style={[styles.carouselItemCustom,{alignItems:"center",}]}>
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
                                style={{ opacity, height: 5, width: 7, backgroundColor: '#595959', margin: 8, borderRadius: 5}}
                            />
                        )
                    })}

                </View>
</View>:<SkeletonPlaceholder>
        <View style={[styles.carouselItem,{height:skeletonCardHeight}]}>
          <View style={{flex:1,width:"100%",height:"100%"}}/>
        </View>
        </SkeletonPlaceholder>)
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
     shadowOffset:{width:5,height:5},
     shadowOpacity:0.08,
     shadowRadius:8,
     justifyContent:"center",
     padding:16,
     borderWidth:1,
     borderColor: 'rgba(158, 150, 158, .5)',
     elevation:8

     
 
  },

  carouselItemCustom:{
    width:width - 32,
    margin:16,
    backgroundColor:"white",
    borderRadius:10,
    alignSelf:"center",
    shadowColor:"#000",
    shadowOffset:{width:5,height:10},
    shadowOpacity:0.08,
    shadowRadius:12,
    justifyContent:"center",
    padding:16,
    minHeight:height/2.9,
    borderWidth:1,
    borderColor: 'rgba(158, 150, 158, .5)',
    elevation:8

    

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