import React,{ useContext } from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,Animated} from "react-native";
import { Ionicons,AntDesign} from '@expo/vector-icons';

import { PropertyDataContext } from "../components/providers/PropertyDataProvider";


const {width,height} = Dimensions.get("screen")
const CaroselData = [1,2,3]



export default function HomeCard({ data, to }) {
  const { isPropertyDataLoaded, property } = useContext(PropertyDataContext);
  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)
return (<View style={{width,height:height/2.5}}>


<ScrollView horizontal pagingEnabled contentContainerStyle={{marginBottom:20}} onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                    )} showsHorizontalScrollIndicator={false}>
      <View style={styles.carouselItem}>
      <View style={styles.cardHeader}>
        <AntDesign name="home" size={100} color={"#46D0B6"}/>
        <Text style={styles.propziPrice}>
          {data.propziPrice != "" ? (
            <Text>{data.propziPrice}</Text>
          ) : (
            <Text>Calculating</Text>
          )}
        </Text>
        <Text>Propzi Price</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text>Propzi Visit</Text>
          <Text>12/01/21</Text>
        </View>
        <View>
          <Text>CMA Price</Text>
          <Text>
            {data.cmaPrice != "" ? (
              <Text>{data.cmaPrice}</Text>
            ) : (
              <Text>Calculating</Text>
            )}
          </Text>
        </View>
      </View>
      </View>
      <View style={styles.carouselItem}></View>
      <View style={styles.carouselItem}></View>
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
