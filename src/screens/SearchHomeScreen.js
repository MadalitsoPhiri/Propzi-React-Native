import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

import DropDownCard from "../components/Cards/DropDownCard";
import SearchInput from "../components/Input";

import { colors } from "../styles";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchHome({ nagivation }) {
  const [state, setState] = useState("");
  const [address, setAddress] = useState([]);
  console.warn(nagivation);
  const APK_KEY = "live_sk_dRCPsWquUqHFmErbqbFd7f";
  const END_POINT = `https://api.postgrid.com/v1/addver/completions?partialStreet=${state}&countryFilter=CA`;

  const OPTIONS = {
    method: "GET",
    headers: {
      "x-api-key": APK_KEY,
    },
  };

  const REPLIERS_OPTIONS = {
    method: "GET",
    headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
  };

  const handleChange = (e) => {
    setState(e);
  };

  // TODO://Query repliers
  const handlePress = async (e) => {
    let data;
    const postGridAddress = e._dispatchInstances.memoizedProps.children[0].props.children.props.children.toLowerCase();
    const streetName = postGridAddress.split(" ");
    const streetNumber = postGridAddress.split(" ");

    const REPLIERS_ENDPOINT_WITHOUT_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName[1]}&streetNumber=${streetNumber[0]}`;

    const REPLIERS_ENDPOINT_WITH_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName[1]}&streetNumber=${streetNumber[0]}&status=U`;

    const ACHEIVED_LISTING_URL = `https://api.repliers.io/listings/archived/?streetName=${streetName[1]}&streetNumber=${streetNumber[0]}`;

    // Search for regular data
    try {
      const address = await fetch(
        REPLIERS_ENDPOINT_WITH_STATUS_U,
        REPLIERS_OPTIONS
      );

      const response = await address.json();
      data = response;
      console.log(data.listings.length);

      if (data.listings.length == 0) {
        const address = await fetch(
          REPLIERS_ENDPOINT_WITHOUT_STATUS_U,
          REPLIERS_OPTIONS
        );

        const response = await address.json();
        data = response;
        console.log(data.listings.length, "000");
      } else if (data.listings.length == 0) {
        const address = await fetch(ACHEIVED_LISTING_URL, REPLIERS_OPTIONS);

        const response = await address.json();
        data = response;
      }
    } catch (error) {
      console.warn(error.message);
    }

    return data;
  };

  useEffect(() => {
    const fetchStreet = async () => {
      const address = await fetch(END_POINT, OPTIONS);
      const response = await address.json();
      const data = response;
      setAddress(data.data);
    };
    fetchStreet();
  }, [END_POINT]);

  const renderItem = ({ item }) => (
    <DropDownCard title={item.preview.address} onPress={handlePress} />
  );

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={handleChange}
        value={state}
        placeholder={"Search Address..."}
        searchIcon={
          <EvilIcons name="search" size={30} color={colors.BORDER_COLOR} />
        }
      />
      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingHorizontal: 20 },
});
