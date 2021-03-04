import React, { useState, useEffect, useContext } from "react";
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
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import ModalDropdown from "react-native-modal-dropdown";

import { AuthContext } from "../components/providers/AuthProvider";
import Loader from "../components/Loader";
import ReportRectangleCard from "../components/Cards/ReportRectangleCard";
import ReportRectangleCollapse from "../components/Cards/ReportRectangleCollapse";
import ReportCard from "../components/Cards/ReportCard";
import {
  imgs1,
  imgs2,
  imgs3,
} from "../../assets/reportImagesAndIcons/reportCircleImages";
import {
  arrowOne,
  arrowTwo,
  arrowThree,
  dropDownIconOne,
  dropDownIconTwo,
  dropDownIconThree,
} from "../../assets/reportImagesAndIcons/reportIcons";

import { colors } from "../styles";
const { width } = Dimensions.get("window");

const ReportScreen = () => {
  const { user } = useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userAddresses, setUserUserAddresses] = useState([]);
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

  // Get user Addresses
  useEffect(() => {
    const getUserPropertyAddress = dbh
      .collection(`UserDetails/${user.uid}/Property`)
      .onSnapshot((querySnapshot) => {
        let userData2 = [];

        querySnapshot.forEach((documentSnapshot) => {
          let b = documentSnapshot.data();
          let street = b.streetName;
          let streetNumber = b.streetNumber;
          let address = streetNumber + " " + street + ", " + b.city;
          userData2.push(address);
        });

        setUserUserAddresses(userData2);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => getUserPropertyAddress();
  }, []);

  // Get user Property Details
  useEffect(() => {
    const getAllUserProperties = dbh
      .collection(`UserDetails/${user.uid}/Property`)
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
    return () => getAllUserProperties();
  }, []);

  // Get communit data
  useEffect(() => {
    const community1 = dbh
      .collection("Community")
      .doc("Ajax")
      .collection("Carruthers Creek")
      .onSnapshot((querySnapshot) => {
        const communities2 = [];

        querySnapshot.forEach((documentSnapshot) => {
          communities2.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });

          setCommunities(communities2);
          setLoading(false);
        });
      });

    // Unsubscribe from events when no longer in use
    return () => community1();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Graph Data Here
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [900000, 912000, 913000, 917000, 916000, 921000];
  const data1 = [892000, 902000, 907000, 915000, 912000, 918000];

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        style={{backgroundColor:'white'}}
      >
        <View style={styles.root}>
          {/* Address and Arrow */}
          <View style={styles.topSection}>
            <View>
              <ModalDropdown
                defaultValue={userAddresses && userAddresses[0]}
                options={userAddresses}
                dropdownStyle={{
                  paddingHorizontal: 10,
                  marginTop: 2,
                  width: width - 40,
                }}
                dropdownTextStyle={{ fontSize: 18, fontWeight: "500" }}
                textStyle={{ fontSize: 20, fontWeight: "500", marginBottom: 5 }}
                onTouchStart={() => setModalVisible(!modalVisible)}
              />
              {/* <Text style={styles.title}>{"45 Bristol Rd, Mississauga"}</Text> */}
              <Text style={styles.stitle}>Last Updated at 12/28/2020.</Text>
            </View>
            
            <Pressable
              style={styles.topSectionArrowContainer}
              onPress={() => setModalVisible(!modalVisible)}
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
            </Pressable>
          </View>

          {/* Toggle address avg price text */}
          {shouldShow4 ? (
            // Propzi heading and Date picker plus date select logic
            <>
              <View style={styles.propziHeadingAndDateMadal}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  Propzi Price
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#f3f3f3",
                    paddingRight: 10,
                  }}
                >
                  <ModalDropdown
                    options={[
                      "January-2021",
                      "Febuary-2021",
                      "March-2021",
                      // "April-2021",
                      // "May-2021",
                      // "June-2021",
                      // "July-2021",
                      // "August-2021",
                    ]}
                    dropdownStyle={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                      height:120
                    }}
                    textStyle={{ fontSize: 14 }}
                    defaultValue="Date"
                    style={{
                      padding: 5,
                      paddingHorizontal: 10,
                    }}
                    onSelect={(index, value) => console.warn(value)}
                    animated={true}
                    onTouchStart={() => setDateToggle(!dateToggle)}
                  />
                  {dateToggle ? (
                    <Image
                      source={require("../../assets/icons/6.png")}
                      style={{
                        width: 10,
                        height: 10,
                        alignSelf: "center",
                        marginTop: -2,
                        paddingLeft: 5,
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
                        paddingLeft: 5,
                      }}
                    />
                  )}
                </View>
              </View>
              <Pressable onPress={() => setShouldShow4(!shouldShow4)}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingTop: 20,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#35d1b9" }}>
                    {userAddresses && userAddresses[0]}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#979797" }}>
                    Avg. Market Price
                  </Text>
                </View>

                <View style={{ marginTop: 20, marginLeft: 30 }}>
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
                  <View style={styles.propziPriceTip}>
                    <View style={styles.propziPriceTipWrapper}>
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
            </>
          ) : (
            // Line Graph start here
            <Pressable
              onPress={() => setShouldShow4(!shouldShow4)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 35, marginLeft: 50 }}>
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
                <View style={styles.propziPriceTip}>
                  <View style={styles.propziPriceTipWrapper}>
                    <Text style={{ color: "#303030", fontSize: 12 }}>
                      $921,000
                    </Text>
                    <Text style={{ color: "#2cde49", fontSize: 10 }}>
                      +1.35%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}

          <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 23, fontWeight: "500" }}>Report</Text>
          </View>

          {/* Tabs start here */}
          <ScrollView
            horizontal={true}
            style={{ marginTop: 10, marginStart: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {showAll ? (
              <Pressable
                style={[styles.pillsActive]}
                onPress={() => {
                  setShowAll(true);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={[styles.pill]}>
                  <Text style={styles.pillName}>All</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.pills]}
                onPress={() => {
                  setShowAll(true);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>All</Text>
                </View>
              </Pressable>
            )}

            {shouldShow ? (
              <Pressable
                style={[styles.pillsActive, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  setShouldShow1(false);
                  setShouldShow2(false);
                  setShowAll(false);
                }}
              >
                <View style={[styles.pill]}>
                  <Text style={styles.pillName}>Home Renovations</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.pills, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  setShouldShow1(false);
                  setShouldShow2(false);
                  setShowAll(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Home Renovations</Text>
                </View>
              </Pressable>
            )}

            {shouldShow1 ? (
              <Pressable
                style={[styles.pillsActive, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow1(!shouldShow1);
                  setShouldShow(false);
                  setShouldShow2(false);
                  setShowAll(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Economic Indicators</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.pills, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow1(!shouldShow1);
                  setShouldShow(false);
                  setShouldShow2(false);
                  setShowAll(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Economic Indicators</Text>
                </View>
              </Pressable>
            )}

            {shouldShow2 ? (
              <Pressable
                style={[styles.pillsActive, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow2(!shouldShow2);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShowAll(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Community Development</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.pills, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow2(!shouldShow2);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShowAll(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Community Development</Text>
                </View>
              </Pressable>
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
                  imagesArray={imgs1}
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
                  imagesArray={imgs2}
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
                  backgroundColor="rgba(231, 189, 81, 0.2)"
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
                  backgroundColor="rgba(231, 189, 81, 0.2)"
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
  topSectionArrowContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },

  propziHeadingAndDateMadal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    height: 60,
  },

  propziPriceTipWrapper: {
    marginLeft: width - 200,
    backgroundColor: "rgba(52, 208, 184, 0.22)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:20,
    height: 80,
    marginTop:20
  },

  pill: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  pillName: {
    fontSize: 14,
    color: "white",
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

  propziPriceTip: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25 / 2,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
});

export default ReportScreen;
