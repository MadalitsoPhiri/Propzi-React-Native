import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logo from "../../assets/propzi-img/propzi-logo.webp";

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text>Bar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  logo: {
    width: 56,
    height: 33,
    // padding:40,
    // aspectRatio: 4 / 2,
    // borderWidth:2,
  },
});
