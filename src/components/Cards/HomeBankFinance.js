import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles";
import Button from "../Button";
import FinanceIcon from "../../../assets/FinanceHome.svg";
import { AntDesign } from "@expo/vector-icons";
import { Container, Header, Content, Tab, Tabs,ScrollableTab } from 'native-base';
export default function HomeFinanceOffersCard({
  width,
  title,
  term,
  specialRate,
  APR,
}) {
  return (
    <View  style={{marginTop:20}}>

 {/* style={[styles.cardContainer, { width }]} */}
        

        {/* </View> */}


        <Tabs  tabContainerStyle={{ borderBottomWidth: 0 }} tabDefaultBg={{backgroundColor:'black'}} tabBarUnderlineStyle={{ backgroundColor: 'none'}}  renderTabBar={()=> <ScrollableTab />}>
        <Tab       textStyle={{fontSize: 12, color: "white"}} activeTextStyle={{fontSize: 12, color: "white"}}  activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:50,width:100,height: 35,}} tabStyle={{backgroundColor: '#C4C4C4',borderRadius:50,height: 35,}} heading="TD">
            <View >
            <View style={{ flexDirection: "row",paddingHorizontal:16 }}>

<View  style={[styles.cardContainer, { width }]}>

            
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
      
</View>
</View>
      </View>
          </Tab>

          <Tab       textStyle={{fontSize: 12, color: "white"}} activeTextStyle={{fontSize: 12, color: "white"}}  activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:50,width:100,height: 35,}} tabStyle={{backgroundColor: '#C4C4C4',borderRadius:50,height: 35,}} heading="Scotiabank">
          <View >
<View style={{ flexDirection: "row",paddingHorizontal:16 }}>

          <View  style={[styles.cardContainer, { width }]}>
            
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
      </View>
      </View>
      </View>
          </Tab>
          <Tab       textStyle={{fontSize: 12, color: "white"}} activeTextStyle={{fontSize: 12, color: "white"}}  activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:50,width:100,height: 35,}} tabStyle={{backgroundColor: '#C4C4C4',borderRadius:50,height: 35,}} heading="BMO">
          <View >
<View style={{ flexDirection: "row",paddingHorizontal:16 }}>

          <View  style={[styles.cardContainer, { width }]}>
            
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
      </View>
      </View>
      </View>
          </Tab>
          <Tab       textStyle={{fontSize: 12, color: "white"}} activeTextStyle={{fontSize: 12, color: "white"}}  activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:50,width:100,height: 35,}} tabStyle={{backgroundColor: '#C4C4C4',borderRadius:50,height: 35,}} heading="CIBC">
          <View >
<View style={{ flexDirection: "row",paddingHorizontal:16 }}>

          <View  style={[styles.cardContainer, { width }]}>
            
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
      </View>
      </View>
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










// import React, { useState } from 'react';
// import { Container, Content, Text, Tabs, Tab, ScrollableTab  } from 'native-base';

// export const TabsExample = (props) => {
//   const [tabPage, setTabPage] = useState(0);

//   const onChangeTab = (changeTabProps) => {
// 		const newTabIndex = changeTabProps.i;
//     setTabPage(newTabIndex);
//   };

//   return (
//     <Container>
//       <Content>
//         <Tabs 
//         activeTabStyle={{backgroundColor:'red'}}
      
//           page={tabPage} 
//           onChangeTab={onChangeTab}
//         >
//           <Tab activeTextStyle={{color:'white'}}  activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:20,width:100,}} tabStyle={{backgroundColor: 'grey',borderRadius:20,width:100}} heading="Tab 1">
//             <Text>tab 1</Text>
//           </Tab>
//           <Tab activeTextStyle={{color:'white'}} activeTabStyle={{backgroundColor:'#35d1b9',borderRadius:20,width:100}}  tabStyle={{backgroundColor: 'grey',borderRadius:20,width:100}} heading="Tab 2">
//             <Text>tab 2</Text>
//           </Tab>
//         </Tabs>
//       </Content>
//     </Container>
//   )
// }





