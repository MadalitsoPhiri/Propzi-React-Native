import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SearchInput from "../components/Input";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";
import { EvilIcons } from "@expo/vector-icons";


export default function NotFoundHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home Details</Text> */}
      {/* 
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>MLS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>Upgrades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>Propzi</Text>
        </TouchableOpacity>
      </View> */}

      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>
          Oops! We can't find your home
        </Text>

        <Text style={{ fontSize: 20, textAlign: "center" }}>
          If you're not able to find your home please continue below
        </Text>
      </View>

      <View>
        <Button
          title={"Add Your Home"}
          borderRadius={6}
          width={btnSize.MEDIUM_WIDTH}
          marginTop={30}
          onPress={()=>navigation.replace("search")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "85%",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tabs: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: colors.SECONDARY_COLOR,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 11,
    paddingHorizontal: 28,
    width: "100%",
    color: colors.WHITE_COLOR,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 40,
    fontWeight: "500",
  },
});
