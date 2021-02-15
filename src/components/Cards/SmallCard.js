import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
// const { height, width } = Dimensions.get(window);
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
            <Image style={styles.image} />
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
            <Image style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>Mortgages</Text>
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
    aspectRatio: 3 / 3,
    height: 60,
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
});
