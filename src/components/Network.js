import * as React from 'react';
import { Text, View, StyleSheet, Image,RefreshControl,SafeAreaView  } from 'react-native';

import { Card,Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Network = (props) => {
 
  
  return (
    
    <SafeAreaView   style={styles.container}>
     <MaterialCommunityIcons name="wifi-strength-1" size={100} color="#CDCDCD" />


      <Text style={styles.paragraph}>
     No Internet Connection
      </Text>
       <Text >
     Try these steps to get online:
      </Text>
      <View style={{marginTop:17}}>
      <Text style={{marginTop:5,color:'grey'}}><AntDesign name="checkcircleo" size={14} color="grey" /> Check Your Modem and Router</Text>
      <Text style={{marginTop:5,color:'grey'}}><AntDesign name="checkcircleo" size={14} color="grey" /> Reconnect to Wi-Fi</Text>
      </View>
      <Button  mode="contained" onPress={props.onCheck} style={{backgroundColor:'#35d1b9',marginTop:25}}>
   Reload 
  </Button>
    </SafeAreaView >
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
   
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
export default Network