import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import homeIcon from "../../../assets/propzi-img/home.png";
import Home from "../../../assets/Home.svg";
import { Ionicons,AntDesign} from '@expo/vector-icons';

export default function HomeCard({ data, to }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <AntDesign name="home" size={100} color={"#46D0B6"}/>
        <Text style={styles.propziPrice}>
          {data.propziPrice != "" ? (
            <Text>{data.propziPrice}</Text>
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
            {data.cmaPrice != "" ? (
              <Text>{data.cmaPrice}</Text>
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