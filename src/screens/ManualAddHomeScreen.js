import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";
import { dbh, firebase } from "../../firebase";
import { CheckFalse, CheckTrue } from "../../assets/CheckIcon";
import { ActivityIndicator } from "react-native-paper";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#46D0B6" />
    </View>
  );
};

export default function ManualAddHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState("");
  const [streetName, setstreetName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [buildingType, setbuildingType] = useState("");
  const [sqft, setSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [den, setDen] = useState(false);
  const [bathrooms, setBathrooms] = useState("");
  const [counterTop, setCounterTop] = useState("");
  const [kitchenCondition, setKitchenCondition] = useState("");
  const [condition, setCondition] = useState("");
  const [stove, setStove] = useState(false);
  const [island, setIsland] = useState(false);
  const [fridge, setFridge] = useState("");
  const [dishwasher, setDishwasher] = useState("");
  const [microwave, setMicrowave] = useState("");
  const [stoveType, setStoveType] = useState("");
  const [status, setStatus] = useState("");
  const [basementBathroom, setbasementBathroom] = useState("");
  const [basementBedroom, setbasementBedroom] = useState("");
  const [doorType, setDoorType] = useState("");
  const [attached, setAttached] = useState(false);
  const [garageCondition, setGarageCondition] = useState("");

  let propertyData = {
    unit,
    streetName,
    city,
    postalCode,
    den,
    island,
    microwave,
    stove,
    fridge,
    dishwasher,
    attached,
    bedrooms,
    bathrooms,
    stoveType,
    sqft,
    buildingType,
    kitchenCondition,
    status,
    basementBathroom,
    basementBedroom,
    doorType,
    garageCondition,
    counterTop,
  };

  const handleUnitTextChange = (e) => {
    setUnit(e);
  };

  const handleStoveTypeTextChange = (e) => {
    setStoveType(e);
  };

  const handleConditionTextChange = (e) => {
    setCondition(e);
  };

  const handleStatusTextChange = (e) => {
    setStatus(e);
  };

  const handleBuildingTypeTextChange = (e) => {
    setbuildingType(e);
  };

  const handleBedroomsTextChange = (e) => {
    setBedrooms(e);
  };

  const handleSqftTextChange = (e) => {
    setSqft(e);
  };

  const handleBathroomTextChange = (e) => {
    setBathrooms(e);
  };

  const handleCounterTopTextChange = (e) => {
    setCounterTop(e);
  };

  const handleKitchenConditionTextChange = (e) => {
    setKitchenCondition(e);
  };

  const handleBasementBathroomTextChange = (e) => {
    setbasementBathroom(e);
  };

  const handleBasementBedroomTextChange = (e) => {
    setbasementBedroom(e);
  };

  const handleDoorTypeTextChange = (e) => {
    setDoorType(e);
  };

  const handleGarageConditionTextChange = (e) => {
    setGarageCondition(e);
  };

  const handleStreetNameTextChange = (e) => {
    setstreetName(e);
  };
  const handleCityTextChange = (e) => {
    setCity(e);
  };
  const handlePostalCodeTextChange = (e) => {
    setpostalCode(e);
  };
  const handleDenOnPress = () => {
    setDen((prevState) => !prevState);
  };
  const handleIslandOnPress = () => {
    setIsland((prevState) => !prevState);
  };
  const handleStoveOnPress = () => {
    setStove((prevState) => !prevState);
  };
  const handleFridgeOnPress = () => {
    setFridge((prevState) => !prevState);
  };
  const handleDishWasherOnPress = () => {
    setDishwasher((prevState) => !prevState);
  };
  const handleMicrowavenPress = () => {
    setMicrowave((prevState) => !prevState);
  };
  const handleAttachedOnPress = () => {
    setAttached((prevState) => !prevState);
  };

  const submitProperty = () => {
    setIsLoading(true);
    dbh
      .collection("UserDetails")
      .doc(firebase.auth().currentUser.uid)
      .collection("Property")
      .add(propertyData)
      .then((data) => {
        if (data.id) {
          alert("Property added successfully");
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Unit/Suite</Text>
          <Input
            width={"90%"}
            placeholder={"904"}
            onChangeText={handleUnitTextChange}
            value={unit}
          />
        </View>
        <View style={{ marginLeft: 10, flex: 2 }}>
          <Text style={styles.title}>Street Address</Text>
          <Input
            width={"100%"}
            placeholder={"90 Stadium"}
            onChangeText={handleStreetNameTextChange}
            value={streetName}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>City</Text>
          <Input
            width={"90%"}
            placeholder={"Toronto"}
            onChangeText={handleCityTextChange}
            value={city}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Postal Code</Text>
          <Input
            width={"100%"}
            placeholder={"L5V 1J1"}
            onChangeText={handlePostalCodeTextChange}
            value={postalCode}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Building Type</Text>
          <Input
            width={"90%"}
            placeholder={"Townhouse"}
            onChangeText={handleBuildingTypeTextChange}
            value={buildingType}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Appx. Sqft</Text>
          <Input
            width={"100%"}
            placeholder={"1800"}
            onChangeText={handleSqftTextChange}
            value={sqft}
          />
        </View>
      </View>

      <Text style={styles.formTitle}>Upper Floors</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Bedrooms</Text>
          <Input
            width={"80%"}
            placeholder={"2"}
            onChangeText={handleBedroomsTextChange}
            value={bedrooms}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Den</Text>
          <Checkbox
            width={"100%"}
            Icon={den ? <CheckTrue /> : <CheckFalse />}
            onPress={handleDenOnPress}
          />
        </View>
        <View style={{ flex: 2, marginLeft: 20 }}>
          <Text style={styles.title}>Bathrooms</Text>
          <Input
            width={"80%"}
            placeholder={"3"}
            onChangeText={handleBathroomTextChange}
            value={bathrooms}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>+1</Text>
          <Checkbox width={"100%"} Icon={<CheckFalse />} />
        </View>
      </View>

      <Text style={styles.formTitle}>Kitchen</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Countertops Style</Text>
          <Input
            width={"90%"}
            placeholder={"904"}
            onChangeText={handleCounterTopTextChange}
            value={counterTop}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Island</Text>
          <Checkbox
            width={"100%"}
            Icon={island ? <CheckTrue /> : <CheckFalse />}
            onPress={handleIslandOnPress}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.title}>Condition</Text>
          <Input
            width={"100%"}
            placeholder={"8/10"}
            onChangeText={handleKitchenConditionTextChange}
            value={kitchenCondition}
          />
        </View>
      </View>

      <Text style={styles.formTitle}>Kitchen Appliances</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Stove</Text>
          <Checkbox
            width={"100%"}
            Icon={stove ? <CheckTrue /> : <CheckFalse />}
            onPress={handleStoveOnPress}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Fridge</Text>
          <Checkbox
            width={"100%"}
            Icon={fridge ? <CheckTrue /> : <CheckFalse />}
            onPress={handleFridgeOnPress}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Dishwasher</Text>
          <Checkbox
            width={"100%"}
            Icon={dishwasher ? <CheckTrue /> : <CheckFalse />}
            onPress={handleDishWasherOnPress}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Microwave</Text>
          <Checkbox
            width={"100%"}
            Icon={microwave ? <CheckTrue /> : <CheckFalse />}
            onPress={handleMicrowavenPress}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Stove Type</Text>
          <Input
            width={"100%"}
            placeholder={"Electrical"}
            onChangeText={handleStoveTypeTextChange}
            value={stoveType}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Appx. Sqft</Text>
          <Input
            width={"100%"}
            placeholder={"Stainless Steel"}
            value={sqft}
            // onChangeText={handleTextChange}
          />
        </View>
      </View>

      <Text style={styles.formTitle}>Basement</Text>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Status</Text>
          <Input
            width={"100%"}
            placeholder={"Finished"}
            onChangeText={handleStatusTextChange}
            value={status}
          />
        </View>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Bedrooms</Text>
          <Input
            width={"100%"}
            placeholder={"2"}
            onChangeText={handleBasementBedroomTextChange}
            value={basementBedroom}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Bathrooms</Text>
          <Input
            width={"100%"}
            placeholder={"1"}
            onChangeText={handleBasementBathroomTextChange}
            value={basementBathroom}
          />
        </View>
      </View>

      <Text style={styles.formTitle}>Garage</Text>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Door Type</Text>
          <Input
            width={"100%"}
            placeholder={"Finished"}
            onChangeText={handleDoorTypeTextChange}
            value={doorType}
          />
        </View>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Attached</Text>
          <Checkbox
            width={"100%"}
            Icon={attached ? <CheckTrue /> : <CheckFalse />}
            onPress={handleAttachedOnPress}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Condition</Text>
          <Input
            width={"100%"}
            placeholder={"8/10"}
            onChangeText={handleConditionTextChange}
            value={condition}
          />
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          title={"Add Property"}
          borderRadius={5}
          width={btnSize.LARGE_WIDTH}
          marginTop={30}
          onPress={submitProperty}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "500",
  },

  formTitle: {
    marginTop: 12,
    fontSize: 18,
    color: colors.SECONDARY_COLOR,
  },

  formHeaderContainer: {
    alignItems: "center",
    marginVertical: 25,
  },

  formHeader: {
    fontWeight: "500",
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    marginVertical: 25,
  },

  formSubtext: {
    fontWeight: "300",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    lineHeight: 30,
  },
});
