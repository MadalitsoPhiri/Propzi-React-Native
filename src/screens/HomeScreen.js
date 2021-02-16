import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import GlobalCard from "../components/Cards/GlobalCard";
import HomeCard from "../components/Cards/HomeCard";
import Button from "../components/Button";
import SmallCard from "../components/Cards/SmallCard";
import { colors, btnSize } from "../styles";
import tryImage from "../../assets/propzi-img/tryImg.jpg";
import { AuthContext } from "../components/AuthProvider";

export default function HomeScreen({ navigation }) {
  const { homeState } = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <View style={styles.todayContainer}>
          <Text style={styles.today}>Today</Text>
          <Text style={styles.date}>
            {new Date().toUTCString().slice(5).slice(0, 11)}
          </Text>
          <Text style={styles.address}>Address</Text>
          <Text style={styles.actualAddress}>{homeState.address}</Text>
        </View>

        <HomeCard data={homeState.propertyData} />
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

        {homeState.communityData.length > 0
          ? homeState.communityData.map((communityData, i) => {
              return (
                <GlobalCard
                  imgUrl={tryImage}
                  from={communityData.dataSource}
                  desc={communityData.description}
                  title={communityData.heading}
                  category={communityData.category}
                  propziImpact={communityData.propziImpact}
                  key={i}
                  to={navigation}
                />
              );
            })
          : null}

        {/* <GlobalCard
          imgUrl={tryImage}
          from={"Town of Ajax"}
          desc={
            "Plans for a public Chocolate Fountain have been approved for 2022"
          }
          title={"Public Chocolate Fountain"}
          category={"Local Economics"}
          propziImpact={"$12"}
        /> */}

        {/* <View style={styles.homeOffers}>
          <Text style={styles.homeHeading}>Your home finance offers</Text>
          <Text style={styles.homeSubHeading}>Advertiser Disclosure</Text>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
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
    marginBottom: 400,
  },

  homeSubHeading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
  },
});