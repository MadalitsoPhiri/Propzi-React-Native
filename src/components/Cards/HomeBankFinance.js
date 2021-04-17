import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles";
import Button from "../Button";
import FinanceIcon from "../../../assets/FinanceHome.svg";
import { AntDesign } from "@expo/vector-icons";
import FinanceIcon from '../../../assets/FinanceHome.svg'
import { Tab, Tabs, TabHeading } from 'native-base';
export default function HomeFinanceOffersCard({
  width,
  title,
  term,
  specialRate,
  APR,
}) {
  return (
    <View style={[styles.cardContainer, { width }]}>

<View style={{ flexDirection: "row",paddingHorizontal:16 }}>
          
        

         
        </View>


        <Tabs>
          <Tab heading={ <TabHeading><View style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>TD</Text>
          </View></TabHeading>}>
          <View style={styles.cardHeader}>
        <View style={[styles.cardHeader, { paddingLeft: 0 }]}>
          <AntDesign
            name="warning"
            style={{ marginRight: 15 }}
            size={20}
            color="grey"
          />
          <Text style={styles.headerText}>Your approval odds are fair</Text>
        </View>

        <AntDesign name="warning" size={20} color="grey" />
      </View>
      <View style={styles.line}></View>
      <View style={styles.cardBody}>
        <View style={styles.cardBodyLeft}>
          <Text style={styles.cardBodyLeftTitle}>Special Mortgage Rates</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term: 5 Year Fixed</Text>
            <Text>Special Rate: 2.4%</Text>
            <Text>APR: 2.6%</Text>
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
          </Tab>

          <Tab heading={ <TabHeading>
            <View style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>Scotiabank</Text>
          </View>
          </TabHeading>}>
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
          <Text style={styles.cardBodyLeftTitle}>Scotiabank Special Mortgage Rates</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term:10 Year Fixed</Text>
            <Text>Special Rate:.8%</Text>
            <Text>APR:"3.0%</Text>
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
          </Tab>
          <Tab heading={ <TabHeading>
            <View style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>BMO</Text>
          </View>
          </TabHeading>}>
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
          <Text style={styles.cardBodyLeftTitle}>BMO Special Mortgage Rates</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term:5 Year Fixed</Text>
            <Text>Special Rate:2.4%</Text>
            <Text>APR:4.0%</Text>
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
          </Tab>
          <Tab heading={ <TabHeading>
            <View style={styles.pill}>
            <Text style={{ fontSize: 12, color: "white" }}>CIBC</Text>
          </View>
          </TabHeading>}>
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
          <Text style={styles.cardBodyLeftTitle}>CIBC Special Mortgage Rates</Text>
          <View style={{ alignItems: "center" }}>
            <Text>Term:8 Year Fixed</Text>
            <Text>Special Rate:2.4%</Text>
            <Text>APR:4.8%</Text>
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
          </Tab>
        </Tabs>
   
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
