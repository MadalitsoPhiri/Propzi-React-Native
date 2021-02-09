import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 0.61 * height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 0.17,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  slider: {
    flex: 1,
  },
  footer: {
    flex: 0.5,
  },
  logo: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  description: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: "5%",
    textAlign: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
});

export default function Slide(props) {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.logo} width={width} />
      <Text style={styles.description} adjustsFontSizeToFit numberOfLines={3}>
        {props.label}
      </Text>
    </View>
  );
}
