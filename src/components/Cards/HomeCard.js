import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import homeIcon from "../../../assets/propzi-img/home.png";

export default function HomeCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Image source={homeIcon} style={styles.homeImg} />
        <Text style={styles.propziPrice}>$1,421,871</Text>
        <Text>Propzi Price</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text>Propzi Visit</Text>
          <Text>12/01/21</Text>
        </View>
        <View>
          <Text>CMA Price</Text>
          <Text>$1,200,43</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 60,
    padding: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },

  cardHeader: {
    alignItems: "center",
  },

  homeImg: {
    marginBottom: 10,
    width: 70,
    marginTop: 16,
  },

  propziPrice: {
    fontSize: 26,
    fontWeight: "bold",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },
});
