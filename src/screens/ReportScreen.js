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
  TextPropTypes,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import ModalDropdown from "react-native-modal-dropdown";
import {round} from "react-native-redash";
import { AuthContext } from "../components/providers/AuthProvider";
import { PropertyDataContext } from "../components/providers/PropertyDataProvider";
import { CommunityDataContext } from "../components/providers/CommunityDataProvider";
import { RecentSalesContext } from "../components/providers/RecentSaleProvider";
import Loader from "../components/Loader";
import ReportRectangleCard from "../components/Cards/ReportRectangleCard";
import ReportRectangleCollapse from "../components/Cards/ReportRectangleCollapse";
import ReportCard from "../components/Cards/ReportCard";
import RecentSaleCard from "../components/Cards/RecentSales";
import {Ionicons,FontAwesome,MaterialIcons  } from '@expo/vector-icons'; 
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

const {width,height} = Dimensions.get("screen")
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
  const cardIconSize = width * 0.08

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


          <View style={{ marginLeft: 20, marginTop: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 23, fontFamily:"Poppins-Bold" }}>Report</Text>
          </View>

          {/* Tabs start here */}
          <ScrollView
            horizontal={true}
            style={{ marginTop: 10 }}
            contentContainerStyle={{paddingHorizontal:"5%"}}
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
              marginTop: "5%",
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
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={recentSales}
                keyExtractor={(item) => item.mlsNumber}
                contentContainerStyle={{}}
                renderItem={({ item }) => {
                  return(
<TouchableOpacity  onPress={() => navigation.navigate("detailspage", { item })}   style={styles.carouselItem}  >
     
<Image source={{uri: `https://cdn.repliers.io/${item.images[0]}`}}  style={{ width: "100%",
    height:150,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#f3f3f3",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,}} />

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.address.streetNumber} {item.address.streetName},  Unit {item.address.unitNumber}</Text>
        <Text style={styles.recentSalesSubHeading}>
          {item.address.neighborhood},{item.address.city}
        </Text>
        {/* <Text style={{ color: "#1f2123", fontSize: 13, lineHeight: 20,fontFamily:"Poppins-Regular" }}>
          {item.details.description.substr(0, 89) + "..."}
          <Text style={{ color: colors.PRIMARY_COLOR,fontFamily:"Poppins-Regular" }}>Read more</Text>
        </Text> */}
      </View>
     
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:20,marginBottom:"5%"}}>
      <View style={{justifyContent:"center",alignContent:"center"}}>
      <Ionicons name="md-bed" size={cardIconSize} color="black" style={{alignSelf:"center",marginBottom:"10%"}} />
         <Text style={{textAlign:"center",fontSize:11,fontFamily:"Poppins-Medium",color:"gray"}}>{`${item.details.numBedrooms}`+`${item.details.numBedroomsPlus ? "+"+item.details.numBedroomsPlus:"" }`+" Bedrooms"}</Text>
       </View>
       <View style={{justifyContent:"center",alignContent:"center"}}>
       <FontAwesome name="bathtub" size={cardIconSize} color="black" style={{alignSelf:"center",marginBottom:"10%"}}/>
         <Text style={{textAlign:"center",fontSize:11,fontFamily:"Poppins-Medium",color:"gray"}}>{`${item.details.numBathrooms}`+`${item.details.numBathroomsPlus ? "+"+item.details.numBedroomsPlus:"" }`+" Bathrooms"}</Text>
       </View>
       <View style={{justifyContent:"center",alignContent:"center"}}>
         <MaterialIcons  name="square-foot" color="black" size={cardIconSize} style={{alignSelf:"center",marginBottom:"10%"}}/>
       <View ></View>
         <Text style={{textAlign:"center",fontSize:11,fontFamily:"Poppins-Medium",color:"gray"}}>{`${item.details.numGarageSpaces ? parseInt(item.details.sqft):"----" }`+" Sqft"}</Text>
       </View>
      </View>

      {/* {item.soldPrice !== "" && item.soldPrice ? (
        <View style={styles.cardFooter}>
          <Text style={styles.propziImpactTitle}>Sold for:</Text>
          <Text style={[styles.propziImpact]}>
            ${round(item.soldPrice).toLocaleString("en-US",{currency:"USD"})}
          </Text>
        </View>
      
      ) : null} */}

<View style={styles.cardFooter}>
                          <View>
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Sold Date</Text>
                            <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>{new Date(item.soldDate).toLocaleDateString("en-US")}</Text>
                          </View>
                          <View>
                            <Text style={{ fontFamily:"Poppins-Medium",textAlign:"center"}}>Sold Price</Text>
                            <Text>
                              {console.log("last:",item.soldPrice)}
                              {item.soldPrice == null || item.soldPrice == "0.00" || item.soldPrice == "" ? (
                                 <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>Not Available</Text>
                               
                              ) : (
                                <Text style={{ fontFamily:"Poppins-Medium",color:"gray",textAlign:"center"}}>{'$'+ Math.round(item.soldPrice).toLocaleString()}</Text>
                              )}
                            </Text>
                          </View>
</View>

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
              // paddingHorizontal: 20,
              // paddingVertical: 10,
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
                    pagingEnabled
                    keyExtractor={(item) => item.img}
                    renderItem={({ item, index }) => (
                      <View style={{}}>
                        <ReportCard
                          id={item.id}
                          title={item.indicator}
                          imgUrl={item.img}
                          dataSource={item.dataSource}
                          category={item.categoryIndicator}
                          propziImpact={item.propziImpact}
                          desc={item.description}
                          index={index}
                          key={index}
                          width={width - 29}
                          type={"Economic Indicators"}
                          likeInfo={item.likeInfo}
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
              // paddingHorizontal: 20,
              // paddingVertical: 10,
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
                    pagingEnabled
                    keyExtractor={(item) => item.projectUrl}
                    renderItem={({ item, index }) => {
                      return (
                        <ReportCard
                          id={item.id}
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
                          type={"Community Developments"}
                          likeInfo={item.likeInfo}
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
  recentSalesSubHeading:{
     color: "#788490", 
     marginBottom: 4,
      fontSize: 12,
      fontFamily:"Poppins-Medium"
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
    fontFamily:"Poppins-Medium"
  },

  stitle: {
    fontSize: 12,
    color: "#a4a4a4",
    fontFamily:"Poppins-Medium"
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
   paddingHorizontal:16,
   paddingTop:16
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
    fontFamily:"Poppins-Medium"
    
  },

  cardFooter: {
  
   marginHorizontal:16,
   marginBottom:"10%",
   flexDirection: "row",
   height: 30,
   alignItems: "center",
   alignSelf:"flex-start",
   paddingHorizontal:15,
   paddingVertical:5,
   borderColor:"gray",
   borderWidth:2,
   borderRadius:30,
   zIndex:1
  },

  propziImpactTitle: {
    fontSize: 12,
    fontFamily:"Poppins-Medium"
  
  },

  propziImpact: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily:"Poppins-Medium",
    color:"gray"
  },
  carouselItem:{
    width:width - 32,
    backgroundColor:"white",
    borderRadius:17,
    alignSelf:"center",
    shadowColor:"#000",
    shadowOffset:{width:5,height:10},
    shadowOpacity:0.08,
    shadowRadius:16,
    justifyContent:"center",
    borderWidth:1,
    borderColor: 'rgba(158, 150, 158, .5)',
    elevation:8,
    marginHorizontal:16,
    marginBottom:25

    

 },
 cardFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  padding:16
},
});

export default ReportScreen;
