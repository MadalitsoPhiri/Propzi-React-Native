import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ManualAddHome() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Unit/Suite</Text>
          <Input width={"90%"} placeholder={"904"} />
        </View>
        <View style={{ marginLeft: 10, flex: 2 }}>
          <Text style={styles.title}>Street Address</Text>
          <Input width={"100%"} placeholder={"90 Stadium"} />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>City</Text>
          <Input width={"90%"} placeholder={"Toronto"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Postal Code</Text>
          <Input width={"100%"} placeholder={"L5V 1J1"} />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Building Type</Text>
          <Input width={"90%"} placeholder={"Townhouse"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Appx. Sqft</Text>
          <Input width={"100%"} placeholder={"1800"} />
        </View>
      </View>

      <Text style={styles.formTitle}>Upper Floors</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Bedrooms</Text>
          <Input width={"80%"} placeholder={"2"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Den</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.PRIMARY_COLOR}
              />
            }
          />
        </View>
        <View style={{ flex: 2, marginLeft: 20 }}>
          <Text style={styles.title}>Bathrooms</Text>
          <Input width={"80%"} placeholder={"3"} />
        </View>
        <View style={{ flex: 1 }}>
          {/* Checkbox  */}
          <Text style={styles.title}>+1</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.PRIMARY_COLOR}
              />
            }
          />
        </View>
      </View>

      <Text style={styles.formTitle}>Kitchen</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Countertops Style</Text>
          <Input width={"90%"} placeholder={"904"} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Island</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.PRIMARY_COLOR}
              />
            }
          />
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.title}>Condition</Text>
          <Input width={"100%"} placeholder={"8/10"} />
        </View>
      </View>

      <Text style={styles.formTitle}>Kitchen Appliances</Text>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Stove</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.PRIMARY_COLOR}
              />
            }
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Fridge</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.SECONDARY_COLOR}
              />
            }
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Dishwasher</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.SECONDARY_COLOR}
              />
            }
          />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Microwave</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.SECONDARY_COLOR}
              />
            }
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Stove Type</Text>
          <Input width={"100%"} placeholder={"Electrical"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Appx. Sqft</Text>
          <Input width={"100%"} placeholder={"Stainless Steel"} />
        </View>
      </View>

      <Text style={styles.formTitle}>Basement</Text>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Status</Text>
          <Input width={"100%"} placeholder={"Finished"} />
        </View>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Bedrooms</Text>
          <Input width={"100%"} placeholder={"2"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Bathrooms</Text>
          <Input width={"100%"} placeholder={"1"} />
        </View>
      </View>

      <Text style={styles.formTitle}>Garage</Text>
      <View style={{ flexDirection: "row", flex: 1, marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Door Type</Text>
          <Input width={"100%"} placeholder={"Finished"} />
        </View>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title}>Attached</Text>
          <Checkbox
            width={"100%"}
            Icon={
              <FontAwesome5
                name="check"
                size={24}
                color={colors.SECONDARY_COLOR}
              />
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Condition</Text>
          <Input width={"100%"} placeholder={"8/10"} />
        </View>
      </View>

      <View style={styles.formHeaderContainer}>
        <Text style={styles.formHeader}>Have you done any upgrades?</Text>
        <Text style={styles.formSubtext}>
          Choose renovations that you done in your home since you moved in
        </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <Button title={"New Roof"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Hardwood Floors"} borderRadius={40} />
            </View>
            <Button title={"Exteriors"} borderRadius={40} />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Button title={"Swimming Pool"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Interior Paint"} borderRadius={40} />
            </View>
            <Button title={"Landscaping"} borderRadius={40} />
          </View>

          <View style={{ flexDirection: "row", margin: 20 }}>
            <Button title={"Driveway Interlocking"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Front Lawn"} borderRadius={40} />
            </View>
            <Button title={"Bathroom Tiles"} borderRadius={40} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.formHeaderContainer}>
        <Text style={styles.formHeader}>What makes your unique?</Text>
        <Text style={styles.formSubtext}>
          Choose details about your home that best describe your home
        </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <Button title={"New Roof"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Always Sunny"} borderRadius={40} />
            </View>
            <Button title={"Closure"} borderRadius={40} />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Button title={"Swimming Pool"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Hot Tub"} borderRadius={40} />
            </View>
            <Button title={"Close to Church"} borderRadius={40} />
          </View>

          <View style={{ flexDirection: "row", margin: 20 }}>
            <Button title={"Driveway Interlocking"} borderRadius={40} />
            <View style={{ marginHorizontal: 10 }}>
              <Button title={"Front Lawn"} borderRadius={40} />
            </View>
            <Button title={"Bathroom Tiles"} borderRadius={40} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.formHeaderContainer}>
        <Text style={styles.formHeader}>Get another opinion from propzi</Text>
        <Text style={styles.formSubtext}>
          Get a professional assessment from our team of propzi home surveyors.
        </Text>
        <Text style={[styles.formSubtext, { marginBottom: 25 }]}>
          Your first visit is free!
        </Text>
        <Button
          title={"Book a Propzi Visit"}
          borderRadius={5}
          width={btnSize.MEDIUM_WIDTH}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
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
