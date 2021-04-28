import * as React from 'react';
import { Text, View, StyleSheet, Image,RefreshControl } from 'react-native';

import { Card,Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Network() {
 const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
  return (
    <View>
    <Card>
    <View  style={styles.container}>
     <MaterialCommunityIcons name="wifi-strength-1" size={75} color="#35d1b9" />


      <Text style={styles.paragraph}>
     No Internet Connection
      </Text>
       <Text >
     Try these steps to get online:
      </Text>
      <View style={{marginTop:17}}>
      <Text style={{marginTop:5,color:'grey'}}><AntDesign name="checkcircleo" size={14} color="grey" /> Check Your Modem and Router</Text>
      <Text style={{marginTop:5,color:'grey'}}><AntDesign name="checkcircleo" size={14} color="grey" /> Reconnect to Wi-Fi</Text>
            <Text style={{marginTop:5,color:'grey'}}><AntDesign name="checkcircleo" size={14} color="grey" /> Refresh Page</Text>
      </View>
     
    </View>
      </Card>
    </View>
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
