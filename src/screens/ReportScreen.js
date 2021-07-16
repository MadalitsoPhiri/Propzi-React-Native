import React,{useContext,useEffect,useState} from "react";
import {View,Text,StyleSheet, SafeAreaView, ScrollView,FlatList,Dimensions} from "react-native";
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
import {getRecentSales,getEconomicData,getInvestmentProjectsData,getCommunityData} from "../state/PropertySlice"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const {width,height} = Dimensions.get("window");
const CARD_HEIGHT = height * 0.4
const CARD_WIDTH = width * 0.6


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
  
},
skeletonCard:{
    borderRadius:17,
    width:CARD_WIDTH,
    height:CARD_HEIGHT,
    margin:12

},
skeletonCardContainer:{
    flexDirection:"row",
    width:"100%",
    height:CARD_HEIGHT,

},
skeletonContainer:{
    flexDirection:"column",alignItems:"flex-start",width:"100%",paddingHorizontal:16,
    paddingBottom:30,
},
skeletonCardTitle:{
    width:width * 0.75,
    height:35,
    borderRadius:17,
    marginVertical:16
}

    })

export default ReportScreen = ()=>{
    
    
    
    // const { recentSales } = useContext(RecentSalesContext);
    const RecentSales = ()=>{

    const dispatch = useDispatch()
    const {all:recentSales,loading} = useSelector(state=>state.property.RecentSales)
    console.log(RecentSales)
    const {all,defaultHome} = useSelector(state=>state.property.Properties)
    
    const currentProperty = all.filter(item=>item.identity == defaultHome.id)[0]
    useEffect(()=>{
        dispatch(getRecentSales(currentProperty))
    },[defaultHome])
    
        return(recentSales.length > 0 && !loading ?
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

             </View>:recentSales.length == 0 && !loading ? null:<SkeletonPlaceholder>
                 <View style={styles.skeletonContainer}>

                    <View style={styles.skeletonCardTitle}/>
                    <View style={styles.skeletonCardContainer}>
                        <View style={styles.skeletonCard}/>
                        <View style={styles.skeletonCard}/>
                    </View>    
                    

            
                </View>
             </SkeletonPlaceholder>   

        )
    }
    const CommunityDevelopments = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const { all,loading,error } = useSelector((state)=>state.property.CommunityDevelopments)
        const dispatch = useDispatch()
        const renderData = all.filter(item=>item.city == defaultHome.city)          
        useEffect(() => {
           dispatch(getCommunityData())
            
        }, [defaultHome])
        return (renderData.length > 0 && !loading?<View>
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
        </View>:renderData.length == 0 && !loading ? null:<SkeletonPlaceholder>
                 <View style={styles.skeletonContainer}>

                    <View style={styles.skeletonCardTitle}/>
                    <View style={styles.skeletonCardContainer}>
                        <View style={styles.skeletonCard}/>
                        <View style={styles.skeletonCard}/>
                    </View>    
                    

            
                </View>
             </SkeletonPlaceholder>)
    }



    const InvestmentProjects = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const dispatch = useDispatch()
        const {all,loading,error} = useSelector((state)=>state.property.InvestmentProjects)
        useEffect(()=>{
            dispatch(getInvestmentProjectsData())
        },[defaultHome])
        const renderData = all.filter(item=>item.area == defaultHome.area)          
        return (renderData.length > 0 && !loading?<View>
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
            </View>:renderData.length == 0 && !loading ? null:<SkeletonPlaceholder>
                 <View style={styles.skeletonContainer}>

                    <View style={styles.skeletonCardTitle}/>
                    <View style={styles.skeletonCardContainer}>
                        <View style={styles.skeletonCard}/>
                        <View style={styles.skeletonCard}/>
                    </View>    
                    

            
                </View>
             </SkeletonPlaceholder>
        )
    }
   

    const EconomicIndicators = ()=>{
        const {defaultHome} = useSelector((state)=>state.property.Properties)
        const {all,loading,error} = useSelector((state)=>state.property.EconomincData)
        const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(getEconomicData())
        },[defaultHome])
        // const renderData = EconomicIndicators.filter(item=>item.area == defaultHome.area)         
        return(all.length > 0 && !loading?
            <View>
                <View style={styles.blockContainer}>
                    <Text style={styles.subHeading}>Economic Indicators</Text>
                </View>
        

                <FlatList
                    style={styles.categoryScrollView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={all}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                        return <EconomicIndicatorCard data={item}/>}}/>
            </View>:all.length == 0 && !loading ? null:<SkeletonPlaceholder>
                 <View style={styles.skeletonContainer}>

                    <View style={styles.skeletonCardTitle}/>
                    <View style={styles.skeletonCardContainer}>
                        <View style={styles.skeletonCard}/>
                        <View style={styles.skeletonCard}/>
                    </View>    
                    

            
                </View>
             </SkeletonPlaceholder>   
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
          <EconomicIndicators/>  



     
          </ScrollView>
    </ SafeAreaView>
}
