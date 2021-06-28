import React, { useState, useEffect, createContext } from "react";
import { dbh } from "../../../firebase";
import { randomizeArray } from "../../utils/helper";

export const CommunityDataContext = createContext({});

const CommunitDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [communityData, setCommunityData] = useState([]);

 

  useEffect(() => {
    setIsLoading(true);
    dbh
      .collection("Communit")
      .onSnapshot((querySnapshot) => {
        const communityList = [];
          querySnapshot.forEach((documentSnapshot) => {
              communityList.push(documentSnapshot.data());
              // newArray = randomizeArray(communityList);
            
            });
            setCommunityData(communityList);
            setIsLoading(false);
        
      })
  }, []);

  return (
    <CommunityDataContext.Provider value={{ communityData, isLoading }}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export default CommunitDataProvider;
