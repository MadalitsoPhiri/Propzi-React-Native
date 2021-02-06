import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SearchInput from "../components/Input";
import Button from "../components/Button";
import { colors, btnSize } from "../styles";
import { EvilIcons } from "@expo/vector-icons";

export default function NotFoundHome() {
  return (
    <View style={{ marginTop: 30 }}>
      <SearchInput placeholder={"Search Address..."} searchIcon={<EvilIcons name="search" size={30} color={colors.BORDER_COLOR} />} />
      <Text style={styles.title}>Home Details</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>MLS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>Upgrades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs}>
          <Text style={styles.text}>Propzi</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title, { fontSize: 26 }]}>
          Oops! We can't find your home
        </Text>

        <Text style={{ fontSize: 20, textAlign: "center" }}>
          If you're not able to find your home please continue below
        </Text>
      </View>
      <View>
        <Button
          title={"Add Your Home"}
          borderRadius={6}
          width={btnSize.MEDIUM_WIDTH}
          marginTop={20}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabs: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: colors.SECONDARY_COLOR,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 11,
    paddingHorizontal: 28,
    width: "100%",
    color: colors.WHITE_COLOR,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 40,
    fontWeight: "500",
  },
});
