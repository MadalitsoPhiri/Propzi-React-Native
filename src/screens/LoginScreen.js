gitimport React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { firebase,dbh} from "../../firebase";
import GoogleIcon from "../../assets/google-icon.svg"
import EmailIcon from "../../assets/envelope-regular.svg"
import LockIcon from "../../assets/lock-solid.svg"
import { useFonts } from 'expo-font';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import Loader from "../components/Loader";


const {width,height} = Dimensions.get("window")

var provider = new firebase.auth.GoogleAuthProvider();

// TODO:// Configure the title
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading,setLoading] = useState(false);
  const [Error,setError] = useState(null)
  const [isHidden, setHidden] = useState(true)

 
  
  signInWithGoogleAsync = async()=> {
    setLoading(true)
    try {
      const result = await Google.logInAsync({
        //androidClientId: `520048464069-sniestaiiavj4fa9ct390dkaogj16ad6.apps.googleusercontent.com`,
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









  const handleOnEmailChange = (e) => {
    setEmail(e);
  };
  const setHiddenValue = () =>{
    if (isHidden){
      setHidden(false)
    }else{
      setHidden(true)
    }
  }

  const handleOnPasswordChange = (e) => {
    setPassword(e);
  };

  const handleLogin = () => {
    setLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (user) => {
        },
        (err) => {
          console.log(err)
          setError(err)
          setLoading(false)
        }
        
      );
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView>
    <ScrollView style={styles.authContainer}>
    
      
      <Text style={styles.title}>Login to Propzi</Text>
      <Text
        style={{
          color:"#4F4F4F",
          fontSize:15,
          marginBottom:"8%",
         
        }} 
      >
        Get your value for free whenever you want
      </Text>
      

      <View>
        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.input, { width: "100%" }]}>
      <EmailIcon height={20} width={20}style={{marginRight:"5%",color:"#BDBDBD"}} />
      <TextInput
        placeholder={"Enter Email"}
        autoCorrect={true}
        onChangeText={handleOnEmailChange}
        value={email}
        style={{
          fontSize: 17,
          fontWeight: "500",
          color:"#4F4F4F",
          marginRight:"12%"
        }}
      />
      
    </View>
        
      </View>


     

      <View>
      <Text style={styles.label}>Password</Text>
        <View style={[styles.input, { width: "100%" }]}>
        <LockIcon height={20} width={20}style={{marginRight:"5%",color:"#BDBDBD"}} />
      <TextInput
        placeholder={"Password"}
        autoCorrect={true}
        onChangeText={handleOnPasswordChange}
        secureTextEntry={isHidden ? true:false}
        value={password}
        style={{
          fontSize: 17,
          fontWeight: "500",
          color:"#4F4F4F",
          flex:1,
          marginRight:"5%"
        }}
      />

      <TouchableOpacity onPress={setHiddenValue}>
      { isHidden ? <Text style={{flex:0.2,textAlign: "right",color:"#4F4F4F"}}>Show</Text>:<Text style={{flex:0.2,textAlign: "right",color:"#4F4F4F"}}>Hide</Text>}
      </TouchableOpacity>
      
      
    </View>
        
      </View>



  
      {Error ? <Text style={{marginTop:"5%",color:"red"}}>{Error.message}</Text>:null}
      <TouchableOpacity onPress={handleLogin} style={styles.authBtn} >
          <Text
            style={{
              color: "white",
              marginVertical: 13,
              fontSize:17,
              fontWeight:"700",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* { the divider section} */}
        <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:"5%"}}>
  <View style={{flex: 1, height: 1, backgroundColor: "#BDBDBD"}} />
  <View>
    <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor:"#BDBDBD",}} />
</View>
        
        
        
        {/* For the google sing in */}
        <View style={{justifyContent: 'center',alignItems: 'center',marginBottom:"5%",marginTop:"5%"}}>
        <TouchableOpacity style={{justifyContent:"center",height:height* 0.1,alignItems: 'center'}} onPress={signInWithGoogleAsync}>
      <GoogleIcon height={height* 0.08} width={width*0.1} />
      <Text style={{color:"#4F4F4F",}}>Sign in with Google</Text>
      </TouchableOpacity>
    
          </View> 
     
     {/* Sign in for Apple Auth */}
     <View style={{marginTop:"5%",flexDirection:"row",justifyContent:"center",marginBottom:"10%"}}>
     <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={10}
      style={{ width: "80%", height: 44 }}
      onPress={async () => {
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
      }}
    />

     </View>
          


      <View style={{ alignItems: "center"}}>
        <Text style={{color:"#4F4F4F",marginBottom:"2%"}}>Can't log into your account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("forgot")}>
          <Text
            style={{
              color:"#6FCF97",
              
            }}
          >
            Get help accessing your account.
          </Text>
        </TouchableOpacity>


        <Text style={{color:"#4F4F4F",marginBottom:"2%",marginTop:"10%"}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("signUp")}>
          <Text
            style={{
              color:"#6FCF97",
              marginBottom:"20%"
              
            }}
          >
            Sign up.
          </Text>
        </TouchableOpacity>

        
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
    height:"100%",
    marginTop:"5%",
   
  },

  label: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
  },
  authBtn: {
    marginTop:"10%",
    marginBottom:"10%",
    width:width * 0.333,
    height:50,
    borderRadius:10,
    alignSelf:"center",
    backgroundColor:"#6FCF97",
    alignItems:"center",
    justifyContent:"center"
   
      
  },
  divider:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  dividerSection:{
    flexDirection:"column",
    
    height:"5%"
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 5,
    backgroundColor:"white",
    flexDirection:"row",
    alignItems: "center",
  },
});
