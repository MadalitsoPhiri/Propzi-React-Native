import React, { useContext, useState, useEffect } from "react";
import { firebase, dbh } from "../../../firebase";
import { AuthContext } from "./AuthProvider";

export const PropertyDataContext = React.createContext({});

export const PropertyDataProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isPropertyDataLoaded, setisPropertyDataLoaded] = useState(false);
  const [property, setProperty] = useState({});
  const [repliers, setRepliers] = useState({});

  useEffect(() => {
    dbh
      .collection("UserDetails")
      .doc(user.uid)
      .collection("Property")
      .onSnapshot((querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push(doc.data());
          setRepliers(doc.data().repliers.address);
        });
        
        setProperty(list[0]);
        setisPropertyDataLoaded(true);
      });
  }, []);

  return (
    <PropertyDataContext.Provider
      value={{ isPropertyDataLoaded, property, repliers }}
    >
      {children}
    </PropertyDataContext.Provider>
  );
};
