
// example of how to use the detect network function

import { StatusBar } from 'expo-status-bar';
import React , {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {checkConnected} from './utils/detectconnection';

import Network from "../components/Network";
export default function dummy() {
  const [connectStatus,setConnectStatus] = useState(false)

  checkConnected().then(res=>{
    setConnectStatus(res)
  })

 
  return (
    connectStatus?
    (<View style={styles.container}>
      <Text>sample code checking if propzi user is connected</Text>
     
    </View>):(
      <Network onCheck={checkConnected}/>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});