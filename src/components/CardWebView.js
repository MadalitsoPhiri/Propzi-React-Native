import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { WebView } from "react-native-webview";

export function CardWebView({ route }) {
  let projectURL = route.params.projectURL;
  if (!projectURL.startsWith("http")) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error:</Text>
        <Text style={{ color: "red" }}>Not a valid url</Text>
      </View>
    );
  }
  return <WebView originWhitelist={["*"]} source={{ uri: projectURL }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
