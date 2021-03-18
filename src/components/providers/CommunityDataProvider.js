import React, { useState, useEffect, createContext } from "react";
import { dbh } from "../../../firebase";
import { randomizeArray } from "../../utils/helper";

export const CommunityDataContext = createContext({});

const CommunitDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [communityData, setCommunityData] = useState([]);

  const communityList = [];
  let newArray;
  useEffect(() => {
    setIsLoading(true);
    dbh.collection("Communit").onSnapshot((docs) => {
      docs.forEach((doc) => {
        communityList.push(doc.data());
        newArray = randomizeArray(communityList);
        // console.warn(doc.id,docs.docs[0].);
        setCommunityData(newArray);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <CommunityDataContext.Provider value={{ communityData, isLoading }}>
      {children}
    </CommunityDataContext.Provider>
  );
};

export default CommunitDataProvider;
