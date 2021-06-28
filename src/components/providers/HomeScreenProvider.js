import React, { useState, useEffect, createContext } from "react";
import { firebase } from "../../../firebase";


export const HomeScreenContext = createContext({});


export const HomeScreenProvider = ({ children }) => {

    const [currentHomeCardIndex,setCurrentHomeCardIndex] = useState(0);

    
    <HomeScreenContext.Provider value={{ currentHomeCardIndex,setCurrentHomeCardIndex }}>
    {children}
  </HomeScreenContext.Provider>
}