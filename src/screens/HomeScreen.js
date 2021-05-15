import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import GlobalCard from "../components/Cards/GlobalCard";
import HomeCard from "../components/Cards/HomeCard";
import Button from "../components/Button";
import SmallCard from "../components/Cards/SmallCard";
import { colors, btnSize } from "../styles";
import { PropertyDataContext } from "../components/providers/PropertyDataProvider";
import { CommunityDataContext } from "../components/providers/CommunityDataProvider";
import { randomizeArray } from "../utils/helper";
import { Entypo,MaterialIcons } from "@expo/vector-icons";
import Loader from "../components/Loader";
import HomeBankFinance from "../components/Cards/HomeBankFinance";
const { width,height} = Dimensions.get("screen");
const cardIconHeight = height * 0.1
const cardIconWidth = width * 0.3
export default function HomeScreen({ navigation }) {
  const {
    isPropertyDataLoaded,
    Properties,
    setProperties,
    defaultProperty,
    setdefaultHome,
    setFocusedProperty,
    focusedProperty,
  } = useContext(PropertyDataContext);
  const property = Properties[0];
  const { communityData, isLoading } = useContext(CommunityDataContext);
  const communityDevelopments = randomizeArray(communityData.slice(0, 6));
  console.log("The DEFAULT is :",defaultProperty)
  if (!isPropertyDataLoaded) {
    return <Loader text="" />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <View style={styles.todayContainer}>
          <Text style={styles.today}>Today</Text>
          <Text style={styles.date}>
            {new Date().toUTCString().slice(5).slice(0, 11)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("changeDefault", { list: [...Properties] });
            }}
            style={styles.addressContainer}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.address}>Address</Text>
              <Text style={styles.actualAddress}>
                {focusedProperty.repliers.address.unitNumber == ""
                  ? `${focusedProperty.streetNumber} ${focusedProperty.streetName}, ${focusedProperty.neighbourhood}, ${focusedProperty.city}`
                  : `${focusedProperty.repliers.address.unitNumber}, ${focusedProperty.streetNumber} ${focusedProperty.streetName}, ${focusedProperty.neighbourhood}, ${focusedProperty.city}`}
              </Text>
            </View>
            <View style={{marginRight:"2%"}}>
              <MaterialIcons name="chevron-right" size={35} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <HomeCard properties={Properties} navigation={navigation}  />

        <Button
          title={"See Your Propzi Report"}
          width={btnSize.LARGE_WIDTH}
          borderRadius={50}
          onPress={() => navigation.navigate("Report")}
        />

        <TouchableOpacity>
          <Text style={styles.learnMore}>
            Learn more about your propzi price
          </Text>
        </TouchableOpacity>

        <Text style={styles.homeHeading}>From the marketplace</Text>

        <View style={styles.smallCardContainer}>
          <SmallCard />
        </View>
        {isLoading && <Loader />}
        {communityDevelopments?.length > 0
          ? communityDevelopments?.map((communityDevelopment, i) => {
              if (
                communityDevelopment.city.toLowerCase() ==
                property.city.toLowerCase()
              ) {
                return (
                  <GlobalCard
                    imgUrl={
                      communityDevelopment.img != ""
                        ? communityDevelopment.img
                        : null
                    }
                    from={communityDevelopment.dataSource}
                    desc={communityDevelopment.description}
                    title={communityDevelopment.heading}
                    category={communityDevelopment.category}
                    propziImpact={communityDevelopment.propziImpact}
                    key={i}
                    projectURL={communityDevelopment.projectUrl}
                  />
                );
              }
            })
          : null}
      </View>

      
        <Text style={styles.homeHeading}>Your home offers</Text>
        <Text style={styles.homeSubHeading}>Advertiser Disclosure</Text>

       
<HomeBankFinance/>

       
   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  todayContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  today: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  date: {
    fontSize: 17,
    marginTop: 5,
    fontFamily: "Poppins-Medium",
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  actualAddress: {
    fontWeight: "300",
    fontFamily: "Poppins-Medium",
    color: "gray",
  },
  learnMore: {
    textAlign: "center",
    marginVertical: 20,
    color: colors.PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },

  homeHeading: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 30,
    paddingHorizontal: 16,
    fontFamily: "Poppins-Bold",
  },

  smallCardContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },

  

  homeSubHeading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
    paddingHorizontal: 16,
    fontFamily:"Poppins-Medium"
  },

  homeOffers: {
    flex: 1,
    paddingHorizontal: 16,
  },

  pill: {
    flex: 1,
    height: 30,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: "1%",
    marginTop: "5%",
    paddingHorizontal: 8,
  },
  addressContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "rgba(158, 150, 158, .5)",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
  },
});
