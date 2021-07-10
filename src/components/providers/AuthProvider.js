import React, { useState } from "react";
import { firebase } from "../../../firebase";
import {useSelector,useDispatch} from "react-redux";
import { login,logout } from "../../state/Authentication"

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [isFirstLaunch, setisFirstLaunch] = useState(false);
  const [property,setproperty] = useState({})
  const [currentHomeCardIndex,setCurrentHomeCardIndex] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        user,
        property,
        setproperty,
        isFirstLaunch,
        setisFirstLaunch,
        signIn: (email, password) => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
              (user) => {
               dispatch(login(user));
              },
              (err) => console.log(err)
            );
        },
        signOut: () => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              dispatch(logout());
            }),
            (err) => console.log(err);
        },
        currentHomeCardIndex,
        setCurrentHomeCardIndex
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
