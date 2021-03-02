import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles";
import Button from "../Button";
import FinanceIcon from '../../../assets/FinanceHome.svg'

export default function HomeFinanceOffersCard({ width, title, term, specialRate, APR }) {
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
          <Text style={styles.cardBodyLeftTitle}>{title}</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term: {term}</Text>
            <Text>Special Rate: {specialRate}</Text>
            <Text>APR: {APR}</Text>
          </View>
        </View>
        <View style={styles.cardBodyRight}>
          <FinanceIcon />
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Button
          title="Apply Now"
          borderRadius={50}
          width={"75%"}
          paddingVertical={9}
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
    shadowOffset: { width: 0, height: 0 },
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

  cardBodyRight: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBodyLeft: {
    width: "45%",
  },

  cardBodyLeftTitle: {
    fontWeight: "700",
    width: "90%",
    marginBottom: 10,
    fontSize: 15,
  },

  headerText: {
    fontWeight: "200",
  },

  cardFooter: {
    marginTop: 20,
  },
});
