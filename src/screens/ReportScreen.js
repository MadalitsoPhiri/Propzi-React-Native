import React, { useState, useEffect, useContext } from "react";
import { dbh } from "../../firebase/index";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import ModalDropdown from "react-native-modal-dropdown";

import { AuthContext } from "../components/providers/AuthProvider";
import { PropertyDataContext } from "../components/providers/PropertyDataProvider";
import { CommunityDataContext } from "../components/providers/CommunityDataProvider";
import { RecentSalesContext } from "../components/providers/RecentSaleProvider";
import Loader from "../components/Loader";
import ReportRectangleCard from "../components/Cards/ReportRectangleCard";
import ReportRectangleCollapse from "../components/Cards/ReportRectangleCollapse";
import ReportCard from "../components/Cards/ReportCard";
import RecentSaleCard from "../components/Cards/RecentSales";
import Graph from "./graph";
import {
  arrowOne,
  arrowTwo,
  arrowThree,
  dropDownIconOne,
  dropDownIconTwo,
  dropDownIconThree,
} from "../../assets/reportImagesAndIcons/reportIcons";
import {
  createImageThumbnailArray,
  createImageThumbnailArrayFromRepliers,
} from "../utils/helper";

import { colors } from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
// const { screenwidth } = Dimensions.get("screen");
const ReportScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { property } = useContext(PropertyDataContext);
  const { communityData } = useContext(CommunityDataContext);
  const { recentSales } = useContext(RecentSalesContext);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [recentSalesBool, setRecentSalesBool] = useState(false);
  const [recentSalesThumbnails, setRecentSalesThumbnails] = useState([]);
  const [dateToggle, setDateToggle] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [economics, setEconomics] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [userProperties, setProperties] = useState([]);
  const [homeRenovation, setHomeRenovation] = useState([]);
  const [community, setCommunities] = useState([]);
  const [communityThumbnails, setCommunityThumbnails] = useState([]);

  // FILTER USER SPECIFIC COMMUNITY DATA
  function filterUserCommunitData() {
    const newUserCommunitData = communityData.filter((item) => {
      if (item.city.toLowerCase() == property.city.toLowerCase()) {
        return item;
      }
    });
    setCommunities(newUserCommunitData);
  }

  // SET IMAGE THUMBNAIL
  useEffect(() => {
    const communityThumbnailsData = createImageThumbnailArray(communityData);
    setCommunityThumbnails(communityThumbnailsData);
    const recentSalesImageThumbnails = createImageThumbnailArrayFromRepliers(
      recentSales
    );
    setRecentSalesThumbnails(recentSalesImageThumbnails);
  }, []);

  // GET ECONOMIC DATA
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

        setEconomics(users);
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

        setEconomics((users) => users.concat(users1));
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

        setUserAddresses(userData2);
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

  useEffect(() => {
    filterUserCommunitData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Graph Data Here
  const data = [
    {x:new Date(2018,9,1),y:160000},
    {x:new Date(2018,9,16),y:185000},
    {x:new Date(2018,9,17),y:250000},
    {x:new Date(2018,10,1),y:300000},
    {x:new Date(2018,10,2),y:450000},
    {x:new Date(2018,10,5),y:480000},
  ];
  
  const data2 = [
    {x:new Date(2018,9,1),y:185000},
    {x:new Date(2018,9,16),y:200000},
    {x:new Date(2018,9,17),y:250000},
    {x:new Date(2018,10,1),y:300000},
    {x:new Date(2018,10,2),y:350000},
    {x:new Date(2018,10,5),y:480000},
  ];

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.root}>
          {/* Address and Arrow */}
          
          <Graph graphData={{data,data2}}/>
          {/* Toggle address avg price text */}
          {/* {shouldShow4 ? (
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
                      "Jan-2021",
                      "Feb-2021",
                      "Mar-2021",
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
                      height: 120,
                    }}
                    textStyle={{ fontSize: 14 }}
                    defaultValue="Date"
                    style={{
                      padding: 5,
                      paddingHorizontal: 10,
                    }}
                    onSelect={(index, value) => {
                      console.warn(value.substr(0, 3));
                    }}
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
          )} */}

          <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 23, fontFamily:"Poppins-Bold" }}>Report</Text>
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
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>All</Text>
                </View>
              </Pressable>
            )}

            {/* Recent Sales */}
            {recentSalesBool ? (
              <Pressable
                style={[styles.pillsActive, { marginLeft: 10 }]}
                onPress={() => {
                  setShowAll(false);
                  setRecentSalesBool(!recentSalesBool);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={[styles.pill]}>
                  <Text style={styles.pillName}>Recent Sales</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.pills, { marginLeft: 10 }]}
                onPress={() => {
                  setShowAll(false);
                  setRecentSalesBool(true);
                  setShouldShow(false);
                  setShouldShow1(false);
                  setShouldShow2(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Recent Sales</Text>
                </View>
              </Pressable>
            )}
            {/* Recent Sales */}

            {shouldShow ? (
              <Pressable
                style={[styles.pillsActive, { marginLeft: 10 }]}
                onPress={() => {
                  setShouldShow(!shouldShow);
                  setShouldShow1(false);
                  setShouldShow2(false);
                  setShowAll(false);
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
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
                  setRecentSalesBool(false);
                }}
              >
                <View style={styles.pill}>
                  <Text style={styles.pillName}>Community Development</Text>
                </View>
              </Pressable>
            )}
          </ScrollView>

          {/* Cards start here */}

          {/* Recent Sale Card */}
          <View
            style={{
              marginTop: -10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {recentSalesBool ? (
              <>
                <ReportRectangleCollapse
                  dropDownIcon={dropDownIconThree}
                  onPress={() => setRecentSalesBool(!recentSalesBool)}
                  title="Recent Sales"
                  date="2nd Feb 2021"
                  backgroundColor="rgba(100, 179, 65, 0.3)"
                />

                {recentSales?.length > 0 ? (
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentSales}
                keyExtractor={(item) => item.mlsNumber}
                renderItem={({ item }) => {
                  return(
<TouchableOpacity  onPress={() => navigation.navigate("detailspage", { item })}   style={{   backgroundColor:'#f3f3f3',
    width: 230,
    borderTopRightRadius: 16,
    borderTopLeftRadius:16,
    
    justifyContent: 'center',
    alignItems: 'center',marginLeft:20,marginRight:20}}  >
     
<Image source={{uri: `https://cdn.repliers.io/${item.images[0]}`}}  style={{ width: "100%",
    height:150,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#f3f3f3",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,}} />

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.address.streetNumber} {item.address.streetName},  Unit {item.address.unitNumber}</Text>
        <Text style={{ color: "#788490", marginBottom: 4, fontSize: 12 }}>
          {item.address.neighborhood},{item.address.city}
        </Text>
        <Text style={{ color: "#1f2123", fontSize: 13, lineHeight: 20 }}>
          {item.details.description.substr(0, 89) + "..."}
          <Text style={{ color: colors.PRIMARY_COLOR }}>Read more</Text>
        </Text>
      </View>
      {item.soldPrice !== "" && item.soldPrice ? (
        <View style={styles.cardFooter}>
          <Text style={styles.propziImpactTitle}>Sold for:</Text>
          <Text style={[styles.propziImpact, { color: colors.PRIMARY_COLOR }]}>
            ${item.soldPrice}
          </Text>
        </View>
      ) : null}

</TouchableOpacity>
              )  }
              }
                />
              
                ) : (
                  <Text style={{ textAlign: "center", color: "red" }}>
                    No Data
                  </Text>
                )}
              </>
            ) : (
              <>
                <ReportRectangleCard
                  arrowUrl={arrowThree}
                  onPress={() => setRecentSalesBool(!recentSalesBool)}
                  title="Recent Sales"
                  date="3 Feb 2021"
                  imagesArray={recentSalesThumbnails}
                  updates={recentSales?.length}
                  backgroundColor="rgba(100, 179, 65, 0.3)"
                />
              </>
            )}
          </View>
          {/* End Recent Sale Cards */}

          {/* Home Renovation */}
          <View
            style={{
              marginTop: -10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {shouldShow ? (
              <>
                <ReportRectangleCollapse
                  onPress={() => setShouldShow(!shouldShow)}
                  backgroundColor="rgba(52,209,184, 0.16)"
                  dropDownIcon={dropDownIconOne}
                  title="Home Renovations"
                  date="20th Dec 2020"
                />
                {homeRenovation.length > 0 ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.projectUrl}
                    data={homeRenovation}
                    renderItem={({ item, index }) => (
                      <View>
                        <ReportCard
                          title={item.indicator}
                          imgUrl={
                            item.img
                              ? item.img
                              : "http://www.bioeconomycorporation.my/wp-content/uploads/2015/01/default-placeholder-1024x1024-700x700.png"
                          }
                          dataSource={item.dataSource}
                          category={item.community}
                          propziImpact={item.propziImpact}
                          desc={item.description}
                          index={index}
                          key={index}
                        />
                      </View>
                    )}
                  />
                ) : (
                  <Text style={{ textAlign: "center", color: "red" }}>
                    No Data
                  </Text>
                )}
              </>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowOne}
                  onPress={() => setShouldShow(!shouldShow)}
                  title="Home Renovations"
                  date="10th Jan 2021"
                  // imagesArray={communityThumbnails}
                  backgroundColor="rgba(52,209,184, 0.16)"
                  updates={homeRenovation.length}
                />
              </View>
            )}
          </View>
          {/* End Home Renovation */}

          {/* Economic Indicators */}
          <View
            style={{
              marginTop: -10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {shouldShow1 ? (
              <>
                <ReportRectangleCollapse
                  onPress={() => setShouldShow1(!shouldShow1)}
                  backgroundColor="rgba(81,141,231, 0.2)"
                  dropDownIcon={dropDownIconTwo}
                  title="Economic Indicators"
                  date="20th Dec 2020"
                />
                {economics.length > 0 ? (
                  <FlatList
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    data={economics}
                    keyExtractor={(item) => item.img}
                    renderItem={({ item, index }) => (
                      <View style={{ marginHorizontal: 4 }}>
                        <ReportCard
                          title={item.indicator}
                          imgUrl={item.img}
                          dataSource={item.dataSource}
                          category={item.categoryIndicator}
                          propziImpact={item.propziImpact}
                          desc={item.description}
                          index={index}
                          key={index}
                          width={width - 29}
                        />
                      </View>
                    )}
                  />
                ) : (
                  <Text style={{ textAlign: "center", color: "red" }}>
                    No Data
                  </Text>
                )}
              </>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowTwo}
                  onPress={() => setShouldShow1(!shouldShow1)}
                  title="Econominc Indicators"
                  date="2 Feb 2021"
                  imagesArray={[]}
                  updates={economics.length}
                  backgroundColor="rgba(81,141,231, 0.2)"
                />
              </View>
            )}
          </View>
          {/* End Economic Indicators */}

          {/* Community development */}
          <View
            style={{
              marginTop: -10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {shouldShow2 ? (
              <>
                <ReportRectangleCollapse
                  dropDownIcon={dropDownIconThree}
                  onPress={() => setShouldShow2(!shouldShow2)}
                  title="Community Developments"
                  date="25th Feb 2021"
                  backgroundColor="rgba(231, 189, 81, 0.2)"
                />

                {communityData.length > 0 ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={community}
                    keyExtractor={(item) => item.projectUrl}
                    renderItem={({ item, index }) => {
                      return (
                        <ReportCard
                          imgUrl={
                            item.img
                              ? item.img
                              : "http://www.bioeconomycorporation.my/wp-content/uploads/2015/01/default-placeholder-1024x1024-700x700.png"
                          }
                          propziImpact={item.propziImpact}
                          dataSource={item.dataSource}
                          desc={item.description}
                          category={item.category}
                          key={index}
                          title={item.heading}
                          projectURL={item.projectUrl}
                        />
                      );
                    }}
                  />
                ) : (
                  <Text style={{ textAlign: "center", color: "red" }}>
                    No Data
                  </Text>
                )}
              </>
            ) : (
              <View>
                <ReportRectangleCard
                  arrowUrl={arrowThree}
                  onPress={() => setShouldShow2(!shouldShow2)}
                  title="Community Developments"
                  date="3 Feb 2021"
                  imagesArray={community.length > 0 && communityThumbnails}
                  updates={community.length}
                  backgroundColor="rgba(231, 189, 81, 0.2)"
                />
              </View>
            )}
          </View>
          {/* End Community development */}
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
    paddingHorizontal: 20,
    height: 80,
    marginTop: 20,
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
    fontFamily:"Poppins-Medium"
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
  cardcontainer: {
    position: "relative",
    width: "55%",
    // marginHorizontal: 20,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor:'#f3f3f3'
  },

  image: {
    width: "100%",
    // height: (screenwidth - 25 * 2) / 1.7,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#f3f3f3",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  cardBody: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },

  cardFooter: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    marginTop: 10,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 16,
    // width: screenwidth * 0.4,
    height: 30,
    alignItems: "center",
  },

  propziImpactTitle: {
    fontSize: 12,
  },

  propziImpact: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ReportScreen;
