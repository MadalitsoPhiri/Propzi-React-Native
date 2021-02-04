import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import HomeCard from "../components/HomeCard";
import Button from "../components/Button";
import SmallCard from "../components/SmallCard";
import { colors } from "../styles";
import tryImage from "../../assets/propzi-img/tryImg.jpg";

export default function Home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View>
          <View style={styles.todayContainer}>
            <Text style={styles.today}>Today</Text>
            <Text style={styles.date}>3 Feb 2021</Text>
            <Text style={styles.address}>Address</Text>
            <Text style={styles.actualAddress}>
              45,Briston,Hurontario,Pell,Mississauga
            </Text>
          </View>
          <HomeCard />
          <Button title={"See Your Report"} />
          <TouchableOpacity>
            <Text style={styles.learnMore}>
              Learn more about your propzi price
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.homeHeading}>From the marketplace</Text>
            <View style={styles.smallCardContainer}>
              <SmallCard
                color={colors.PRIMARY_COLOR}
                title={"Home Insurance"}
              />
              <SmallCard
                color={colors.WARNING_COLOR}
                title={"LandLord Insurance"}
              />
            </View>
          </View>

          <Card
            imgUrl={tryImage}
            from={"Town of Ajax"}
            desc={
              "Plans for a public Chocolate Fountain have been approved for 2022"
            }
            title={"Public Chocolate Fountain"}
            category={"Local Economics"}
            propziImpact={"$12.00"}
          />

          <Card
            imgUrl={tryImage}
            from={"Town of Ajax"}
            desc={
              "Plans for a public Chocolate Fountain have been approved for 2022"
            }
            title={"Public Chocolate Fountain"}
            category={"Local Economics"}
            propziImpact={"$12"}
          />
          <View style={styles.homeOffers}>
            <Text style={styles.homeHeading}>Your home finance offers</Text>
            <Text style={styles.homeSubHeading}>Advertiser Disclosure</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#999",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
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
    fontWeight: "100",
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
  },
  smallCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
