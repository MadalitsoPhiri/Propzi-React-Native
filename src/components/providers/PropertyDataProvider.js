import React, { useContext, useState, useEffect } from "react";
import { firebase, dbh } from "../../../firebase";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PropertyDataContext = React.createContext({});

export const PropertyDataProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isPropertyDataLoaded, setisPropertyDataLoaded] = useState(false);
  const [property, setProperty] = useState({});
  const [repliers, setRepliers] = useState({});
  const [Properties, setProperties] = useState([]);
  const [focusedProperty,setFocusedProperty] = useState(null);

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
    dbh
      .collection("UserDetails")
      .doc(user.uid)
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
  
          
            
            
          
            setRepliers(doc.data().repliers.address);
          });
          
          setProperty(Properties[0]);
          
          checkDefaultProperty(Properties[0].identity)
          setFocusedProperty(Properties[0])
          setProperties([...Properties]);
          setisPropertyDataLoaded(true);
        }
        
      });
  }, []);

  return (
    <PropertyDataContext.Provider
      value={{setFocusedProperty,focusedProperty, isPropertyDataLoaded, property, repliers,Properties, setProperties,defaultProperty,setdefaultHome}}
    >
      {children}
    </PropertyDataContext.Provider>
  );
};
