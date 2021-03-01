import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles";
import Button from "../Button";

export default function HomeFinanceOffersCard({ width }) {
  return (
    <View style={[styles.cardContainer, { width }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardHeader, { paddingLeft: 0 }]}>
          <Text style={{ marginRight: 15 }}>icon</Text>
          <Text style={styles.headerText}>Your approval odds are fair</Text>
        </View>

        <Text>icon</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.cardBody}>
        <View style={styles.cardBodyLeft}>
          <Text style={styles.cardBodyLeftTitle}>
            BMO Special Mortgage Rates
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term: 5 Years Fixed</Text>
            <Text>Special Rate: 2.5%</Text>
            <Text>APR: 4.0%</Text>
          </View>
        </View>
        <View style={styles.cardBodyRight}>
          <Text>icon</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Button
          title="Apply Now"
          borderRadius={50}
          width={"70%"}
          paddingVertical={10}
        />
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              color: colors.PRIMARY_COLOR,
              marginTop: 10,
            }}
          >
            See details, rates and fees
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 30,
    marginBottom: 60,
    paddingVertical: 20,
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: "white",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 3,
    borderRadius: 8,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderColor: colors.BORDER_COLOR,
    marginVertical: 15,
  },

  cardBody: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
  },

  cardBodyLeftTitle: {
    fontWeight: "700",
    width: "90%",
    marginBottom: 10,
  },

  headerText: {
    fontWeight: "200",
  },

  homeImg: {
    marginBottom: 10,
    width: "100%",
    marginTop: 16,
  },

  propziPrice: {
    fontSize: 26,
    fontWeight: "bold",
  },

  cardFooter: {
    marginTop: 20,
  },
});
