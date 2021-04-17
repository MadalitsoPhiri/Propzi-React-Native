import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import logo from "../../assets/propzi-img/propzi-logo.webp";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <TouchableOpacity>
          <FontAwesome5 name="bars" size={27} color={colors.SECONDARY_COLOR} />
        </TouchableOpacity>
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
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logo: {
    width: 56,
    height: 33,
    // padding:40,
    // aspectRatio: 4 / 2,
    // borderWidth:2,
  },
});
