import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  Platform
} from "react-native";
import { AntDesign, Entypo, FontAwesome} from '@expo/vector-icons';
import PropziLogo from "../../assets/PropziLogo.svg";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import Loader from "../components/Loader";
import * as Crypto from 'expo-crypto';
import { firebase,dbh} from "../../firebase";
import HomeBankFinance from "../components/Cards/HomeBankFinance";

// TODO:// Configure the title
const {width,height} = Dimensions.get("window") 
export default function SignupOptions({navigation}) {
  const [isLoading,setLoading] = useState(false);

    async function handleAppleClick(){
      setLoading(true)
        const nonce = Math.random().toString(36).substring(2, 10);
    
        return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
            .then((hashedNonce) =>
                AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL
                    ],
                    nonce: hashedNonce
                })
            )
            .then((appleCredential) => {
                const { identityToken } = appleCredential;
                const provider = new firebase.auth.OAuthProvider('apple.com');
                const credential = provider.credential({
                    idToken: identityToken,
                    rawNonce: nonce
                });
                return firebase.auth().signInWithCredential(credential)
                .then((credential)=>{
                  //User Succsessfully signed in
                  dbh.collection("UserDetails").doc(credential.user.uid).collection("User").get().then((docSnapshot) => {
          if (docSnapshot.size == 0) {
            dbh.collection(`UserDetails/${credential.user.uid}/User`).add({
              fullName:credential.user.displayName,phone:credential.user.phoneNumber,email:credential.user.email,clientIsMobile:true
          }).then((obj)=>{
              
          },(err)=>{
         setLoading(false)
         Alert.alert(
          "Error",
          err.message,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
          })
          
          }
        
        });
        
        
              }).catch((error) => {
                setLoading(false)
                Alert.alert(
                  "Error",
                  error.message,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
                
            })
            .catch((error) => {
                // ...
                setLoading(false)
                Alert.alert(
                  "Error",
                  error.message,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
  
//       try {
//         const cred = await AppleAuthentication.signInAsync({
//           requestedScopes: [
//             AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//             AppleAuthentication.AppleAuthenticationScope.EMAIL,
//           ],
//         });
//         // signed in
//         setLoading(true)

        
//         firebase.auth().signInWithCredential(cred).then((credential)=>{
//           //User Succsessfully signed in
//           dbh.collection("UserDetails").doc(credential.user.uid).collection("User").get().then((docSnapshot) => {
//   if (docSnapshot.size == 0) {
//     dbh.collection(`UserDetails/${credential.user.uid}/User`).add({
//       fullName:credential.user.displayName,phone:credential.user.phoneNumber,email:credential.user.email,clientIsMobile:true
//   }).then((obj)=>{
      
//   },(err)=>{
//  setLoading(false)
//  setError(err)
//   })
  
//   }

// });


//       }).catch((error) => {
//         setLoading(false)
//         Alert.alert(
//           "Error",
//           error.message,
//           [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel"
//             },
//             { text: "OK", onPress: () => console.log("OK Pressed") }
//           ]
//         );
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//       });
//       } catch (e) {
//         if (e.code === 'ERR_CANCELED') {
//           // handle that the user canceled the sign-in flow
//           setLoading(false)
//         }
//         else {
//           setLoading(false)
//           Alert.alert(
//             "Error",
//             e.message,
//             [
//               {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//               },
//               { text: "OK", onPress: () => console.log("OK Pressed") }
//             ]
//           );
      
//         }
//       }
    }
   
    handlepress = async()=> {
      setLoading(true)
      try {
          await Facebook.initializeAsync({
            appId: Platform.OS === 'ios' ? '845016889691335':'185801686567133',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
        
     
     
  
  
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const result = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          
          var cred = firebase.auth.FacebookAuthProvider.credential(result);
  
          firebase.auth().signInWithCredential(cred).then((credential)=>{
              //User Succsessfully signed in
              dbh.collection("UserDetails").doc(credential.user.uid).collection("User").get().then((docSnapshot) => {
      if (docSnapshot.size == 0) {
        dbh.collection(`UserDetails/${credential.user.uid}/User`).add({
          fullName:credential.user.displayName,phone:credential.user.phoneNumber,email:credential.user.email,clientIsMobile:true
      }).then((obj)=>{
          
      },(err)=>{
     setLoading(false)
     Alert.alert(
      "Alert Title",
      err.message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
      })
      
      }
  
    });
  
  
          }).catch((error) => {
            setLoading(false)
            Alert.alert(
              "Alert Title",
              error.message,
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
  
          return result.accessToken;
        } else {
          setLoading(false)
        return { cancelled: true };
        }
      } catch ({ message }) {
        setLoading(false)
        Alert.alert(
          "Alert Title",
          message,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
    
      }
    }

   signInWithGoogleAsync = async()=> {
    setLoading(true)
    //ios auth client id standalone 520048464069-3smfj9dv9rhld1l5dm3qrkivnq7i3hh0.apps.googleusercontent.com
    try {
      const result = await Google.logInAsync({
        androidClientId: `520048464069-drl8djviqeoa9crvdv5q05ighkb5eq1m.apps.googleusercontent.com`,
        iosClientId: `520048464069-sniestaiiavj4fa9ct390dkaogj16ad6.apps.googleusercontent.com`,
        iosStandaloneAppClientId :"520048464069-3smfj9dv9rhld1l5dm3qrkivnq7i3hh0.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        var cred = firebase.auth.GoogleAuthProvider.credential(result);
        firebase.auth().signInWithCredential(cred).then((credential)=>{
            //User Succsessfully signed in
            dbh.collection("UserDetails").doc(credential.user.uid).collection("User").get().then((docSnapshot) => {
    if (docSnapshot.size == 0) {
      dbh.collection(`UserDetails/${credential.user.uid}/User`).add({
        fullName:credential.user.displayName,phone:credential.user.phoneNumber,email:credential.user.email,clientIsMobile:true
    }).then((obj)=>{
        
    },(err)=>{
   setLoading(false)
   setError(err)
    })
    }
  });
        }).catch((error) => {
          setLoading(false)
          setError(error)
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

        return result.accessToken;
      } else {
        setLoading(false)
        return { cancelled: true };
        
      }
    } catch (e) {
      setLoading(false)
      setError(e)
      return { error: true };
    }
  }


  if (isLoading) {
    return <Loader text=""/>;
  }
  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
          <View style={{ marginHorizontal: 4 }}>
<HomeBankFinance/>
</View>
   
    </SafeAreaView>
  );


 
}
// TODO:// Add responsiveness to small card
const styles = StyleSheet.create({
  authContainer: {
    paddingLeft: 20,
    paddingRight:20,
    height,
    paddingTop:"2%",
   backgroundColor:"#fff"
  },

  buttonContainer:{
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:10,
    flexDirection: 'row',
    justifyContent:"center"
  },

  headerText:{
    fontWeight:"bold",
    fontSize:28,
    marginBottom:"7%",
    fontFamily:"Poppins-Bold",
    textAlign:"left",
    lineHeight:42
  },


});