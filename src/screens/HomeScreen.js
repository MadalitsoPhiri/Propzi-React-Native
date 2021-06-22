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
import { AuthContext } from "../components/providers/AuthProvider";
import { randomizeArray } from "../utils/helper";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Loader from "../components/Loader";
import HomeBankFinance from "../components/Cards/HomeBankFinance";
import { RecentSalesContext } from "../components/providers/RecentSaleProvider";
import { dbh } from "../../firebase";

const { width, height } = Dimensions.get("screen");
const cardIconHeight = height * 0.1;
const cardIconWidth = width * 0.3;
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
  const { recentSales } = useContext(RecentSalesContext);

  const property = Properties[0];
  const { communityData, isLoading } = useContext(CommunityDataContext);
  const { currentHomeCardIndex, setCurrentHomeCardIndex } =
    useContext(AuthContext);
  const communityDevelopments = randomizeArray(communityData.slice(0, 6));

  // console.log("The DEFAULT is :", defaultProperty);
  if (!isPropertyDataLoaded) {
    return <Loader text="" />;
  }

  React.useEffect(() => {
    console.log("+++++++++++++++++++++++++++++++++");
    console.log(recentSales);
    console.log("+++++++++++++++++++++++++++++++++");

    const communityList = [];

    dbh
      .collection("Communit")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach((doc) => {
            communityList.push(doc.data());
          });

          setCommunityDevelopments(randomizeArray(communityList.slice(0, 6)));
        }
      })
      .catch((error) => {
        // console.warn(error.message);
      });
  }, []);

  const moneyFormat = (price, sign = "$") => {
    const pieces = parseFloat(price).toFixed(2).split("");
    let ii = pieces.length - 3;
    while ((ii -= 3) > 0) {
      pieces.splice(ii, 0, ",");
    }
    return sign + pieces.join("");
  };

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
                {Properties[currentHomeCardIndex].repliers.address.unitNumber ==
                ""
                  ? `${Properties[currentHomeCardIndex].streetNumber} ${Properties[currentHomeCardIndex].streetName}, ${Properties[currentHomeCardIndex].neighbourhood}, ${Properties[currentHomeCardIndex].city}`
                  : `${Properties[currentHomeCardIndex].repliers.address.unitNumber}, ${Properties[currentHomeCardIndex].streetNumber} ${Properties[currentHomeCardIndex].streetName}, ${Properties[currentHomeCardIndex].neighbourhood}, ${Properties[currentHomeCardIndex].city}`}
              </Text>
            </View>
            <View style={{ marginRight: "2%" }}>
              <MaterialIcons name="chevron-right" size={35} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <HomeCard
          properties={Properties}
          navigation={navigation}
          addressSetter={setCurrentHomeCardIndex}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Report");
          }}
          style={styles.continueButton}
        >
          <Text
            style={{ color: "#fff", fontSize: 15, fontFamily: "Poppins-Bold" }}
          >
            See Your Propzi Report
          </Text>
        </TouchableOpacity>

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
        {recentSales.lenght !== 0 && (
          <FlatList
            data={randomizeArray(recentSales).slice(0, 1)}
            keyExtractor={(item) => item.mlsNumber}
            contentContainerStyle={{}}
            renderItem={({ item }) => {
              return (
                <GlobalCard
                  item={item}
                  imgUrl={`https://cdn.repliers.io/${item.images[0]}`}
                  from={`${item.address.neighborhood},${item.address.city}`}
                  desc={item.details.description}
                  title={`${item.address.streetNumber} ${item.address.streetName},  Unit ${item.address.unitNumber}`}
                  category={`Recent Sales`}
                  propziImpact={""}
                  soldPrice={moneyFormat(item.soldPrice)}
                  key={2}
                  projectURL={`recent sales`}
                />
              );
            }}
          />
        )}

        {communityDevelopments?.length > 0
          ? communityDevelopments?.map((communityDevelopment, i) => {
              if (
                communityDevelopment.city.toLowerCase() ==
                property.city.toLowerCase()
              ) {
                return (
                  <GlobalCard
                    imgUrl={
                      communityDevelopment.cardImage != ""
                        ? communityDevelopment.cardImage
                        : null
                    }
                    from={communityDevelopment.dataSource}
                    desc={communityDevelopment.description}
                    title={communityDevelopment.heading}
                    category={communityDevelopment.category}
                    propziImpact={communityDevelopment.propziImpact}
                    soldPrice=""
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

      <HomeBankFinance />
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
    fontFamily: "Poppins-Medium",
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
    fontFamily: "Poppins-Medium",
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
  continueButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#34D1B6",
    height: 50,
    width: width - 50,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 7,
    marginVertical: "5%",
  },
});
