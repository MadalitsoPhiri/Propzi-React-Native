import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
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

import Loader from "../components/Loader";
import HomeBankFinance from "../components/Cards/HomeBankFinance";
const { width } = Dimensions.get("screen");

export default function HomeScreen({ navigation }) {
  const { isPropertyDataLoaded, property } = useContext(PropertyDataContext);
  const { communityData, isLoading } = useContext(CommunityDataContext);
  const communityDevelopments = randomizeArray(communityData.slice(0, 6));

  if (!isPropertyDataLoaded) {
    return <Loader text="" />;
  }

  const HomeBankOffersCardData = [
    {
      id: "1",
      title: "Special Mortgage Rates",
      term: "5 Year Fixed",
      specialRate: "2.4%",
      APR: "2.6%",
    },
    {
      id: "2",
      title: "Scotiabank Special Mortgage Rates",
      term: "10 Year Fixed",
      specialRate: ".8%",
      APR: "3.0%",
    },
    {
      id: "3",
      title: "BMO Special Mortgage Rates",
      term: "5 Year Fixed",
      specialRate: "2.4%",
      APR: "4.0%",
    },
    {
      id: "4",
      title: "CIBC Special Mortgage Rates",
      term: "8 Year Fixed",
      specialRate: "2.4%",
      APR: "4.8%",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <View style={styles.todayContainer}>
          <Text style={styles.today}>Today</Text>
          <Text style={styles.date}>
            {new Date().toUTCString().slice(5).slice(0, 11)}
          </Text>
          <Text style={styles.address}>Address</Text>
          <Text
            style={styles.actualAddress}
          >{`${property.streetNumber} ${property.streetName}, ${property.neighbourhood},${property.city}`}</Text>
          {/* <Pressable onPress={() => navigation.navigate("manual")}>
            <Text
              style={{ alignSelf: "flex-end", borderWidth: 1, padding: 10 }}
            >
              Add property
            </Text>
          </Pressable> */}
        </View>

        <HomeCard data={property} />
        {/* {console.warn(homeState.address)} */}
        <Button
          title={"See Your Report"}
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
                    to={navigation}
                  />
                );
              }
            })
          : null}
      </View>

      <View style={styles.homeOffers}>
        <Text style={styles.homeHeading}>Your home finance offers</Text>
        <Text style={styles.homeSubHeading}>Advertiser Disclosure</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>TD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>Scotiabank</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>BMO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>CIBC</Text>
          </TouchableOpacity>
        </View>

        <>
          <FlatList
            horizontal
            pagingEnabled
            bounces={false}
            data={HomeBankOffersCardData}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 4 }}>
                <HomeBankFinance
                  title={item.title}
                  term={item.term}
                  specialRate={item.specialRate}
                  APR={item.APR}
                  key={item.id}
                  width={width - 40}
                />
              </View>
            )}
          />
        </>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  todayContainer: {
    marginTop: 20,
  },
  today: {
    fontSize: 36,
    fontWeight: "bold",
  },
  date: {
    fontSize: 17,
    marginTop: 5,
  },
  address: {
    marginTop: 10,
    fontSize: 16,
  },
  actualAddress: {
    fontWeight: "300",
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
  },

  smallCardContainer: {
    marginTop: 24,
  },

  homeOffers: {
    // marginBottom: 400,
  },

  homeSubHeading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
  },

  homeOffers: {
    flex: 1,
  },

  pill: {
    flex: 1,
    height: 35,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: "1%",
    marginTop: "5%",
    paddingHorizontal: 10,
  },
});
