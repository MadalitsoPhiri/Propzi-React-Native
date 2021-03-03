import React from 'react'
import { View,Text} from 'react-native'
import { ActivityIndicator } from "react-native-paper";

const Loading = ({text}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#46D0B6" />
      <Text style={{marginTop:"5%"}}>{text}</Text>
    </View>
  );
};

export default Loading;