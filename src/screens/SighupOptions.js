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
} from "react-native";

// TODO:// Configure the title
export default function SignupOptions({navigation}) {

  const handlepress = () => {
    Alert.alert(
      "sign up",
      "signup msg",)
   }




 
  return (
    <SafeAreaView>
    <ScrollView style={styles.authContainer}>
    
<Text style={styles.headerText}> Discover the true value of your home</Text>

<View style={{marginTop:20}}>
  
  <TouchableOpacity onPress={handlepress} style={{backgroundColor:"#1c1e2a",marginBottom:7,marginTop:7,height:50,borderRadius:12}}>
     <View style={styles.buttoncontainer}>
      <View>
      <Image source={require('../../assets/icons/apple.png')}  style={{ width: 20, height: 20,marginRight:6 }}/>
    
      </View>


      <View style={{ flex: 4,}}>
      <Text style={{color:"white"}}>Sign in with Apple</Text> 
      </View>
      <View>
      <Image source={require('../../assets/icons/whiterightarrow.png')}  style={{ width: 16, height: 16 }}/>

      </View>
    </View>
 
  </TouchableOpacity>
  <TouchableOpacity onPress={handlepress} style={{backgroundColor:"#5d7cb3",marginBottom:7,marginTop:7,height:50,borderRadius:12}}>
  <View style={styles.buttoncontainer}>
      <View>
      <Image source={require('../../assets/icons/facebook.png')}  style={{ width: 20, height: 20,marginRight:6 }}/>
    
      </View>


      <View style={{ flex: 4,}}>
      <Text style={{color:"white"}}>Continue with Facebook</Text> 
      </View>
      <View>
      <Image source={require('../../assets/icons/whiterightarrow.png')}  style={{ width: 16, height: 16 }}/>

      </View>
    </View>
 
  </TouchableOpacity>
  <TouchableOpacity onPress={handlepress} style={{backgroundColor:"#6197f1",marginBottom:7,marginTop:7,height:50,borderRadius:12}}>

  <View style={styles.buttoncontainer}>
      <View>
      <Image source={require('../../assets/icons/google.png')}  style={{ width: 20, height: 20,marginRight:6 }}/>
    
      </View>


      <View style={{ flex: 4,}}>
      <Text style={{color:"white"}}>Continue with Google</Text> 
      </View>
     
      <View>
      <Image source={require('../../assets/icons/whiterightarrow.png')}  style={{ width: 16, height: 16 }}/>

      </View>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={handlepress} style={{backgroundColor:"#f1f1fb",marginBottom:7,marginTop:7,height:50,borderRadius:12}}>

  <View style={styles.buttoncontainer}>
      <View>
      <Image source={require('../../assets/icons/email.png')}  style={{ width: 20, height: 20,marginRight:6 }}/>
    
      </View>


      <View style={{ flex: 4,}}>
      <Text style={{color:"grey"}}>Continue with Email</Text> 
      </View>
      <View>
      <Image source={require('../../assets/icons/greyrightarrow.png')}  style={{ width: 16, height: 16 }}/>

      </View>
  </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={handlepress} >

    <Text style={{color:"grey",fontSize:13,fontWeight:"bold",marginTop:10}}>Log in to existing account</Text>
  </TouchableOpacity>

  <View>
    <Text style={{color:"grey",fontSize:11,marginTop:30}}>By using this app, you agree to the <Text style={{fontWeight:"bold"}}>Terms and Conditions</Text>and <Text style={{fontWeight:"bold"}}>Privacy Policy</Text>.You also agree to receive product related emails from Prozi which you can unsubscribe at any time.</Text>
  </View>
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
    paddingTop:"5%",
   backgroundColor:"#fff"
  },

  buttoncontainer:{
    flex: 1,
    padding: 20,
    
    flexDirection: 'row'
  },

  headerText:{
fontWeight:"bold",
fontSize:17,
marginTop:25
  },


});
