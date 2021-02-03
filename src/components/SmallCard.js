import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

// TODO:// Configure the title
export default function SmallCard({ image, color, title }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Image source={image} style={styles.image} />
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
    width: "48%",
  },
  image: {
    aspectRatio: 3 / 3,
    height: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop:0,
  },
});
