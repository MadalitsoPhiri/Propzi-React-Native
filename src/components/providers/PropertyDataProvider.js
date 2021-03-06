import React, { useContext, useState, useEffect } from "react";
import { firebase, dbh } from "../../../firebase";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector,useDispatch} from "react-redux";

export const PropertyDataContext = React.createContext({});

export const PropertyDataProvider = ({ children }) => {
  const auth = useSelector((state)=>state.auth)
  const [isPropertyDataLoaded, setisPropertyDataLoaded] = useState(false);
  const [property, setProperty] = useState({});
  const [repliers, setRepliers] = useState({});
  const [Properties, setProperties] = useState([]);
  const [focusedProperty,setFocusedProperty] = useState(null);
  const [EconomicIndicators,setEconomicIndicators] = useState([])
  const [isRecentSalesLoading, setIsRecentSalesLoading] = useState(false);
  const [investmentProjects,setInvestmentProjects] = useState([])


   console.log("auth",auth)
  const getUserDetails = ()=>{
    dbh
    .collection("UserDetails")
    .doc(auth.user.uid)
    .collection("Property")
    .onSnapshot((querySnapshot) => {
      
      if(querySnapshot.empty){

      }else{
        let Properties = []
   
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
            let data = doc.data()
            data["identity"] = doc.id
           
            Properties.push(data);

        
          
          
        
          
        });
        setRepliers(Properties[0].repliers.address);
        setProperty(Properties[0]);
       
        checkDefaultProperty(Properties[0].identity)
        setFocusedProperty(Properties[0])
        setProperties([...Properties]);
        setisPropertyDataLoaded(true);
      }
      
    });
  }

  const getEconomicData = ()=>{
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

       setEconomicIndicators(users);
      
     });
   }

   const getInvestmentProjectsData = ()=>{
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

       setInvestmentProjects(users);
      
     });
   }

  const [defaultProperty, setdefaultHome] = useState(0);
  function checkDefaultProperty(id){
    try{
   const value = AsyncStorage.getItem('@defaultProperty',(err,result)=>setdefaultHome(result));
         
        if (value !== null){

            
        console.log("it worked",id)
        }else{
          setdefaultHome(id)
          console.log("it did not work ",id)
        }

    }catch(err){
    console.log('Error @checkOnboarding:',err)
    }finally{
      // setLoading(false)
    }
}
  useEffect(() => {
   
      
       getEconomicData()
       getUserDetails()
       getInvestmentProjectsData()
     
      return ()=>{
        getEconomicData()
        getUserDetails()
        getInvestmentProjectsData()
      }
  }, []);


  // useEffect(()=>{
  //  getUserDetails()

  //  return ()=>getUserDetails()
  // },[])

   
    

  return (
    <PropertyDataContext.Provider
      value={{EconomicIndicators,setFocusedProperty,focusedProperty, isPropertyDataLoaded, property, repliers,Properties, setProperties,defaultProperty,setdefaultHome,investmentProjects}}
    >
      {children}
    </PropertyDataContext.Provider>
  );
};
