import React,{useContext,useEffect,useState} from "react";
import {View,Text,StyleSheet, SafeAreaView, ScrollView} from "react-native";
import EconomicIndicatorCard from "./EconomicIndicatorCard"
import RecentSalesCard from "./RecentSalesCard"

const dummyData = [1,2,3,4,5,6,7,8,9,10]
const styles = StyleSheet.create({
mainContainer:{
    flex:1,
    backgroundColor:"white"
},
heading:{
    fontSize: 35, fontFamily:"Poppins-Bold",
    marginBottom:"5%"
},

subHeading:{
    fontSize: 23, fontFamily:"Poppins-Bold"
},
blockContainer:{
    paddingHorizontal:16,
    paddingVertical:16
},
categoryScrollView:{
    paddingHorizontal:16,
    paddingBottom:30,
  
}

    })

export default ReportScreenLatest = ()=>{
    return <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <View style={styles.blockContainer}>
                <Text style={styles.heading}>Report</Text>
            </View>

            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Recent sales</Text>
            </View>
            <ScrollView horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
                {dummyData.map((item,index)=>{
                return <RecentSalesCard />
                })}
            </ScrollView>


            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Economic Indicators</Text>
            </View>
            <ScrollView horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
                {dummyData.map((item,index)=>{
                return <EconomicIndicatorCard />
                })}
            </ScrollView>
          

            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Community Developments</Text>
            </View>
            <ScrollView horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
                {dummyData.map((item,index)=>{
                return <EconomicIndicatorCard />
                })}
            </ScrollView>
         
     
          </ScrollView>
    </ SafeAreaView>
}
