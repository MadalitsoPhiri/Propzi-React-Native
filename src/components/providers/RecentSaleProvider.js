import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { PropertyDataContext } from "../providers/PropertyDataProvider";

export const RecentSalesContext = React.createContext({});

const RecentSalesProvider = ({ children }) => {
  const { repliers } = useContext(PropertyDataContext);
  const [isRecentSalesLoading, setIsRecentSalesLoading] = useState(false);
  const [recentSales, setRecentSales] = useState([]);
  const RECENT_SALES_ENDPOINT = `https://api.repliers.io/listings?streetNumber=${repliers.streetNumber}&streetName=${repliers.streetName}&sortBy=createdOnDesc&type=sale&status=U&lastStatus=Sld&operator=AND&condition=EXACT`;

  useEffect(() => {
    setIsRecentSalesLoading(true);
    axios(RECENT_SALES_ENDPOINT, {
      method: "GET",
      headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
    })
      .then((res) => {
        setRecentSales(res.data.listings);
        setIsRecentSalesLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [RECENT_SALES_ENDPOINT]);

  return (
    <RecentSalesContext.Provider value={{ recentSales, isRecentSalesLoading }}>
      {children}
    </RecentSalesContext.Provider>
  );
};

export default RecentSalesProvider;
