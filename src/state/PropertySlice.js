import {createSlice} from "@reduxjs/toolkit";
import { firebase } from "../../firebase"
import CommunityDevelopmentCard from "../screens/CommunityDevelopmentCard";
import { dbh } from "../../firebase"
import AsyncStorage from '@react-native-async-storage/async-storage';

const PropertyData = createSlice({
    name:"Property",
    initialState:{
     Properties:{
         all:[],
         loading:false,
         error:null,
         defaultHome:{
           id:null,
           city:null,
           area:null,
           neighbourhood:null,
         }
     },
     EconomincData:{
         all:[],
         loading:false,
         error:null

     },
     InvestmentProjects:{
         all:[],
         loading:false,
         error:null
     },
     CommunityDevelopments:{
         all:[],
         loading:false,
         error:null
     },
     RecentSales:{
        all:[],
        loading:false,
        error:null
    },
    currentHomeCardIndex:0

    },
    reducers:{
    fetchProperties:(state)=>{
        state.Properties.loading = true

    },
    fetchPropertiesFailure:(state,action)=>{
        state.Properties.error = action.payload
        state.Properties.loading = false
    },
    fetchPropertiesSuccess:(state,action)=>{
        state.Properties.all = action.payload
        state.Properties.loading = false
        
    },
    fetchEconomicData:(state)=>{
        state.EconomincData.loading = true
    },
    fetchEconomicDataFailure:(state,action)=>{
        state.EconomincData.error = action.payload
        state.EconomincData.loading = false
    },
    fetchEconomicDataSuccess:(state,action)=>{
        state.EconomincData.all = action.payload
        state.EconomincData.loading = false
    },
    
    
    fetchCommunityData:(state)=>{
        state.CommunityDevelopments.loading = true
    },
    fetchCommunityDataSuccess:(state,action)=>{
        state.CommunityDevelopments.all = action.payload
        state.CommunityDevelopments.loading = false
    },

    fetchCommunityDataFailure:(state,action)=>{
        state.CommunityDevelopments.error = action.payload
        state.CommunityDevelopments.loading = false
    },
    fetchInvestmentProjects:(state)=>{
        state.InvestmentProjects.loading = true
    },
    fetchInvestmentProjectsSuccess:(state,action)=>{
        state.InvestmentProjects.all = action.payload
        state.InvestmentProjects.loading = false
    },

    fetchInvestmentProjectsFailure:(state,action)=>{
        state.InvestmentProjects.error = action.payload
        state.InvestmentProjects.loading = false
    },
    fetchRecentSales:(state)=>{
        state.RecentSales.loading = true
    },
    fetchRecentSalesFailure:(state,action)=>{
        state.RecentSales.error = action.payload
        state.RecentSales.loading = false
    },
    fetchRecentSalesSuccess:(state,action)=>{
        state.RecentSales.all = action.payload
        state.RecentSales.loading = false
    },
    setCurrentHomeCardIndex:(state,action)=>{
      state.currentHomeCardIndex = action.payload
    },
    setdefaultHome:(state,action)=>{
      update = {
        id:action.payload.identity,
        city:action.payload.city,
        area:action.payload.area,
        neighbourhood:action.payload.neighbourhood,
      }
     state.Properties.defaultHome = update
    }
  
    }

})

export const {
    fetchProperties,
    fetchPropertiesFailure,
    fetchPropertiesSuccess,
    fetchEconomicData,
    fetchEconomicDataFailure,
    fetchEconomicDataSuccess,
    fetchCommunityData,
    fetchCommunityDataSuccess,
    fetchCommunityDataFailure,
    fetchInvestmentProjects,
    fetchInvestmentProjectsSuccess,
    fetchInvestmentProjectsFailure,
    fetchRecentSales,
    fetchRecentSalesFailure,
    fetchRecentSalesSuccess,
    setCurrentHomeCardIndex,
    setdefaultHome
} = PropertyData.actions


//thunks
export const getUserProperties = (user)=>{
  return (dispatch)=>{
        dispatch(fetchProperties())
        dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .get()
        .then((querySnapshot) => {
          
          if(querySnapshot.empty){
    
          }else{
            let Properties = []
       
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
                let data = doc.data()
                data["identity"] = doc.id
               
                Properties.push(data);
    
            
              
              
            
              
            });
            // setRepliers(Properties[0].repliers.address);
            dispatch(fetchPropertiesSuccess(Properties))
            console.log("Fetch properties Successful")
           
         
          }
          
        }).catch((err) =>{ 
              console.log(err)
              dispatch(fetchPropertiesFailure(err))
              console.log("Fetch properties Unsuccessful")
          });
    }
    

}


export function getDefaultProperty(props){

    return async (dispatch) =>{
 
        try{
            const value = await AsyncStorage.getItem('@defaultProperty',(err,result)=>{
              if(result != null){
                dispatch(setdefaultHome(props.filter(item=>item.identity==result)[0]))
              }else{
                dispatch(setdefaultHome(props[0]))
              }
            });
                  
                //  if (value !== null){
         
                     
                //  console.log("it worked")
                //  }else{
                //     // defaultProp = currentState.property.Properties.all[0].identity
                //     // dispatch(setdefaultHome(defaultProp))

                //    console.log("it di")
                //  }
         
             }catch(err){
              
             console.log('Error @checkOnboarding:',err)
             }
    }
    
}



  export function setDefaultProperty(property){

    return async(dispatch)=>{
        try{
            await AsyncStorage.setItem('@defaultProperty',property.identity);
            dispatch(setdefaultHome(property))
        }catch(err){
          console.log('Error @checkOnboarding:',err)
        }
    }
     
      
    }


export const getRecentSales = (property)=>{
  const RECENT_SALES_ENDPOINT = `https://api.repliers.io/listings?streetNumber=${property.streetNumber}&streetName=${property.streetName}&sortBy=createdOnDesc&type=sale&status=U&lastStatus=Sld&operator=AND&condition=EXACT`;
  const REPLIERS_OPTIONS = {
    method: "GET",
    headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
  };
  
  return async dispatch=>{
    dispatch(fetchRecentSales)
    try{
      let request = await fetch(RECENT_SALES_ENDPOINT,REPLIERS_OPTIONS)
      let data = await request.json()
      dispatch(fetchRecentSalesSuccess(data.listings))
    


    }catch(err){
      console.log("RecentSales",err)
     dispatch(fetchRecentSalesFailure(err))
    }


  }
}    


export const getEconomicData = (dispatch)=>{
     dispatch(fetchEconomicData())
    dbh
     .collection("DailyEconomicIndicator")
     .onSnapshot((querySnapshot) => {
       const users = [];

       querySnapshot.forEach((documentSnapshot) => {
         users.push({
           ...documentSnapshot.data(),
           key: documentSnapshot.id,
         });
       });

       dispatch(fetchEconomicDataSuccess(users))
      
     }).catch((err)=>{
    dispatch(fetchEconomicDataFailure(err))
     });
   }




 export const getInvestmentProjectsData = (dispatch)=>{
    dispatch(fetchInvestmentProjects())
     dbh
     .collection("InvestmentProjects")
     .onSnapshot((querySnapshot) => {
       const users = [];

       querySnapshot.forEach((documentSnapshot) => {
         users.push({
           ...documentSnapshot.data(),
           key: documentSnapshot.id,
         });
       });

       dispatch(fetchInvestmentProjectsSuccess())
      
     }).catch((err)=>{
        dispatch(fetchInvestmentProjectsFailure(err))
        console.log(err)
     });
    }
    export default PropertyData.reducer