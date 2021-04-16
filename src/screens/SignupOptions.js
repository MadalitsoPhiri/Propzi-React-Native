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
import { firebase,dbh} from "../../firebase";

// TODO:// Configure the title
const {width,height} = Dimensions.get("window") 
// var provider = new firebase.auth.GoogleAuthProvider();
export default function SignupOptions({navigation}) {
  const [isLoading,setLoading] = useState(false);

    async function handleAppleClick(){
      try {
        const cred = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });
        // signed in
        setLoading(true)

        
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
      } catch (e) {
        if (e.code === 'ERR_CANCELED') {
          // handle that the user canceled the sign-in flow
        }
        else {
          setError(e)
        }
      }
    }
   
    handlepress = async()=> {
      try {


        if (Platform.OS === 'ios') {
          await Facebook.initializeAsync({
            appId: '845016889691335',
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
          const result = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        }
        else{
          await Facebook.initializeAsync({
            appId: '185801686567133',
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
          const result = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        }

      
      

        if (result.type === 'success') {
          // Get the user's name using Facebook's Graph API
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
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }



   signInWithGoogleAsync = async()=> {
    setLoading(true)
    try {
      const result = await Google.logInAsync({
        androidClientId: `520048464069-drl8djviqeoa9crvdv5q05ighkb5eq1m.apps.googleusercontent.com`,
        iosClientId: `520048464069-sniestaiiavj4fa9ct390dkaogj16ad6.apps.googleusercontent.com`,
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
    <ScrollView style={[styles.authContainer]}>
    <PropziLogo
              height={54}
              width={97}
              style={{marginHorizontal:20,marginVertical:"5%" }}
            />
<Text style={[styles.headerText,{marginHorizontal:20}]}> Discover the true value of your home</Text>

<View style={{marginTop:20,marginHorizontal:20,height:Platform.OS === 'ios' ?"100%":height * 0.667}}>
  
  {Platform.OS === 'ios' ?<TouchableOpacity onPress={handleAppleClick} style={{backgroundColor:"#000000",marginVertical:7,borderRadius:12,padding:13,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    
    <View style={{justifyContent:"space-between",flexDirection:"row"}}>
    <AntDesign name="apple1" size={20} color="white" />


      
<Text style={{color:"white",marginLeft:16,fontWeight:"700",fontSize:15}}>Sign in with Apple</Text> 
    </View>
     
      <Entypo name="chevron-right" size={24} color="white" />
  
 
  </TouchableOpacity>:null}


  <TouchableOpacity onPress={handlepress} style={{backgroundColor:"#4c659d",marginVertical:7,borderRadius:12,padding:13,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    
    <View style={{justifyContent:"space-between",flexDirection:"row"}}>
    <AntDesign name="facebook-square" size={24} color="white" />


      
<Text style={{color:"white",marginLeft:16,fontWeight:"700",fontSize:15,lineHeight:23}}>Continue with Facebook</Text> 
    </View>
     
      <Entypo name="chevron-right" size={24} color="white" />
  
 
  </TouchableOpacity>




  <TouchableOpacity onPress={signInWithGoogleAsync} style={{backgroundColor:"#5e93ef",marginVertical:7,borderRadius:12,padding:13,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    
    <View style={{justifyContent:"space-between",flexDirection:"row"}}>
    <AntDesign name="google" size={24} color="white" />


      
<Text style={{color:"white",marginLeft:16,fontWeight:"700",fontSize:15,lineHeight:23}}>Sign in with Google</Text> 
    </View>
     
      <Entypo name="chevron-right" size={24} color="white" />
  
 
  </TouchableOpacity>


  <TouchableOpacity onPress={()=>{navigation.navigate("login")}} style={{backgroundColor:"#f1f1fb",marginVertical:7,borderRadius:12,padding:13,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
    
    <View style={{justifyContent:"space-between",flexDirection:"row"}}>
    <FontAwesome name="envelope" size={20} color="#c0c7d9" />


      
<Text style={{color:"#686874",marginLeft:16,fontWeight:"700",fontSize:15,lineHeight:23}}>Continue with email</Text> 
    </View>
     
      <Entypo name="chevron-right" size={24} color="#c0c7d9" />
  
 
  </TouchableOpacity>
  

    
   
  <Text style={{color:"grey",fontSize:11,position:"absolute",bottom:0,marginTop:20,textAlign:"center"}}>By using this app, you agree to the <Text style={{fontWeight:"bold"}}>Terms and Conditions</Text> and <Text style={{fontWeight:"bold"}}>Privacy Policy</Text>.You also agree to receive product related emails from Propzi which you can unsubscribe at any time.</Text>
</View>

    </ScrollView>
    
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