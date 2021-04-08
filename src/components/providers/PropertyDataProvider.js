import React, { useContext, useState, useEffect } from "react";
import { firebase, dbh } from "../../../firebase";
import { AuthContext } from "./AuthProvider";

export const PropertyDataContext = React.createContext({});

export const PropertyDataProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isPropertyDataLoaded, setisPropertyDataLoaded] = useState(false);
  const [property, setProperty] = useState({});
  const [repliers, setRepliers] = useState({});
  const [Properties, setProperties] = useState([]);
  const [PropertiesDocId, setPropertiesDocid] = useState([]);

  const [defaultHome, setdefaultHome] = useState(0);

  useEffect(() => {
    dbh
      .collection("UserDetails")
      .doc(user.uid)
      .collection("Property")
      .onSnapshot((querySnapshot) => {
        let defaultProperty = []
        let otherProperties = []
     
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if(doc.data().isDefault){
            let data = doc.data()
            data["id"] = doc.id
            defaultProperty.push(data);

          }else{
            let data = doc.data()
            data["id"] = doc.id
            otherProperties.push(data);
          }
        
          setRepliers(doc.data().repliers.address);
        });
        
        setProperty(defaultProperty[0]);
        setProperties([...defaultProperty,...otherProperties]);
        setisPropertyDataLoaded(true);
      });
  }, []);

  return (
    <PropertyDataContext.Provider
      value={{ isPropertyDataLoaded, property, repliers,Properties, setProperties,defaultHome,setdefaultHome}}
    >
      {children}
    </PropertyDataContext.Provider>
  );
};
