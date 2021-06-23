import React from "react";
import { StyleSheet, Text, View, TouchableOpacity ,Image } from "react-native";
import SearchInput from "../components/Input";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";
import { EvilIcons } from "@expo/vector-icons";
// import PropziLogo from "../../assets/propzi-img/notfound.jpg";
import { FontAwesome } from '@expo/vector-icons'; 

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
      <FontAwesome name="home" size={145} color="#CDCDCD" />
        <Text style={styles.title}>
          Oops! You dont have a home yet.
        </Text>

        <Text style={{ fontSize: 15, textAlign: "center",color:'grey', paddingHorizontal:16}}>
          To see your propzi score you need to add atleast one home or property.
        </Text>
      </View>

      <View>
        <Button
          title={"Add Your Home"}
          borderRadius={6}
          backgroundColor={'green'}
          width={btnSize.MEDIUM_WIDTH}
          marginTop={15}
          onPress={()=>navigation.replace("propertyType")}
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
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "500",
    paddingHorizontal:16
  },
});
