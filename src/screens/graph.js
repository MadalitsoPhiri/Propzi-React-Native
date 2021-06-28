import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,Dimensions,ScrollView,TextInput} from 'react-native';
import  {Svg,Path,LinearGradient,Stop,Defs} from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler,useAnimatedStyle,useSharedValue, withTiming,useDerivedValue,interpolate} from "react-native-reanimated";
import {getYForX, interpolatePath, parse,ReText,round} from "react-native-redash";
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
// import  * as path from "svg-path-properties";
import {scaleTime,scaleLinear} from 'd3-scale';


const d3 = {
  scale,
  shape,
};


let {width,height} = Dimensions.get("window");


function simplify(value)
{
    if(value>=1000000)
    {
        value=(value/1000000)+"M"
    }
    else if(value>=1000)
    {
        value=(value/1000)+"K";
    }
    return value;
}


 height = height  *  0.25;
 const SideBarWidth = 80;
const cursorRadius = 5;
const graphRightLimit = width - 20
const graphLeftLimit = SideBarWidth - 15
const verticalPadding = 10;
const labelWidth = 100;






// const lineLength = properties.getTotalLength();



export default function Graph(props) {
  const {data,data2} = props.graphData;
  //These are the highest and lowest values for the graph
const max1 = Math.max(...data.map(item=>item.y))
const min1 = Math.min(...data.map(item=>item.y))
const min2 = Math.min(...data2.map(item=>item.y))
const max2 = Math.max(...data2.map(item=>item.y))

function ScaledYValues (){
  const range1 = max1 - min1
  const range2 = max2 - min2
  const MaxMin = [max1,max2,min2,min1]
  // const max = Math.max(...MaxMin.map(item=>item.y))
  const min = Math.min(MaxMin)
  const interval = data.length - 1
  let previousValue;
 
  if(range1 > range2){
    console.log("using range1")
    console.log("min:",min1)
    const intervalValue = range1/interval
    console.log(intervalValue)
    const final = []
  //use range1 
   data.forEach(()=>{
     console.log(previousValue)
         if(previousValue == null){
           previousValue = min1
           final.push(simplify(previousValue))
         }else{
          previousValue =  previousValue + intervalValue
          final.push(simplify(previousValue))
         
         }
         
   })
   console.log(final)
    return final 
  }else{
    console.log("using range1")
    console.log("min:",min2)
    //use range2

    const intervalValue = range2/interval
    const final = []
  //use range1 
   data2.forEach(()=>{
         if(previousValue == null){
          previousValue = min2
           final.push(simplify(previousValue))
         }else{
          final.push(simplify(previousValue))
          previousValue =  previousValue + intervalValue
         }
        
   })
    return final 
  }
}

const scaleX = scaleTime().domain([data[0].x,data[data.length-1].x]).range([graphLeftLimit,graphRightLimit]);
const scaleY = scaleLinear().domain([data[0].y,data[data.length-1].y]).range([height - verticalPadding,verticalPadding]);
const scaleX2 = scaleTime().domain([data2[0].x,data2[data2.length-1].x]).range([graphLeftLimit,graphRightLimit]);
const scaleY2 = scaleLinear().domain([data2[0].y,data2[data2.length-1].y]).range([height - verticalPadding,verticalPadding]);
const yScale = ScaledYValues().reverse()
const line = d3.shape.line()
.x(d => scaleX(d.x))
.y(d => scaleY(d.y))
.curve(d3.shape.curveBasis)
(data)


const line2 = d3.shape.line()
.x(d => scaleX2(d.x))
.y(d => scaleY2(d.y))
.curve(d3.shape.curveBasis)
(data2)

const graphPath = parse(line)
const graphPath2 = parse(line2)



  // const scaleLabel = scale.scaleQuantile().domain([data[0].y,data[data.length -1].y]).range(data.map((item,index)=>{return data[index].y}))
  const active = useSharedValue(false);
  const x = useSharedValue(graphRightLimit);
  const y = useSharedValue(getYForX(graphPath,x.value));
  const x2 = useSharedValue(graphRightLimit);
  const y2 = useSharedValue(getYForX(graphPath,x2.value));
 
  
  const onGestureEvent = useAnimatedGestureHandler({
 onStart:()=>{
   active.value = true;

 },
 onActive:(event,ctx)=>{
   
   
  
    if(event.x < graphLeftLimit || event.x > graphRightLimit ){
     console.log("out of bounds")
    }else{
      x.value = event.x
      x2.value = event.x
      y.value = getYForX(graphPath,x.value);
      y2.value = getYForX(graphPath2,x2.value);
    }
    // console.log(x.value)
    // console.log(event.x)
  
   
 },
 onEnd:() =>{
   active.value = false;
 }
  })
  const style = useAnimatedStyle(()=>{
    const translateX = x.value - cursorRadius;
    const translateY = y.value - cursorRadius;

   
    return {
      // opacity:withTiming(active.value ? 1 : 0),
      transform:[{translateX},{translateY :translateY}]
    }
    
  })


  const style2 = useAnimatedStyle(()=>{
    const translateX = x2.value - cursorRadius;
    const translateY = y2.value - cursorRadius;
   
    return {
      // opacity:withTiming(active.value ? 1 : 0),
      transform:[{translateX},{translateY :translateY}]
    }
    
  })

  const style3 = useAnimatedStyle(()=>{

   
    return {
      fontSize:18,
      fontWeight:"600",
      textAlign:"center"
    }
    
  })

  const AverageSoldPrice = useDerivedValue(()=>{
    return `$ ${round(interpolate(y.value,[height - verticalPadding,verticalPadding],[min1,max1])).toLocaleString("en-US",{currency:"USD"})}`
  });
  const PossibleSellingPrice = useDerivedValue(()=>{
    return `$ ${round(interpolate(y2.value,[height - verticalPadding,verticalPadding],[min2,max2])).toLocaleString("en-US",{currency:"USD"})}`
  });
  // const AveragePrice = `$ ${AverageSoldPrice}`
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topBar}>
        <View style={{marginHorizontal:10,alignItems:"center"}}> 
        <Text  style={[styles.TopBarPriceTitle,{fontFamily:"Poppins-Bold",fontSize:13}]}>Propzi Price</Text>
        <ReText style={[style3,{fontFamily:"Poppins-Bold",color:"gray",fontSize:12}]} text={AverageSoldPrice}/>
        </View>
        <View style={{marginHorizontal:10,alignItems:"center"}}>
          <Text style={[styles.TopBarPriceTitle,{fontFamily:"Poppins-Bold",fontSize:13}]}>Average Sold Price</Text>
          <ReText style={[style3,{fontFamily:"Poppins-Bold",color:"gray",fontSize:12}]} text={PossibleSellingPrice}/>
          </View>
        
      </View>
      <View style={styles.container}>
        
        {/* <View style={styles.sideBar}>
          {data.map((item,index)=>{
            return <Text style={styles.Yvalues}>{`${item.y} k`}</Text>
          })}
          
        </View> */}
        <View style={[{zIndex:-1,justifyContent:"space-between",height}]}>
          {yScale.map((item,idex)=>{
            return (<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
              <Text style={[styles.Yvalues,{paddingHorizontal:16,fontFamily:"Poppins-Bold"}]}>{item}</Text>
              <View style={{borderWidth:0.5,borderColor:"transparent",width:"100%",opacity:0.6,justifyContent:"center"}}>
                <View style={{borderWidth:0.5,borderColor:"gray",width:"100%",opacity:0.3}}></View>
              </View>
             
              
              </View>)
          })}
          
          
        </View>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>

       
       <Svg {...{width:width, height}}>
       <Defs>
       <LinearGradient id="primary" x1="320.5" y1="0" x2="320.5" y2="391" gradientUnits="userSpaceOnUse">
<Stop stopColor="#34D0B8" stopOpacity="0.18"/>
<Stop offset="0.410185" stopColor="#8BC9BF" stopOpacity="0.0717617"/>
<Stop offset="1" stopColor="#C4C4C4" stopOpacity="0"/>
<Stop offset="1" stopColor="#81CABE" stopOpacity="0.175708"/>
</LinearGradient>

<LinearGradient id="secondary" x1="320.5" y1="0" x2="320.5" y2="391" gradientUnits="userSpaceOnUse">
<Stop stopColor="#7D7F82" stopOpacity="0.18"/>
<Stop offset="0.410185" stopColor="#969899" stopOpacity="0.0717617"/>
<Stop offset="1" stopColor="#C4C4C4" stopOpacity="0"/>
<Stop offset="1" stopColor="#81CABE" stopOpacity="0.175708"/>
</LinearGradient>



</Defs>
         <Path d={line} stroke="#34D0B8" strokeWidth="2"/>
         <Path d={`${line} L ${graphRightLimit } 0  L ${graphRightLimit } ${height} L ${graphLeftLimit} ${height}`} fill="url(#primary)"/>

         <Path d={line2} stroke="gray" strokeWidth="2"/>
         <Path d={`${line2} L ${graphRightLimit } 0  L ${graphRightLimit } ${height} L ${graphLeftLimit} ${height}`} fill="url(#secondary)"/>
      
       <Animated.View  style={[styles.cursor,style]}/>
       <Animated.View  style={[styles.cursor2,style2]}/>
     
       </Svg>
      
      
       {/* <Animated.View  style={[styles.label]}>
         <TextInput  disabled={true} style={{color:"black"}}/>
       </Animated.View> */}
       </Animated.View>
       </PanGestureHandler>
      
      
       
      </View>
      <View style={{justifyContent:"space-between",width,flexDirection:"row",paddingLeft:graphLeftLimit,marginTop:20,paddingRight:20}}>
        {data.map((item,index)=>{
          return <Text style={{fontFamily:"Poppins-Bold",fontSize:12,color:"gray"}}>{item.x.toLocaleString('default', { month: 'short' })}</Text>
        })}
    
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 root:{
   flex:1,
  
 },
 container:{
 flexDirection:"row",
 height,
 width:"100%",
 marginTop:"5%",
 },
 cursor:{
   width:cursorRadius  *  2,
   height:cursorRadius  *  2,
   borderRadius:cursorRadius,
   borderWidth:3,
   borderColor:"#34D0B8",
   backgroundColor:"white",
 },

 cursor2:{
  width:cursorRadius  *  2,
  height:cursorRadius  *  2,
  borderRadius:cursorRadius,
  borderWidth:3,
  borderColor:"gray",
  backgroundColor:"white",
  position:"absolute"
},
 label:{
   shadowColor:"#000",
    shadowOffset:{width:5,height:10},
    shadowOpacity:0.08,
    shadowRadius:12,
    width:labelWidth,
    position:"absolute",
    top:-45,
    left:0,
    padding:10,
    borderRadius:12,
    position:"absolute"

    
    
 },
 sideBar:{
 paddingHorizontal:16,
 height,
 justifyContent:"space-between"

 },
 Yvalues:{
   fontSize:12,
   fontWeight:"600",
   color:"gray"
   
 },
 topBar:{
   flexDirection:"row",
   width,
   justifyContent:"center",
   alignItems:"center",
   marginTop:16
 },
 TopBarPrice:{
   fontSize:18,
   fontWeight:"600",
   textAlign:"center"
 },
 TopBarPriceTitle:{
  marginBottom:5,
  textAlign:"center"
 }
});
