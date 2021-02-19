import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import homeIcon from "../../../assets/propzi-img/home.png";
import Home from "../../../assets/Home.svg";

export default function HomeCard({ data, to }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Home style={styles.homeImg} />
        <Text style={styles.propziPrice}>
          {data[0].propziPrice != "" ? (
            <Text>{data[0].propziPrice}</Text>
          ) : (
            <Text>Calculating</Text>
          )}
        </Text>
        <Text>Propzi Price</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text>Propzi Visit</Text>
          <Text>12/01/21</Text>
        </View>
        <View>
          <Text>CMA Price</Text>
          <Text>
            {data[0].cmaPrice != "" ? (
              <Text>{data[0].cmaPrice}</Text>
            ) : (
              <Text>Calculating</Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginBottom: 60,
    padding: 20,
    shadowColor:"#333",
    shadowOffset:{width:1,height:1},
    backgroundColor:"white",
    shadowRadius:5,
    shadowOpacity:0.3,
    elevation:3,
    borderRadius:10,
  },

  cardHeader: {
    alignItems: "center",
  },

  homeImg: {
    marginBottom: 10,
    width: "100%",
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