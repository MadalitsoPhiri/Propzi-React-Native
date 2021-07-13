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
import {getRecentSales} from "../state/PropertySlice"



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
    
    
    
    // const { recentSales } = useContext(RecentSalesContext);
    const RecentSales = ()=>{

    const dispatch = useDispatch()
    const recentSales = useSelector(state=>state.property.RecentSales.all)
    console.log(RecentSales)
    const {all,defaultHome} = useSelector(state=>state.property.Properties)
    
    const currentProperty = all.filter(item=>item.identity == defaultHome.id)[0]
    useEffect(()=>{
        dispatch(getRecentSales(currentProperty))
    },[defaultHome])
        return(recentSales.length > 0?
            <View>
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

             </View>:null         

        )
    }
    const CommunityDevelopments = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const { communityData } = useContext(CommunityDataContext);
        const renderData = communityData.filter(item=>item.city == defaultHome.city)          
        
        return (renderData.length > 0?<View>
        <View style={styles.blockContainer}>
           <Text style={styles.subHeading}>Community Developments</Text>
       </View>
      

       <FlatList
           style={styles.categoryScrollView}
           horizontal
           showsHorizontalScrollIndicator={false}
           data={renderData}
               keyExtractor={(item) => item.id}
               renderItem={({ item, index }) => {
                 return <CommunityDevelopmentCard data={item}/>}}/>
        </View>:null)
    }



    const InvestmentProjects = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const {investmentProjects} = useContext(PropertyDataContext);
        const renderData = investmentProjects.filter(item=>item.area == defaultHome.area)          
        return (renderData.length > 0?<View>
                    <View style={styles.blockContainer}>
                        <Text style={styles.subHeading}>Investment Projects</Text>
                    </View>
                    <FlatList
                        style={styles.categoryScrollView}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={renderData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                            return <InvestmentProjectsCard data={item}/>}}/>
            </View>:null
        )
    }
   

    const EconomicIndicator = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const {EconomicIndicators} = useContext(PropertyDataContext);
        // const renderData = EconomicIndicators.filter(item=>item.area == defaultHome.area)         
        return(EconomicIndicators.length > 0?
            <View>
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
            </View>:null
        )
    }


    return <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <View style={styles.blockContainer}>
                <Text style={styles.heading}>Report</Text>
            </View>
          <RecentSales/>
          <CommunityDevelopments/>
          <InvestmentProjects/>
          <EconomicIndicator/>  



     
          </ScrollView>
    </ SafeAreaView>
}
