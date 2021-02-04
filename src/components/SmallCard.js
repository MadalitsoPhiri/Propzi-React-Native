import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity,Platform } from "react-native";

// TODO:// Configure the title
export default function SmallCard({ image, color, title }) {
  return (
    <View>
      <TouchableOpacity style={[styles.container, { backgroundColor: color }]}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    height: 85,
    width: Platform.OS =='ios'? 160:177,
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
