import React from 'react';
import {View,SafeAreaView,StyleSheet,Alert} from "react-native";
import {DrawerContentScrollView,DrawerItem} from "@react-navigation/drawer";
import {Avatar,Titile,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch} from "react-native-paper";
import {firebase} from "../../firebase";

const handleLogout = (navigation)=>{
    Alert.alert(
        "Logout?",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
              navigation.closeDrawer();
              firebase.auth().signOut()
            } 
        }
        ],
        { cancelable: false }
      );
}
export const DrawerContent = ({navigation}) =>{
   return(<SafeAreaView style={{flex:1}}>
       <DrawerContentScrollView style={{paddingHorizontal:"10%"}}> 
           
           {/*Settings section*/}
           <View style={{marginBottom:"20%"}}>
           <View>
               <Text style={{fontSize:"12",fontWeight:"bold",marginLeft:"8%",marginBottom:"5%"}}>SETTINGS</Text>
           </View>
           <DrawerItem label="Profile" />
           <DrawerItem label="Change Pin" style={{marginBottom:"5%"}}/>
           <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginBottom:"10%"}}>
           <Text style={{marginLeft:"8%",color:"gray"}}>Face ID</Text>
           <Switch/>
           </View>
           <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginBottom:"10%"}}>
           <Text style={{marginLeft:"8%",color:"gray"}}>Push Notificatons</Text>
           <Switch/>
           </View>
           </View>
           
           {/*Resources Section */}
           <View>
           <View>
               <Text style={{fontSize:"12",fontWeight:"bold",marginLeft:"8%",marginBottom:"5%"}}>RESOURCES</Text>
           </View>
           <DrawerItem label="Help Centre"/>
           <DrawerItem label="Education" style={{marginBottom:"5%"}}/>
           <DrawerItem label="Terms of Service" style={{marginBottom:"5%"}}/>
           <DrawerItem label="Privacy Policy" style={{marginBottom:"5%"}}/>
           <DrawerItem label="Licenses" style={{marginBottom:"5%"}}/>
           
         
           </View>
       </DrawerContentScrollView>
       <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem label="Log Out" style={styles.logoutText} labelStyle={{color:"#34D1B6"}} onPress={()=>{handleLogout(navigation)}}/>
          <DrawerItem label="App Version 1.0.5" style={styles.logoutText}/>

        
       </Drawer.Section>
   </SafeAreaView>);
}

const styles = StyleSheet.create({
bottomDrawerSection:{
    marginTop:"10%",
    marginBottom:"15%",
},
logoutText:{
    color:"#34D1B6",
    marginLeft:"10%"
}
})


