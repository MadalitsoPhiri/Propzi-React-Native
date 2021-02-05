import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SearchInput from "../components/Input";
import { colors } from "../styles";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchHome() {
  return (
    <View style={{ marginTop: 30 }}>
      <SearchInput placeholder={"Search Address..."} searchIcon={<EvilIcons name="search" size={30} color={colors.BORDER_COLOR} />} />
    </View>
  );
}

const styles = StyleSheet.create({});
