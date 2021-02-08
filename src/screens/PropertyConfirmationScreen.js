import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../components/Button";
import { colors } from "../styles";
import { dbh } from "../../firebase";

export default function PropertyConfirmationScreen({ data, navigation }) {
  const dataToSave = {
    bedrooms: data.details.numBedrooms,
    bathrooms: data.details.numBathrooms,
    squareFeet: data.details.sqft,
    propertyType: data.details.propertyType,
    propertyClass: data.class,
    area: data.address.area,
    city: data.address.city,
    cmaPrice: "",
    neighbourhood: data.address.neighborhood,
    streetName: data.address.streetName,
    streetNumber: data.address.streetNumber,
    unitNumber: data.address.unitNumber,
  };

  const handleOnAddHomePress = (e) => {
    dbh
      .collection("UserDetails")
      .doc("CYDX76NnRLZgJhEoi32ves0roAF3")
      .collection("Property")
      .add(dataToSave)
      .then(
        (info) => {
          info.get().then((ds) => {
            if (ds.data()) {
              // navigation.navigate("Home");
              console.warn(navigation);
            }
          });
        },
        (err) => console.log(err.message)
      );
  };

  return (
    <ScrollView>
      <View>
        <Text>Bedrooms:{data.details.numBedrooms}</Text>
        <Text>Bathrooms:{data.details.numBathrooms}</Text>
        <Text>Sqft:{data.details.sqft}</Text>
        <Text>PropertyType:{data.propertyType}</Text>
        <Text>Area:{data.address.area}</Text>
        <Text>City:{data.address.city}</Text>
        <Text>CmaPrice: </Text>
        <Text>Neighbourhood:{data.address.neighborhood}</Text>
        <Text>StreetName:{data.address.streetName}</Text>
        <Text>StreetNumber:{data.address.streetNumber}</Text>
        <Text>Unit Number:{data.address.unitNumber}</Text>
      </View>

      <View>
        <Button
          title={"Add Home"}
          marginTop={30}
          borderRadius={9}
          onPress={handleOnAddHomePress}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});
