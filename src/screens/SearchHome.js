import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SearchInput from "../components/Input";
import { colors } from "../styles";

export default function SearchHome() {
  return (
    <View style={{ marginTop: 30 }}>
      <SearchInput />
    </View>
  );
}

const styles = StyleSheet.create({});
