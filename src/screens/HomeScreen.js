import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import GlobalCard from "../components/Cards/GlobalCard";
import HomeCard from "../components/Cards/HomeCard";
import Button from "../components/Button";
import SmallCard from "../components/Cards/SmallCard";
import { colors, btnSize } from "../styles";
import tryImage from "../../assets/propzi-img/tryImg.jpg";
import { AuthContext } from "../components/providers/AuthProvider";
import { PropertyDataContext } from "../components/providers/PropertyDataProvider";
import Loader from '../components/Loader'
import HomeBankFinance from "../components/Cards/HomeBankFinance";


export default function HomeScreen({ navigation }) {
  const { homeState } = useContext(AuthContext);
  const { isPropertyDataLoaded, property } = useContext(PropertyDataContext);

  if (!isPropertyDataLoaded) {
    return <Loader />;
  }
  console.log(property);
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
          <Pressable onPress={() => navigation.navigate("manual")}>
            <Text
              style={{ alignSelf: "flex-end", borderWidth: 1, padding: 10 }}
            >
              Add property
            </Text>
          </Pressable>
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
        
        <HomeBankFinance />
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
    marginBottom: 400,
  },

  homeSubHeading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
  },
});
