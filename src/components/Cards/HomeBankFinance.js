import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated,Pressable, FlatList} from "react-native";
import { Ionicons,AntDesign,Feather,Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { PropertyDataContext } from "../providers/PropertyDataProvider"
import FinanceIcon from "../../../assets/FinanceHome.svg";
import { colors } from "../../styles";
import { Divider} from 'react-native-paper';
import { color } from "react-native-reanimated";



const {width,height} = Dimensions.get("screen")
const cardIconHeight = height * 0.1
const cardIconWidth = width * 0.3



export default function HomeFinanceOffersCard() {
  const {defaultHome, setdefaultHome } = useContext(PropertyDataContext);
  let CaroselData = [1,2,3]
  let banks = [{bank:"ScotiaBank",term:"5 year Fixed",specialRate:"2.4%",APR:"2.6%"},{bank:"BMO",term:"5 year Fixed",specialRate:"2.4%",APR:"2.6%"},{bank:"CIBC",term:"5 year Fixed",specialRate:"2.4%",APR:"2.6%"}]
  const [selectedTab,setSelectedTab] = React.useState(0)
  const TabBarRef = React.createRef()
  const CardRef = React.createRef()
  const viewabilityConfig = React.useRef({
    waitForInteraction: true,
    // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
    viewAreaCoveragePercentThreshold: 95,
   
  })
  
  const onViewRef = React.useRef(({viewableItems,changed})=>{
    console.log(changed)
    setSelectedTab(changed[0].index)
  
  })
  
  // if(properties.length > 5){
  //   CaroselData = properties.slice(0,5)
  // }else{
  //   CaroselData = [1,...properties]
  // }
  
  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)
return (<View style={{width,marginTop:15,marginBottom:30}}>

<FlatList
ref={TabBarRef}
data={banks}
keyExtractor={(item,index)=>`${item}-${index}`}
style={{flexGrow:0}}
contentContainerStyle={{padding:16}}
renderItem={({item,index})=>{
  return <TouchableOpacity onPress={()=> {
    setSelectedTab(index)
    CardRef.current.scrollToIndex({animated:true,index:index})
    }}>
  <View style={[styles.pill,{backgroundColor:selectedTab == index ? colors.PRIMARY_COLOR : "transparent"}]}>
    <Text style={[styles.pillText,{color:selectedTab == index ? "white" : "black"}]}>{item.bank}</Text>
  </View> 
  </TouchableOpacity>
}}
horizontal
showsHorizontalScrollIndicator={false}
/>
<FlatList
ref={CardRef}
data={banks}
keyExtractor={(item,index)=>`${item}-${index}`}
style={{flexGrow:0}}
horizontal 
pagingEnabled 
viewabilityConfig={viewabilityConfig.current}
onViewableItemsChanged={onViewRef.current}
contentContainerStyle={{marginBottom:20}}
showsHorizontalScrollIndicator={false}
renderItem={({item,index})=>{
                       
return  <View style={styles.carouselItem}>
                          
                        
                          
        <View style={[styles.cardHeader]}>
          <AntDesign
            name="warning"
            size={20}
            color="grey"
          />
          <Text style={styles.headerText}>Your approval odds are fair</Text>
       

        <AntDesign name="exclamationcircleo" size={20} color="grey" />
      
        </View>
        <Divider style={styles.divider}/>
        <View style={styles.cardBody}>
          <Text style={styles.title}>
            {`${item.bank} Special Mortgage Rates`}</Text>
          <View style={styles.cardContent}>
          <View>
            <Text style={styles.termText}>{`Term: ${item.term}`}</Text>
            <Text style={styles.termText}>{`Special Rate: ${item.specialRate}`}</Text>
            <Text style={styles.termText}>{`APR: ${item.APR}`}</Text>
          </View>
          {/* <View style={[styles.offersImage,{backgroundColor:"gray",width:"20%",height:"100%"}]}/> */}
          <FinanceIcon width={cardIconWidth} height={cardIconHeight}/>
          </View>
        </View>
        {/* <View style={styles.cardBody}>
        <View style={styles.cardBodyLeft}>
          <Text style={styles.cardBodyLeftTitle}>Special Mortgage Rates</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term: 5 Year Fixed</Text>
            <Text>Special Rate: 2.4%</Text>
            <Text>APR: 2.6%</Text>
          </View>
        </View>
        <View style={styles.cardBodyRight}>
          <FinanceIcon />
        </View>
      </View> */}
                        <View style={styles.cardFooter}>
                         
                          <TouchableOpacity style={styles.financeApplyButton}>
                            <Text style={styles.financeApplyText}>Apply Now</Text>
                          </TouchableOpacity>
                      
                          <TouchableOpacity>
                            <Text style={styles.financeLinkText}>See details, rates and fees</Text>
                          </TouchableOpacity>
                        </View>
                        </View>
                      }}/>
     

   
 {/* <View style={styles.dotView}>
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

                </View> */}
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
     justifyContent:"center",
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
    minHeight:height/2.78,
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
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:12,
    paddingHorizontal:16
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
    padding:16,
    alignItems:"center",
    justifyContent:"center"
  },
  divider:{
    color:"black",
    height:2
  },
  headerText:{
    fontFamily:"Poppins-Medium",
    fontSize:12
  },
  cardBody:{
    paddingHorizontal:16,
    paddingVertical:10
  },
  title:{
  fontSize:15,
  fontFamily:"Poppins-Medium",
  textAlign:"center",
  marginBottom:"5%"
  },
  cardContent:{
    alignItems:"center",
    justifyContent:"space-evenly",
    flexDirection:"row"
  },
  termText:{
    fontFamily:"Poppins-Regular",
    fontSize:13
  },
  financeApplyButton:{
   borderRadius:30,
   backgroundColor:colors.PRIMARY_COLOR,
   justifyContent:"center",
   alignItems:"center",
   paddingVertical:"3%",
   paddingHorizontal:"15%"
  },
  financeApplyText:{
    fontSize:15,
    fontFamily:"Poppins-Bold",
    color:"white"
  },
  financeLinkText:{
    marginTop:"5%",
    fontSize:14,
    fontFamily:"Poppins-Regular",
    color:colors.PRIMARY_COLOR
  },
  pill:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center"

  },
  pillText:{
   fontSize:15,
   fontFamily:"Poppins-Medium",
  }
});





