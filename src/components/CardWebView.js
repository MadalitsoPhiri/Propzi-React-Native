import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { WebView } from "react-native-webview";
import Loader from "../components/Loader";

export function CardWebView({ route }) {
  let projectURL = route.params.projectURL;
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!projectURL.startsWith("http")) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error:</Text>
        <Text style={{ color: "red" }}>Not a valid url</Text>
      </View>
    );
  }

  return (
    <>
      {isLoading && <Loader text="" />}
      <WebView
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoadEnd={() => setIsLoading(false)}
        originWhitelist={["*"]}
        source={{ uri: projectURL }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
