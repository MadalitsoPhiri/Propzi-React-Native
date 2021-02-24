import React, { useState, useEffect, useLayoutEffect } from "react";
import { firebase, dbh } from "../../../firebase";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setisFirstLaunch] = useState(false);

  const [communityData, setCommunityData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [address, setAddress] = useState("");

  const state = {};
  const communityArrData = [];

  useEffect(() => {
    async function getPropertyDetails() {
      let propertyDetails = await dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .get();
      propertyDetails.forEach((doc) => {
        let demoAddress = `${doc.data().streetNumber}, ${
          doc.data().streetName
        }, ${doc.data().city}`;

        setAddress(demoAddress);
        setPropertyData([...propertyData, doc.data()]);
      });
    }
    getPropertyDetails();
  }, [user]);

  useEffect(() => {
    async function getCommunityDetails() {
      let communityDocs = await dbh
        .collection("Communit")
        .doc("mississauga")
        .collection("All")
        .get();

      communityDocs.forEach((doc) => {
        communityArrData.push(doc.data());
        setCommunityData(communityArrData);
      });
    }
    getCommunityDetails();
  }, []);

  state["communityData"] = communityData;
  state["propertyData"] = propertyData;
  state["address"] = address;
  // console.log(state);

  return (
    <AuthContext.Provider
      value={{
        homeState: state,
        user,
        setUser,

        isFirstLaunch,
        setisFirstLaunch,
        login: (email, password) => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              (user) => {
                setUser(user);
              },
              (err) => console.log(err)
            );
        },
        logout: () => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              setUser(user);
            }),
            (err) => console.log(err);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};