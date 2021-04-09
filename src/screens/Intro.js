import React,{useContext}from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Slide from "../components/Slide";
import {AuthContext} from "../components/providers/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  header: {
    flex: 0.17,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  slider: {
    flex: 1,
  },
  footer: {
    flex: 0.6,
  },
  logo: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  btnContainer: {
    alignItems: "center",
  },
  btn: {
    paddingVertical: 13,
    paddingHorizontal: 30,
    backgroundColor: "#34d1b4",
    textAlign: "center",
    borderRadius: 10,
    width: "90%",
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    overflow: "hidden",
  },
});
const { width, height } = Dimensions.get("window");

function Login() {
  setisFirstLaunch(false);
}
function SignUp() {
  setisFirstLaunch(false);
}

async function setViewedOnboarding(){
  try{
      await AsyncStorage.setItem('@viewedOnboarding','true');
  }catch{
    console.log('Error @checkOnboarding:',err)
  }
}

const slides = [
  <Slide
    label="Check your home value quickly and easily online"
    image={require("../../assets/onboading_assets/DollarSearch.png")}
  />,
  <Slide
    label="Browse mortgages and loans
             that lower your housing costs"
    image={require("../../assets/onboading_assets/IMG_1131.png")}
  />,
  <Slide
    label="Get Propzi alerts on developments and renovations in your area"
    image={require("../../assets/onboading_assets/IMG_1132.png")}
  />,
];

var scrollX;

export default function Intro({ navigation }) {

  const {isFirstLaunch, setisFirstLaunch} = useContext(AuthContext)
  scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  return (
    <SafeAreaView style={styles.container}>
   
      <View style={styles.slider}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            // Animated.event returns a function that takes an array where the first element...
            [{ nativeEvent: { contentOffset: { x: scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
          )}
          scrollEventThrottle={16}
        >
          {slides.map((source, i) => {
            // for every object in the photos array...

            return (
              // ... we will return a square Image with the corresponding object as the source
              slides[i]
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: "5%",
            justifyContent: "center",
          }}
        >
          {slides.map((_, i) => {
            // for every object in the photos array...
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
              outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
              extrapolate: "clamp", // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
            });

            return (
              <Animated.View // we will animate the opacity of the dots later, so use Animated.View instead of View here
                key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#34d1b6",
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
        <View style={{ marginTop: "10%" }}>
          <TouchableOpacity
            onPress={() => { 
              setViewedOnboarding()
              navigation.replace('signupOptions')
          }}
            style={{ padding: 5 }}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.btn}>Get Started</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "5%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Already a member?</Text>
            <TouchableOpacity
              onPress={() => {
                setViewedOnboarding()
                navigation.replace('login')
              }}
              style={{ padding: 5 }}
            >
              <Text
                style={{ fontSize: 16, color: "#34d1b4", marginLeft: "2%" }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

/**/
