import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card,Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
export default function Propertynotfound() {
  return (
    <View>
    <Card>
    <View  style={styles.container}>
     <FontAwesome name="home" size={95} color="#35d1b9" />

      <Text style={styles.paragraph}>
     Property not found
      </Text>
       <Text style={{color:'grey'}}>
     search again
      </Text>
   
   
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
