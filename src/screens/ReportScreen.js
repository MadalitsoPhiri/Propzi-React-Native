import React,{useContext,useEffect,useState} from "react";
import {View,Text,StyleSheet, SafeAreaView, ScrollView,FlatList} from "react-native";
import EconomicIndicatorCard from "./EconomicIndicatorCard"
import { PropertyDataContext } from "../components/providers/PropertyDataProvider";
import { CommunityDataContext } from "../components/providers/CommunityDataProvider";
import { RecentSalesContext } from "../components/providers/RecentSaleProvider";
import RecentSalesCard from "./RecentSalesCard"
import Loader from "../components/Loader";
import { dbh } from "../../firebase/index"
import axios from "axios"
import CommunityDevelopmentCard from "./CommunityDevelopmentCard"
import InvestmentProjectsCard from "./InvestmentProjectsCard"
import {Provider,useSelector,useDispatch} from "react-redux";


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

export default ReportScreen = ()=>{
    const {user} = useSelector((state)=>state.auth)
    const {EconomicIndicators,investmentProjects} = useContext(PropertyDataContext);
    const { recentSales } = useContext(RecentSalesContext);
    const { communityData } = useContext(CommunityDataContext);




    return <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <View style={styles.blockContainer}>
                <Text style={styles.heading}>Report</Text>
            </View>

            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Recent sales</Text>
            </View>
           
            <FlatList
                style={styles.categoryScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentSales}
                    keyExtractor={(item) => item.mlsNumber}
                    renderItem={({ item, index }) => {
                      return <RecentSalesCard data={item}/>}}/>


            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Economic Indicators</Text>
            </View>
        

            <FlatList
                style={styles.categoryScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={EconomicIndicators}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return <EconomicIndicatorCard data={item}/>}}/>
          

            <View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Community Developments</Text>
            </View>
           

            <FlatList
                style={styles.categoryScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={communityData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return <CommunityDevelopmentCard data={item}/>}}/>


<View style={styles.blockContainer}>
                <Text style={styles.subHeading}>Investment Projects</Text>
            </View>
           

            <FlatList
                style={styles.categoryScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={investmentProjects}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return <InvestmentProjectsCard data={item}/>}}/>
     
          </ScrollView>
    </ SafeAreaView>
}
