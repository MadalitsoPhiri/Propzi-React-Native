import React, { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import { dbh } from "../../firebase/index";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Calendar } from "react-native-calendars";
import Loader from "../components/Loader";
import ReportRectangleCard from "../components/Cards/ReportRectangleCard";
import ReportRectangleCollapse from "../components/Cards/ReportRectangleCollapse";
import ReportCard from "../components/Cards/ReportCard";
import { colors } from "../styles";

export const AuthContext = React.createContext({});
const { width, height } = Dimensions.get("window");
const arrowOne = require("../../assets/icons/right1.png");
const arrowTwo = require("../../assets/icons/right2.png");
const arrowThree = require("../../assets/icons/right3.png");
const dropDownIconOne = require("../../assets/icons/down1.png");
const dropDownIconTwo = require("../../assets/icons/down2.png");
const dropDownIconThree = require("../../assets/icons/down3.png");

const mocks = [];

let startDate = "";

const ReportScreen = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  const [shouldShow3, setShouldShow3] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [NoDateSelected, nowSelected] = useState(true);
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");
  const [dateSelected, setDate] = useState(false);
  const [dateSelected1, setDate1] = useState(false);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const [userProperties, setProperties] = useState([]);
  const [community, setCommunities] = useState([]);

  useEffect(() => {
    const subscriber = dbh
      .collection("Economics/Country/EconomicIndicator")
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber1 = dbh
      .collection("Economics/Toronto/EconomicIndicator")
      .onSnapshot((querySnapshot) => {
        const users1 = [];

        querySnapshot.forEach((documentSnapshot) => {
          users1.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        //setUsers(users =>[...users, users1]);
        setUsers((users) => users.concat(users1));
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber1();
  }, []);

  useEffect(() => {
    const userData1 = dbh
      .collection("UserDetails/26P9zBdu34c5UvE2OffJkRSIkgZ2/Property")
      .onSnapshot((querySnapshot) => {
        let userData2 = "";

        querySnapshot.forEach((documentSnapshot) => {
          let b = documentSnapshot.data();
          let street = b.streetName;
          let streetNumber = b.streetNumber;
          let address = streetNumber + " " + street;
          userData2 = address;
        });

        setUserData(userData2);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => userData1();
  }, []);
  useEffect(() => {
    const userProperty1 = dbh
      .collection("UserDetails/26P9zBdu34c5UvE2OffJkRSIkgZ2/Property")
      .onSnapshot((querySnapshot) => {
        let userProperty2 = [];

        querySnapshot.forEach((documentSnapshot) => {
          userProperty2.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setProperties(userProperty2);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => userProperty1();
  }, []);
  useEffect(() => {
    const community1 = dbh
      .collection("Community/Ajax/Carruthers Creek")
      .onSnapshot((querySnapshot) => {
        const communities2 = [];

        querySnapshot.forEach((documentSnapshot) => {
          communities2.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCommunities(communities2);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => community1();
  }, []);

  const onDayPress = (day) => {
    setSelected(day.dateString);
    setDate(!dateSelected);
    startDate = day.dateString;
    console.log("start date:" + startDate);
  };
  const { destinations } = mocks;
  let dateOne = "2021-02-14";
  let dateTwo = "2021-02-18";

  if (loading) {
    return <Loader />;
  }

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [900000, 912000, 913000, 917000, 916000, 921000];
  const data1 = [892000, 902000, 907000, 915000, 912000, 918000];

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
        bounces={false}
      >
        <View style={styles.root}>
          {/* Address and Arrow */}
          <View style={styles.topSection}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{"45 Bristol Rd, Mississauga"}</Text>
              <Text style={styles.stitle}>Last Updated at 12/28/2020.</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Pressable onPress={() => setModalVisible(false)}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    marginTop: 10,
                    backgroundColor: "#f6f6f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {modalVisible ? (
                    <View>
                      <Image
                        source={require("../../assets/icons/up1.png")}
                        style={{ width: 25, height: 25 }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        source={require("../../assets/icons/down1.png")}
                        style={{ width: 25, height: 25 }}
                      />
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>

          {/* Modal */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {modalVisible ? (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ height: 300, width }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text
                      style={[styles.name, { marginTop: 5, marginBottom: 5 }]}
                    >
                      Select Property
                    </Text>
                    <FlatList
                      data={userProperties}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            height: 50,
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>
                              {item.streetNumber} {item.streetName}
                            </Text>
                          </Pressable>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
          </View>

          {/* Propzi heading and Date picker plus date select logic */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingStart: 20,
              paddingEnd: 20,
              paddingTop: 20,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Propzi Price
            </Text>
            <TouchableOpacity
              style={{ alignContent: "flex-end" }}
              onPress={() => setShouldShow3(!shouldShow3)}
            >
              <View
                style={{ height: 30, width: 88, backgroundColor: "#f2f2f2" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingStart: 15,
                    paddingEnd: 15,
                    paddingTop: 7,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#000", paddingLeft: 0 }}>
                    Date
                  </Text>
                  {shouldShow3 ? (
                    <Image
                      source={require("../../assets/icons/6.png")}
                      style={{
                        width: 10,
                        height: 10,
                        alignSelf: "center",
                        marginTop: -2,
                        paddingLeft: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/icons/5.png")}
                      style={{
                        width: 10,
                        height: 10,
                        alignSelf: "center",
                        marginTop: -2,
                        paddingLeft: 10,
                      }}
                    />
                  )}

                  {/* <FontIcon
                      name="chevron-down"
                      color= '#000000'
                      size={12}
                      solid
                    /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* {shouldShow3 ? (
            <View style={{ flex: 1, alignContent: "center" }}>
              {NoDateSelected ? (
                <TouchableOpacity onPress={() => nowSelected(!NoDateSelected)}>
                  <Fragment>
                    <Calendar
                      current={"2020-02-02"}
                      testID={testIDs.calendars.FIRST}
                      hideArrows={false}
           
                      onDayPress={onDayPress}
     
                      markedDates={{
                        [selected]: {
                          selected: true,
                          disableTouchEvent: true,
                          selectedColor: "#70d7c7",
                          selectedTextColor: "white",
                        },
                      }}
                      onPressArrowLeft={(subtractMonth) => subtractMonth()}
                      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                      onPressArrowRight={(addMonth) => addMonth()}
                      // Disable left arrow. Default = false
                      //onDayPress={(day) => {console.log('selected day', day.dateString)}}
                      enableSwipeMonths={true}
                    />
                  </Fragment>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 10, color: "#979797", paddingLeft: 3 }}>
                You have selected your start date as: {selected}
              </Text>
            </View>
          )} */}

          {/* Toggle address avg price text */}
          {shouldShow4 ? (
            <Pressable onPress={() => setShouldShow4(!shouldShow4)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingTop: 20,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    alignContent: "flex-start",
                  }}
                >
                  <Text
                    style={{ fontSize: 10, color: "#35d1b9", paddingLeft: 3 }}
                  >
                    6336 Culmore Cres
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    alignContent: "flex-end",
                  }}
                >
                  <Text
                    style={{ fontSize: 10, color: "#979797", paddingLeft: 3 }}
                  >
                    Avg. Market Price
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 20, marginLeft: 35 }}>
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: data,
                        color: (opacity = 1) => `rgba(94, 229, 208, 1)`, // optional
                        strokeWidth: 2,
                      },
                      {
                        data: data1,
                        color: (opacity = 1) => `rgba(151, 151, 151, 1)`, // optional
                        strokeWidth: 2,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 10} // from react-native
                  height={220}
                  //withHorizontalLabels = {false}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  yAxisLabel="$"
                  yAxisInterval={2}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#FFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    useShadowColorFromDataset: false, // optional,
                    color: (opacity = 0) => `rgba(0, 256, 256, ${opacity})`,
                    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 30,
                    },
                    propsForDots: {
                      r: 0,
                      strokeWidth: 0,
                      stroke: "#35d1b9",
                    },
                  }}
                  //bezier
                  style={{
                    marginVertical: 5,
                    borderRadius: 15,
                  }}
                  renderDotContent={({ x, y, index }) => {
                    return (
                      <View
                        style={{
                          height: 24,
                          width: 24,
                          backgroundColor: "#abc",
                          position: "absolute",
                          top: y - 36, // <--- relevant to height / width (
                          left: x - 12, // <--- width / 2
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>{data[index]}</Text>
                      </View>
                    );
                  }}
                />
                <View
                  style={[
                    styles.flex1,
                    styles.row,
                    styles.recommendationOptions,
                  ]}
                >
                  <View style={[styles.card5, { marginLeft: width - 200 }]}>
                    <Text style={{ color: "#303030", fontSize: 12 }}>
                      $921000
                    </Text>
                    <Text style={{ color: "#2cde49", fontSize: 10 }}>
                      +1.35%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ) : (
            // Line Graph start here
            <Pressable
              onPress={() => setShouldShow4(!shouldShow4)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 40, marginLeft: 55 }}>
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: data,
                        color: (opacity = 1) => `rgba(94, 229, 208, 1)`, // optional
                        strokeWidth: 2,
                      },
                      {
                        data: data1,
                        color: (opacity = 1) => `rgba(151, 151, 151, 1)`, // optional
                        strokeWidth: 2,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={180}
                  //withHorizontalLabels = {false}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  yAxisLabel="$"
                  yAxisInterval={2}
                  chartConfig={{
                    width,
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#FFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    useShadowColorFromDataset: false, // optional,
                    color: (opacity = 0) => `rgba(0, 256, 256, ${opacity})`,
                    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 30,
                    },
                    propsForDots: {
                      r: 0,
                      strokeWidth: 0,
                      stroke: "#35d1b9",
                    },
                  }}
                  //bezier
                  style={{
                    marginVertical: 5,
                    borderRadius: 15,
                  }}
                  renderDotContent={({ x, y, index }) => {
                    return (
                      <View
                        style={{
                          height: 24,
                          width: 24,
                          backgroundColor: "#abc",
                          position: "absolute",
                          top: y - 36, // <--- relevant to height / width (
                          left: x - 12, // <--- width / 2
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>{data[index]}</Text>
                      </View>
                    );
                  }}
                />
                <View
                  style={[
                    styles.flex1,
                    styles.row,
                    styles.recommendationOptions,
                  ]}
                >
                  <View style={[styles.card5, { marginLeft: width - 200 }]}>
                    <Text style={{ color: "#303030", fontSize: 12 }}>
                      $921000
                    </Text>
                    <Text style={{ color: "#2cde49", fontSize: 10 }}>
                      +1.35%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}

          <View style={{ marginStart: 20, marginTop: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Report</Text>
          </View>

          {/* Tabs start here */}
          <ScrollView
            horizontal={true}
            style={{ marginTop: 10, marginStart: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {shouldShow ? (
              <TouchableOpacity
                style={[styles.pillsActive]}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={[styles.pill]}>
                  <Text style={styles.pillName}>Home Renovations</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.pills]}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.name}>Home Renovations</Text>
                </View>
              </TouchableOpacity>
            )}

            {shouldShow1 ? (
              <TouchableOpacity
                style={[styles.pillsActive, { marginLeft: 6 }]}
                onPress={() => {
                  setShouldShow1(!shouldShow1);
                  setShouldShow(false);
                  setShouldShow2(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Economic Indicators</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.pills, { marginLeft: 6 }]}
                onPress={() => {
                  setShouldShow1(!shouldShow1);
                  setShouldShow(false);
                  setShouldShow2(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Economic Indicators</Text>
                </View>
              </TouchableOpacity>
            )}

            {shouldShow2 ? (
              <TouchableOpacity
                style={[styles.pillsActive, { marginLeft: 6 }]}
                onPress={() => {
                  setShouldShow2(!shouldShow2);
                  setShouldShow(false);
                  setShouldShow1(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Community Development</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.pills, { marginLeft: 6 }]}
                onPress={() => {
                  setShouldShow2(!shouldShow2);
                  setShouldShow(false);
                  setShouldShow1(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Community Development</Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Cards start here */}
          <View style={{ marginTop: -10 }}>
            {shouldShow ? (
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <ReportRectangleCollapse
                  onPress={() => setShouldShow(!shouldShow)}
                  backgroundColor="rgba(52,209,184, 0.16)"
                  dropDownIcon={dropDownIconOne}
                  title="Home Renovations"
                  date="20th Dec 2020"
                />

                <View style={[styles.flex, styles.column, styles.recommended]}>
                  <View style={[styles.column, styles.recommendedList]}>
                    <FlatList
                      horizontal
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      legacyImplementation={false}
                      scrollEventThrottle={16}
                      snapToAlignment="center"
                      style={{ overflow: "visible", wid: width - 50 }}
                      data={community}
                      renderItem={({ item, index }) => (
                        <ReportCard
                          title={item.indicator}
                          imgUrl={item.img}
                          dataSource={item.dataSource}
                          category={item.community}
                          propziImpact={item.propziImpact}
                          desc={item.description}
                          index={index}
                          key={index}
                        />
                      )}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowOne}
                  onPress={() => setShouldShow(!shouldShow)}
                  title="Home Renovations"
                  date="10th Jan 2021"
                  imagesArray={imgs2}
                  backgroundColor="rgba(52,209,184, 0.16)"
                  updates={community.length}
                />
              </View>
            )}
          </View>

          <View style={{ marginTop: -10 }}>
            {shouldShow1 ? (
              <View>
                <ReportRectangleCollapse
                  onPress={() => setShouldShow1(!shouldShow1)}
                  backgroundColor="rgba(81,141,231, 0.2)"
                  dropDownIcon={dropDownIconTwo}
                  title="Economic Indicators"
                  date="20th Dec 2020"
                />
                <View style={[styles.flex, styles.column, styles.recommended]}>
                  <View style={[styles.column, styles.recommendedList]}>
                    <FlatList
                      horizontal
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      legacyImplementation={false}
                      scrollEventThrottle={16}
                      snapToAlignment="center"
                      style={{ overflow: "visible", wid: width - 50 }}
                      data={users}
                      renderItem={({ item, index }) => (
                        <>
                          <ReportCard
                            title={item.indicator}
                            imgUrl={item.img}
                            dataSource={item.dataSource}
                            category={item.categoryIndicator}
                            propziImpact={item.propziImpact}
                            desc={item.description}
                            index={index}
                            key={index}
                          />
                        </>
                      )}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowTwo}
                  onPress={() => setShouldShow1(!shouldShow1)}
                  title="Econominc Indicators"
                  date="2 Feb 2021"
                  imagesArray={imgs1}
                  updates={users.length}
                  backgroundColor="rgba(81,141,231, 0.2)"
                />
              </View>
            )}
          </View>

          <View style={{ marginTop: -10 }}>
            {shouldShow2 ? (
              <View>
                <ReportRectangleCollapse
                  dropDownIcon={dropDownIconThree}
                  onPress={() => setShouldShow2(!shouldShow2)}
                  title="Community Developments"
                  date="25th Feb 2021"
                  backgroundColor="rgba(52,209,184, 0.18)"
                />

                <View style={[styles.flex, styles.column, styles.recommended]}>
                  <View style={[styles.column, styles.recommendedList]}>
                    <FlatList
                      horizontal
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      legacyImplementation={false}
                      scrollEventThrottle={16}
                      snapToAlignment="center"
                      style={{ overflow: "visible", wid: width - 50 }}
                      data={community}
                      renderItem={({ item, index }) => (
                        <>
                          <ReportCard
                            imgUrl={item.img}
                            propziImpact={item.propziImpact}
                            dataSource={item.dataSource}
                            desc={item.description}
                            category={item.category}
                            index={index}
                            key={index}
                            title={item.heading}
                          />
                        </>
                      )}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowThree}
                  onPress={() => setShouldShow2(!shouldShow2)}
                  title="Community Developments"
                  date="3 Feb 2021"
                  imagesArray={imgs3}
                  updates={community.length}
                  backgroundColor="rgba(52,209,184, 0.18)"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 25,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  pillName: {
    fontSize: 12,
    fontWeight: "600",
  },
  pills: {
    backgroundColor: colors.SECONDARY_COLOR,
    marginBottom: 20,
    borderRadius: 25,
  },
  pillsActive: {
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: colors.PRIMARY_COLOR,
  },

  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
  },

  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },

  tab: {
    marginRight: 16 * 2,
    paddingBottom: 16,
  },

  title: {
    fontSize: 20,
    marginTop: 20,
  },

  stitle: {
    fontSize: 12,
    color: "#a4a4a4",
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 10,
    marginTop: 5,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "rgba(52,209,184, 0.16)",
    padding: 10,
    flexDirection: "row",
    borderRadius: 16,
  },
  card1: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "rgba(81,141,231, 0.2)",
    padding: 10,
    flexDirection: "row",
    borderRadius: 16,
  },
  card2: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "rgba(231,189,81, 0.2)",
    padding: 10,
    flexDirection: "row",
    borderRadius: 16,
  },

  name: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "bold",
  },
  count: {
    fontSize: 10,
    color: "#979797",
  },

  flex: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    alignItems: "flex-end",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },

  recommended: {},
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 25,
    marginVertical: 20 * 0.66,
  },
  recommendedList: {},
  recommendation: {
    width: (width - 25 * 2) / 1.2,
    marginHorizontal: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  recommendation1: {
    width: width - 50,
    marginHorizontal: 8,
    backgroundColor: "#f6f6f6",
    overflow: "hidden",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25 / 2,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: 14 * 1.25,
    color: "#fff",
  },
  recommendationImage: {
    width: (width - 25 * 2) / 1.2,
    height: (width - 25 * 2) / 2,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  card3: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: "rgba(52,209,184, 1)",
    padding: 5,
    flexDirection: "row",
    borderRadius: 16,
    alignSelf: "flex-end",
  },
  card5: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor: "rgba(52,209,184, 0.18)",
    padding: 5,
    flexDirection: "row",
    borderRadius: 16,
    alignSelf: "flex-end",
  },

  card4: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor: "#fff",
    padding: 5,
    flexDirection: "row",
    borderRadius: 16,
    width: 140,
  },
  card6: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor: "#35d1b9",
    paddingTop: 0,
    paddingRight: 9,
    paddingBottom: 7,
    flexDirection: "row",
    borderRadius: 16,
    alignSelf: "center",
  },
  card7: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor: "#c5c5c5",
    paddingTop: 0,
    paddingRight: 9,
    paddingBottom: 7,
    flexDirection: "row",
    borderRadius: 16,
    alignSelf: "center",
  },
  count: {
    fontSize: 12,
    alignSelf: "flex-start",
    color: "#1f2123",
    paddingLeft: 5,
  },
  count1: {
    fontSize: 12,
    alignSelf: "flex-end",
    color: "#960303",
    paddingLeft: 10,
    marginRight: 5,
  },
  cardHeader: {
    flex: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  buttonClose: {
    backgroundColor: "rgba(52,209,184, 0.86)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const imgs1 = [
  {
    id: 3,
    members: [
      "https://i.cbc.ca/1.1688376.1379083887!/httpImage/image.jpg_gen/derivatives/16x9_780/hi-unemployed.jpg",
      "https://www.cbre.us/-/media/cbre/countryunitedstates/media/images/pr-stock-images/pr-image-04.jpg",
      "https://hughesmarino.com/wp-content/uploads/San-Diego-downtown-dusk.jpg",
      "https://cdn-res.keymedia.com/cms/images/ca/046/0348_637250306371916023.jpg",
    ],
  },
];
const imgs2 = [
  {
    id: 4,
    members: [
      "https://www.greenwoodswim.com/mabutap/3250/Marijuana-Kamloops-British-Colombia-Canada-5e72a9c9d4bdc.jpg",
      "https://www.chatelaine.com/wp-content/uploads/2017/01/Morin_Library_credit_Patrick_Matte-1.jpg",
      "https://images.adsttc.com/media/images/595b/9b16/b22e/386b/ae00/011e/newsletter/007-_Perkins_Will_Albion_Library.jpg",
      "https://cdn.renewcanada.net/wp-content/uploads/2017/12/22144736/manitoba-government.jpg",
    ],
  },
];
const imgs3 = [
  {
    id: 5,
    members: [
      "https://constructionreviewonline.com/wp-content/uploads/2020/11/image3.jpg",
      "https://loveincorporated.blob.core.windows.net/contentimages/gallery/39f51006-18b2-4e24-9a94-52e8a4dc05b8-shutterstock_521094097.jpg",
      "https://www.thespruce.com/thmb/pIk77UlWUgSY2VGy2yHvKclVYZU=/2121x1193/smart/filters:no_upscale()/Family-home-renovation-GettyImages-513438249-58a0e0803df78c4758055c1a.jpg",
      "https://www.refreshrenovations.global/images/uploads/plan-hero.jpg",
    ],
  },
];

const testIDs = {
  menu: {
    CONTAINER: "menu",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    AGENDA: "agenda_btn",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
  },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  calendarList: { CONTAINER: "calendarList" },
  horizontalList: { CONTAINER: "horizontalList" },
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

export default ReportScreen;
