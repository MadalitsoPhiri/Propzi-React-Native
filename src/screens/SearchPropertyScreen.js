import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { dbh } from "../../firebase";
import { AuthContext } from "../components/providers/AuthProvider";
import PropziVisit from "./PropziVisit";
import PropziUpgradesScreen from "./PropziUpgradesScreen";
import {
  ActivityIndicator,
  Modal,
  Provider,
  Portal,
  Dialog,
} from "react-native-paper";
import Loader from "../components/Loader";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const StreetSuffix = [
  "ANX",
  "ARC",
  "AVE",
  "BYU",
  "BCH",
  "BND",
  "BLF",
  "BLFS",
  "BTM",
  "BLVD",
  "BR",
  "BRG",
  "BRK",
  "BRKS",
  "BG",
  "BGS",
  "BYP",
  "CP",
  "CYN",
  "CPE",
  "CSWY",
  "CTR",
  "CTRS",
  "CIR",
  "CIRS",
  "CLF",
  "CLFS",
  "CLB",
  "CMN",
  "CMNS",
  "COR",
  "CORS",
  "CRSE",
  "CT",
  "CTS",
  "CV",
  "CVS",
  "CRK",
  "CRES",
  "CRST",
  "XING",
  "XRD",
  "XRDS",
  "CURV",
  "DL",

  "DM",

  "DV",

  "DR",

  "DRS",
  "EST",

  "ESTS",

  "EXPY",

  "EXT",

  "EXTS",
  "FALL",
  "FLS",

  "FRY",

  "FLD",

  "FLDS",

  "FLT",

  "FLTS",

  "FRD",

  "FRDS",
  "FRST",

  "FRG",

  "FRGS",
  "FRK",

  "FRKS",

  "FT",

  "FWY",

  "GDN",

  "GDNS",

  "GTWY",

  "GLN",

  "GLNS",
  "GRN",

  "GRNS",
  "GRV",

  "GRVS",
  "HBR",

  "HBRS",
  "HVN",

  "HTS",

  "HWY",

  "HL",

  "HLS",

  "HOLW",

  "INLT",
  "IS",

  "ISS",

  "ISLE",

  "JCT",

  "JCTS",

  "KY",

  "KYS",

  "KNL",

  "KNLS",

  "LK",

  "LKS",

  "LAND",
  "LNDG",

  "LN",

  "LGT",

  "LGTS",
  "LF",

  "LCK",

  "LCKS",

  "LDG",

  "LOOP",

  "MALL",
  "MNR",

  "MNRS",

  "MDW",
  "MDWS",

  "MEWS",
  "ML",
  "MLS",
  "MSN",

  "MTWY",
  "MT",

  "MTN",

  "MTNS",

  "NCK",

  "ORCH",

  "OVAL",

  "OPAS",
  "PARK",

  "PARK",
  "PKWY",

  "PKWY",

  "PASS",
  "PSGE",
  "PATH",

  "PIKE",

  "PNE",
  "PNES",

  "PL",
  "PLN",

  "PLNS",

  "PLZ",

  "PT",

  "PTS",

  "PRT",

  "PRTS",

  "PR",

  "RADL",

  "RAMP",
  "RNCH",

  "RPD",

  "RPDS",

  "RST",

  "RDG",

  "RDGS",

  "RIV",

  "RD",
  "RDS",
  "RTE",
  "ROW",
  "RUE",
  "RUN",
  "SHL",
  "SHLS",
  "SHR",
  "SHRS",
  "SKWY",
  "SPG",
  "SPGS",
  "SPUR",
  "SPUR",
  "SQ",
  "SQS",
  "STA",
  "STRA",
  "STRM",
  "ST",
  "STS",
  "SMT",
  "TER",
  "TRWY",
  "TRCE",
  "TRAK",
  "TRFY",
  "TRL",
  "TRLR",
  "TUNL",
  "TPKE",
  "UPAS",
  "UN",
  "UNS",
  "VLY",
  "VLYS",
  "VIA",
  "VW",
  "VWS",
  "VLG",
  "VLGS",
  "VL",
  "VIS",
  "WALK",
  "WALK",
  "WALL",
  "WAY",
  "WAYS",
  "WL",
  "WLS",
];

const Input = ({
  width,
  placeholder,
  searchIcon,
  onChangeText,
  value,
  editable,
}) => {
  return (
    <View style={[styles.input, { width: width }]}>
      <TextInput
        autoFocus={true}
        autoCompleteType={"street-address"}
        placeholder={placeholder}
        autoCorrect={true}
        onChangeText={onChangeText}
        value={value}
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: "gray",
        }}
        editable={editable}
      />
      <TouchableOpacity style={styles.icon}>{searchIcon}</TouchableOpacity>
    </View>
  );
};

const cleanAddress = (raw) => {
  const postGridAddress = raw.split(" ");
  // ._dispatchInstances.memoizedProps.children[0].props.children.props.children.toLowerCase();
  let streetName;
  let streetNumber;

  if (postGridAddress.length == 3) {
    let lastItem = postGridAddress[postGridAddress.length - 1];

    if (StreetSuffix.includes(lastItem)) {
      streetNumber = postGridAddress[0];
      streetName = postGridAddress[1];
    } else {
      streetNumber = postGridAddress[0];
      postGridAddress.shift();
      let streetNameArray = [];
      postGridAddress.forEach((item) => {
        streetNameArray.push(item);
      });
      streetName = streetNameArray.join(" ").toLowerCase();
    }

    return { streetNumber, streetName };
  } else if (postGridAddress.length > 3) {
    let lastItem = postGridAddress[postGridAddress.length - 1];
    let secondLastItem = postGridAddress[postGridAddress.length - 2];

    if (StreetSuffix.includes(secondLastItem) && lastItem.length == 1) {
      postGridAddress.pop();
      postGridAddress.pop();

      streetNumber = postGridAddress[0];

      let streetNameArray = [];
      let index;
      for (index = 0; index < postGridAddress.length; index++) {
        if (index != 0) {
          streetNameArray.push(postGridAddress[index]);
        }
      }
      streetName = streetNameArray.join(" ").toLowerCase();

      return { streetNumber, streetName };
    } else {
      streetNumber = postGridAddress[0];
      postGridAddress.shift();
      let streetNameArray = [];
      postGridAddress.forEach((item) => {
        let current = item.toUpperCase();
        if (StreetSuffix.includes(current)) {
        } else {
          streetNameArray.push(item);
        }
      });
      streetName = streetNameArray.join(" ").toLowerCase();
      return { streetNumber, streetName };
      //
    }
  } else {
    // console.log("Error addressArray larger than expected!");
    streetNumber = postGridAddress[0];
    streetName = postGridAddress[1];
    return { streetNumber, streetName };
  }
};

export default function SearchPropertyScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState(null);
  const [noResults, setnoResults] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const [propertyFound, setpropertyFound] = useState(false);
  const [propertyNotFound, setpropertyNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [bedroom, setBedroom] = useState("");
  const [bedroomPlus, setBedroomPlus] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bathroomsPlus, setBathroomsPlus] = useState("");
  const [sqft, setSqft] = useState("");
  const [ammenities, setAmenities] = useState([]);
  const [bedroomVisible, setbedroomVisible] = React.useState(false);
  const [bathroomVisible, setbathroomVisible] = React.useState(false);
  const [sqftVisible, setSqftVisible] = React.useState(false);

  const textRef = React.useRef();
  const { user, setUser, property, setproperty } = useContext(AuthContext);

  useEffect(() => {
    FindAmenities();
    textRef.current.focus()
  }, [property]);

  const showBathroomEdit = () => {
    if (
      property.details.numBathrooms == null ||
      property.details.numBathrooms == ""
    ) {
      setBathrooms("0");
    } else {
      setBathrooms(property.details.numBathrooms);
    }

    if (
      property.details.numBathroomPlus == null ||
      property.details.numBathroomPlus == ""
    ) {
      setBathroomsPlus("0");
    } else {
      setBathroomsPlus(property.details.numBathroomPlus);
    }

    setbathroomVisible(true);
  };

  function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  }

  const FindAmenities = () => {
    setAmenities([]);
    if (Object.keys(property).length === 0) {
      return;
    }
    let CondominiumAmmenities = property.condominium.ammenities;
    let nearbyAmmenities = property.nearby.ammenities;
    let fullAmenities = arrayUnique(
      CondominiumAmmenities.concat(nearbyAmmenities)
    );
    let finalArray = [];
    fullAmenities.forEach((item, index) => {
      if (item == null || item == "") {
        return;
      }
      const itemState = { name: item, selected: true };

      // setAmenities(currentArray)

      finalArray.push(itemState);
      return;
    });
    setAmenities((prevArray) => [...prevArray, ...finalArray]);
    // console.log(fullAmenities);
    // console.log(ammenities);
    // console.log(property);
  };

  const findLastSoldListing = (obj) => {
    // console.log("Repliers Property Listings:", obj);
    obj.forEach((item, index) => {
      if (
        item.soldPrice != null &&
        item.soldPrice != "0.00" &&
        item.soldPrice != ""
      ) {
        return item;
      }
    });
    return obj[0];
  };

  const showBedroomEdit = () => {
    if (
      property.details.numBedrooms == null ||
      property.details.numBedrooms == ""
    ) {
      setBedroom("0");
    } else {
      setBedroom(property.details.numBedrooms);
    }

    if (
      property.details.numBedroomsPlus == null ||
      property.details.numBedroomsPlus == ""
    ) {
      setBedroomPlus("0");
    } else {
      setBedroomPlus(property.details.numBedroomsPlus);
    }

    setbedroomVisible(true);
  };

  const showSqftDialog = () => {
    if (property.details.sqft == null || property.details.sqft == "") {
      setSqft("0");
    } else {
      setSqft(property.details.sqft);
    }
    setSqftVisible(true);
  };

  const hideBedroomDialog = () => {
    if (
      bedroom == property.details.numBedrooms &&
      bedroomPlus == property.details.numBedroomsPlus
    ) {
      setbedroomVisible(false);
      return;
    }

    let CurrentPropertyDetails = { ...property };
    CurrentPropertyDetails.details.numBedrooms = bedroom;
    CurrentPropertyDetails.details.numBedroomsPlus = bedroomPlus;

    setproperty(CurrentPropertyDetails);

    setbedroomVisible(false);
  };
  const hideBathroomDialog = () => {
    if (
      bathrooms == property.details.numBathrooms &&
      bathroomsPlus == property.details.numBathroomsPlus
    ) {
      setbathroomVisible(false);
      return;
    }

    let CurrentPropertyDetails = { ...property };
    CurrentPropertyDetails.details.numBathrooms = bathrooms;
    CurrentPropertyDetails.details.numBathroomsPlus = bathroomsPlus;
    setproperty(CurrentPropertyDetails);

    setbathroomVisible(false);
  };
  const hideSqftDialog = () => {
    if (sqft == property.details.sqft) {
      setSqftVisible(false);
      return;
    }
    let CurrentPropertyDetails = { ...property };
    CurrentPropertyDetails.details.sqft = sqft;

    setproperty(CurrentPropertyDetails);

    setSqftVisible(false);
  };

  const getPropertyDetails = (raw) => {
    const { streetNumber, streetName } = cleanAddress(raw);
    // console.log(streetName);
    // console.log(streetNumber);
    const REPLIERS_OPTIONS = {
      method: "GET",
      headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
    };

    const REPLIERS_ENDPOINT_WITHOUT_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName}&streetNumber=${streetNumber}&class=residential&type=sale&lastStatus=Sld`;

    const REPLIERS_ENDPOINT_WITH_STATUS_U = `https://api.repliers.io/listings/?streetName=${streetName}&streetNumber=${streetNumber}&status=U&class=residential&type=sale&lastStatus=Sld`;

    const ACHEIVED_LISTING_URL = `https://api.repliers.io/listings/archived/?streetName=${streetName}&streetNumber=${streetNumber}&class=residential&type=sale&lastStatus=Sld`;

    // console.log(REPLIERS_ENDPOINT_WITHOUT_STATUS_U);
    fetch(REPLIERS_ENDPOINT_WITHOUT_STATUS_U, REPLIERS_OPTIONS)
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        if (obj.listings.length == 0) {
          //try another end point
          fetch(REPLIERS_ENDPOINT_WITH_STATUS_U, REPLIERS_OPTIONS)
            .then((res) => res.json())
            .then((obj) => {
              if (obj.listings.length == 0) {
                // try yet another end point
                fetch(ACHEIVED_LISTING_URL, REPLIERS_OPTIONS)
                  .then((res) => res.json())
                  .then((obj) => {
                    if (obj.listings.length == 0) {
                      setpropertyNotFound(true);
                      setisFetching(false);
                    } else {
                      setproperty(findLastSoldListing(obj.listings));

                      setisFetching(false);
                      setpropertyFound(true);

                      // console.log(
                      //   JSON.stringify(findLastSoldListing(obj.listings))
                      // );
                    }
                  })
                  .catch((err) => {
                    // console.log(err);
                    setisFetching(false);
                    setpropertyNotFound(true);
                  });
              } else {
                setproperty(findLastSoldListing(obj.listings));

                setisFetching(false);
                setpropertyFound(true);

                // console.log(JSON.stringify(findLastSoldListing(obj.listings)));
              }
            })
            .catch((err) => {
              // console.log(err.message);
              setisFetching(false);
              setpropertyNotFound(true);
            });
        } else {
          setproperty(findLastSoldListing(obj.listings));

          setisFetching(false);
          setpropertyFound(true);

          // console.log(JSON.stringify(findLastSoldListing(obj.listings)));
        }
      })
      .catch((err) => {
        // console.log(err.message);
        setisFetching(false);
        setpropertyNotFound(true);
      });
  };

  const handleSearch = (e) => {
    setsearchValue(e);
    setpropertyFound(false);
    setpropertyNotFound(false);
    setnoResults(false);
    if (e == " ") {
      setSearchResults(null);
    } else {
      getAddressPreview(e);
    }
  };

  const handleSelect = (index) => {
    setisFetching(true);
    let RawAddress = searchResults.data[index].preview.address;
    setsearchValue(RawAddress);
    setSearchResults(null);
    //Call Repliers
    getPropertyDetails(RawAddress);
  };

  const handlePropertyAdding = () => {
    setLoading(true);
    const dataToSave = {
      bedrooms: property.details.numBedrooms,
      bedroomsPlus: property.details.numBedroomsPlus,
      bathrooms: property.details.numBathrooms,
      numBathroomsPlus: property.details.numBathroomsPlus,
      squareFeet: property.details.sqft,
      propertyType: property.details.propertyType,
      propertyClass: property.class,
      area: property.address.area,
      city: property.address.city,
      cmaPrice: "",
      propziPrice: "",
      neighbourhood: property.address.neighborhood,
      streetName: property.address.streetName,
      streetNumber: property.address.streetNumber,
      unitNumber: property.address.unitNumber,
    };

    dbh
      .collection("UserDetails")
      .doc(user.uid)
      .collection("Property")
      .add(dataToSave)
      .then(
        (info) => {
          info.get().then((ds) => {
            if (ds.data()) {
              navigation.replace("Main");
            }
          });
        },
        (err) => {
          // console.log(err.message);
          setLoading(false);
        }
      );
  };
  const getAddressPreview = (term) => {
    const APK_KEY = "live_sk_dRCPsWquUqHFmErbqbFd7f";
    const END_POINT = `https://api.repliers.io/listings/?keywords=${term}&status=U&condition=EXACT&operator=AND`;
    const OPTIONS = {
      method: "GET",
      headers: { "repliers-api-key": "FHm4VSqMMQEHpN5JRQYQGB2qQ3skdk" },
    };
    fetch(END_POINT, OPTIONS)
      .then((res) => res.json())
      .then((data) => {
        console.log("api request result: ",data);
        if (data.listings == undefined) {
          setSearchResults(null);
          setnoResults(true);
        } else {
          setnoResults(false);
          setSearchResults(data.listings);
          console.log("results data: ",data)
        }
      })
      .catch((err) => {
        setnoResults(true);
        console.log(err);
      });
  };

  const onMLSSelected = () => {
    setMLSSelected(true);
    setUpgradesSelected(false);
    setPropziVisitSelected(false);
  };

  const onUPgradesSelected = () => {
    setMLSSelected(false);
    setUpgradesSelected(true);
    setPropziVisitSelected(false);
  };

  const onPropziVisitSelected = () => {
    setMLSSelected(false);
    setUpgradesSelected(false);
    setPropziVisitSelected(true);
  };

  const handleBedroomEdit = (e) => {
    setBedroom(e);
  };

  const handleBedroomPlusEdit = (e) => {
    setBedroomPlus(e);
  };

  const handleBathroomEdit = (e) => {
    setBathrooms(e);
  };

  const handleBathroomPlusEdit = (e) => {
    setBathroomsPlus(e);
  };

  const handleSqftTextChange = (e) => {
    setSqft(e);
  };

  if (isLoading) {
    return <Loader text="" />;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          extraHeight={120}
          enableOnAndroid={true}
          style={{ height: "100%" }}
        >
          <Animated.View>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                lineHeight: 42,
                fontSize: 28,
                paddingHorizontal: 18,
                marginTop: "15%",
              }}
            >
              Let's start by finding your home
            </Text>
            <View style={[styles.resultsContainer, { marginTop: "10%" }]}>
              <TextInput
                autoFocus={true} 
                ref={textRef}
                placeholder="Search Address..."
                onChangeText={handleSearch}
                value={searchValue}
                editable={isFetching ? false : true}
                style={{
                  height: 50,
                  paddingHorizontal: 16,
                  fontFamily: "Poppins-Medium",
                }}
              />
              {noResults ? (
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    color: "gray",
                    fontSize: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "5%",
                  }}
                >
                  please enter your street address above
                </Text>
              ) : null}
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: searchResults ? "5%" : "0%",
                }}
              >
                {searchResults
                  ? searchResults.map((result, index) => (
                      <TouchableOpacity
                        onPress={() => handleSelect(index)}
                        style={{ height: 40 }}
                      >
                        <Text
                          key={index}
                          style={{
                            color: "gray",
                            fontSize: 13,
                            padding: 20,
                            fontFamily: "Poppins-Medium",
                          }}
                        >{result.address.unitNumber?`${result.address.unitNumber}, ${result.address.streetNumber}, ${result.address.streetName}`:`${result.address.streetNumber}, ${result.address.streetName}`}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </ScrollView>
            </View>

            <Portal>
              {/* Dialog 1 */}
              <Dialog
                visible={bedroomVisible}
                onDismiss={hideBedroomDialog}
                dismissable={false}
              >
                <Dialog.Content>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>number of Bedrooms:</Text>
                    <Input
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#000000",
                      }}
                      placeholder="Enter number of bedrooms"
                      onChangeText={handleBedroomEdit}
                      value={bedroom}
                    />
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>number of BedroomsPlus:</Text>
                    <Input
                      onChangeText={handleBedroomPlusEdit}
                      value={bedroomPlus}
                    />
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#46D0B6",
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      width: 80,
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                    onPress={hideBedroomDialog}
                  >
                    <Text style={{ color: "#ffffff" }}>Done</Text>
                  </TouchableOpacity>
                </Dialog.Content>
              </Dialog>
              {/* Dialog 2 */}
              <Dialog
                visible={bathroomVisible}
                onDismiss={hideBathroomDialog}
                dismissable={false}
              >
                <Dialog.Content>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>number of Bathrooms:</Text>
                    <Input
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#000000",
                      }}
                      placeholder="Enter number of bathrooms"
                      onChangeText={handleBathroomEdit}
                      value={bathrooms}
                    />
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>number of BathroomsPlus:</Text>
                    <Input
                      onChangeText={handleBathroomPlusEdit}
                      value={bathroomsPlus}
                    />
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#46D0B6",
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      width: 80,
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                    onPress={hideBathroomDialog}
                  >
                    <Text style={{ color: "#ffffff" }}>Done</Text>
                  </TouchableOpacity>
                </Dialog.Content>
              </Dialog>
              {/* Dialog 3 */}
              <Dialog
                visible={sqftVisible}
                onDismiss={hideSqftDialog}
                dismissable={false}
              >
                <Dialog.Content>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ flex: 1 }}>Approximate sqft:</Text>
                    <Input
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#000000",
                      }}
                      placeholder="Enter Appr Sqft e.g 300-500"
                      onChangeText={handleSqftTextChange}
                      value={sqft}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={hideSqftDialog}
                    style={{
                      backgroundColor: "#46D0B6",
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      width: 80,
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                  >
                    <Text style={{ color: "#ffffff" }}>Done</Text>
                  </TouchableOpacity>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Animated.View>
          <Text
            style={{
              fontSize: 14,
              padding: 20,
              textAlign: "center",
              color: "#828282",
              marginTop: "5%",
              fontFamily: "Poppins-Medium",
            }}
          >
            Enter your address and we will try to search for it automatically.
          </Text>
          {isFetching ? (
            <View style={{ marginTop: "20%" }}>
              <ActivityIndicator size="large" color="#46D0B6" />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: "5%",
                  marginHorizontal: 20,
                  textAlign: "center",
                }}
              >
                finding your home
              </Text>
            </View>
          ) : null}
          {propertyNotFound ? (
            <View
              style={{
                marginTop: "10%",
                marginHorizontal: 16,
                alignSelf: "center",
                JustifySelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  marginBottom: "4%",
                  textAlign: "center",
                }}
              >
                Oops! We can???t find your home info
              </Text>
              <Text
                style={{ fontSize: 17, textAlign: "center", color: "#828282" }}
              >
                we were unable to find your home details, press continue below
                to enter the details manually.
              </Text>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate("manual")}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {propertyFound ? (
            <View style={{ padding: 20, marginBottom: "20%" }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins-Medium" }}>
                Please Confirm Home Details Below
              </Text>

              <View>
                <View style={{ marginTop: "10%" }}>
                  <View style={{ marginBottom: "5%" }}>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      Address
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        color: "#A4A4A4",
                        marginTop: "5%",
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {property.address.streetNumber}{" "}
                      {property.address.streetName}{" "}
                      {property.address.neighborhood}{" "}
                      {property.address.district} {property.address.state}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                          fontFamily: "Poppins-Medium",
                        }}
                      >
                        Bedrooms
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          color: "#A4A4A4",
                          marginTop: "5%",
                          fontFamily: "Poppins-Medium",
                        }}
                      >{` number of Bedrooms ${
                        property.details.numBedrooms
                      } + ${
                        property.details.numBedroomsPlus == "" ||
                        property.details.numBedroomsPlus == null
                          ? "0"
                          : property.details.numBedroomsPlus
                      }`}</Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={showBedroomEdit}
                        style={{
                          borderRadius: 10,
                          backgroundColor: "#34D1B6",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            fontFamily: "Poppins-Bold",
                            fontFamily: "Poppins-Bold",
                          }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: "5%" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{ fontSize: 16, fontFamily: "Poppins-Medium" }}
                      >
                        Bathrooms
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          color: "#A4A4A4",
                          marginTop: "5%",
                          fontFamily: "Poppins-Medium",
                        }}
                      >{`number of Bathrooms ${
                        property.details.numBathrooms
                      } + ${
                        property.details.numBathroomsPlus == "" ||
                        property.details.numBathroomsPlus == null
                          ? "0"
                          : property.details.numBathroomsPlus
                      }`}</Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={showBathroomEdit}
                        style={{
                          borderRadius: 10,
                          backgroundColor: "#34D1B6",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            fontFamily: "Poppins-Bold",
                          }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: "5%" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{ fontSize: 16, fontFamily: "Poppins-Medium" }}
                      >
                        Space:Main Interior
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#A4A4A4",
                          marginTop: "5%",
                          fontFamily: "Poppins-Medium",
                        }}
                      >{` Sqft: ${
                        property.details.sqft == null ||
                        property.details.sqft == ""
                          ? "----"
                          : property.details.sqft
                      }`}</Text>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={showSqftDialog}
                        style={{
                          borderRadius: 10,
                          backgroundColor: "#34D1B6",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffffff",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            fontFamily: "Poppins-Bold",
                          }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (ammenities.length > 0) {
                      navigation.navigate("ammenities");
                      // console.log(ammenities);
                    } else {
                      let temp = { ...property };
                      temp["ammenities"] = ammenities;
                      // console.log(temp);
                      setproperty(temp);
                      // console.log("Ammenities", ammenities);
                      navigation.navigate("upgrades");
                    }
                  }}
                  style={{ marginTop: "20%", marginHorizontal: "5%" }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: "#46D0B6",
                      borderRadius: 20,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        fontFamily: "Poppins-Bold",
                      }}
                    >
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  resultsContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    width: width - 40,
    maxHeight: height / 2,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    marginTop: "10%",
  },
  continueButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#34D1B6",
    height: 50,
    width: width - 50,
    alignSelf: "center",
    marginTop: "10%",
  },
  pill: {
    flex: 1,
    height: 35,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: "1%",
    marginTop: "5%",
    paddingHorizontal: 10,
  },
  addHomeButton: {
    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",
    marginTop: "20%",
  },
  input: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  icon: {
    position: "absolute",
    right: 10,
    bottom: "75%",
  },
});
