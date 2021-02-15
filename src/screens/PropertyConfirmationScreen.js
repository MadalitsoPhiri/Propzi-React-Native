import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../components/Button";
import { colors } from "../styles";
import { dbh } from "../../firebase";

export default function PropertyConfirmationScreen({ data, navigation }) {
  // const dataToSave = {
  //   bedrooms: data.details.numBedrooms,
  //   bathrooms: data.details.numBathrooms,
  //   squareFeet: data.details.sqft,
  //   propertyType: data.details.propertyType,
  //   propertyClass: data.class,
  //   area: data.address.area,
  //   city: data.address.city,
  //   cmaPrice: "",
  //   neighbourhood: data.address.neighborhood,
  //   streetName: data.address.streetName,
  //   streetNumber: data.address.streetNumber,
  //   unitNumber: data.address.unitNumber,
  // };

  // const handleOnAddHomePress = (e) => {
  //   dbh
  //     .collection("UserDetails")
  //     .doc("CYDX76NnRLZgJhEoi32ves0roAF3")
  //     .collection("Property")
  //     .add(dataToSave)
  //     .then(
  //       (info) => {
  //         info.get().then((ds) => {
  //           if (ds.data()) {
  //             // navigation.navigate("Home");
  //             console.warn(navigation);
  //           }
  //         });
  //       },
  //       (err) => console.log(err.message)
  //     );
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bedrooms</Text>
          <Text style={styles.text}>2 Bedrooms:Main Floor</Text>
          <Text style={styles.text}>1 Bedroom:Basement</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bathrooms</Text>
          <Text style={styles.text}>2 Bathrooms:Main Floor</Text>
          <Text style={styles.text}>1 Bathroom:Basement</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Space:Main interior</Text>
          <Text style={styles.text}>Sqft: 2000-2100</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Property Age</Text>
          <Text style={styles.text}>Age: 16 - 25</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Basement</Text>
          <Text style={styles.text}>Unifinished</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Basement Bedrooms</Text>
          <Text style={styles.text}>N/A</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>icon</Text>
          <Text>icon</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  textContainer: {
    flex: 2.5,
  },

  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 7,
  },

  text: {
    color: colors.SECONDARY_COLOR,
    marginBottom: 3,
  },
  iconContainer: {
    flexDirection: "row",
    flex: 0.9,
    justifyContent: "space-between",
  },
});
