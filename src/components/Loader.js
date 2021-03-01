import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#46D0B6" />
    </View>
  );
};

export default Loading;