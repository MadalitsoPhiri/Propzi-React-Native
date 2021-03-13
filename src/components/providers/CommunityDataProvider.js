import React, { useContext, useState, useEffect, createContext } from "react";
import { dbh } from "../../../firebase";

export const CommunityDataContext = createContext({});

const CommunitDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [communityData, setCommunityData] = useState([]);

  const communityList = [];
  useEffect(() => {
    setIsLoading(true);
    dbh.collection("Communit").onSnapshot((docs) => {
      docs.forEach((doc) => {
        doc.data();
        communityList.push(doc.data());
        setCommunityData(communityList);
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
