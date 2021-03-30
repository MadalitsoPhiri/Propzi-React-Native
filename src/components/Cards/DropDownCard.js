import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { colors } from "../../styles";

export default function DropDownCard({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: colors.BORDER_COLOR,
    width: "100%",
    marginTop: 10,
    padding: 20,
    borderRadius: 7,
    alignItems: "center",
  },
});
