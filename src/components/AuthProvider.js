import React, { useState, useLayoutEffect } from "react";
import { firebase, dbh } from "../../firebase";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setisFirstLaunch] = useState(false);

  const [communityData, setCommunityData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [address, setAddress] = useState("");

  let newArray = [];
  let newArray1 = [];
  const state = {};

  useLayoutEffect(() => {
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
        newArray1.push(doc.data());
        setPropertyData(newArray1);
      });
    }

    async function getCommunityDetails() {
      let communityDocs = await dbh
        .collection("Community")
        .doc("Mississauga")
        .collection("Applewood")
        .get();

      communityDocs.forEach((doc) => {
        newArray.push(doc.data());
        setCommunityData(newArray);
      });
    }
    getCommunityDetails();
    getPropertyDetails();
  }, []);

  state["communityData"] = communityData;
  state["propertyData"] = propertyData;
  state["address"] = address;

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