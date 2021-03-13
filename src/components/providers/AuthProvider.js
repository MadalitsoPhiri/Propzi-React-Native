import React, { useState } from "react";
import { firebase } from "../../../firebase";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setisFirstLaunch] = useState(false);

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
