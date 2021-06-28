import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LandLordInsurance from "../../../assets/LandlordInsurance.svg";
import FinanceHome from "../../../assets/Hazard-Insurance.svg";
// TODO:// Configure the title

export default function SmallCard() {
  return (
    <View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.container,
              { backgroundColor: "#34D1B6", marginRight: 10 },
            ]}
          >
            <FinanceHome style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>Home Insurance</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.container,
              { backgroundColor: "#F6B23E", marginLeft: 10 },
            ]}
          >
            <LandLordInsurance style={styles.image} />
          </TouchableOpacity>
          <Text style={[styles.title, { marginLeft: 10 }]}>Mortgages</Text>
        </View>
      </View>
    </View>
  );
}
// TODO:// Add responsiveness to small card
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    height: 95,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
});
