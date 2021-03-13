import React, { useState, useEffect } from "react";
import { firebase, dbh } from "../../../firebase";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setisFirstLaunch] = useState(false);

  const [property, setproperty] = useState({});
  const [address, setAddress] = useState("");

  const state = {};

  useEffect(() => {
    async function getPropertyDetails() {
      let propertyDetails = await dbh
        .collection("UserDetails")
        .doc(user.uid)
        .collection("Property")
        .get();
      propertyDetails.forEach((doc) => {
        let demoAddress = `${doc.data()?.streetNumber}, ${
          doc.data()?.streetName
        }, ${doc.data()?.city}`;

        setAddress(demoAddress);
        setPropertyData([...propertyData, doc.data()]);
      });
    }
    getPropertyDetails();
  }, [user]);

  state["address"] = address;

  return (
    <AuthContext.Provider
      value={{
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
