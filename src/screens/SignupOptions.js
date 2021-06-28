import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import PropziLogo from "../../assets/PropziLogo.svg";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import Loader from "../components/Loader";
import * as Crypto from "expo-crypto";
import { firebase, dbh } from "../../firebase";
import { actuatedNormalize } from "../utils/fontUtilities";

// TODO:// Configure the title
const { width, height } = Dimensions.get("window");
const LogoHeight = height * 0.05;
const LogoWidth = width * 0.2;
function calculateHeaderTextSize() {
  if (width == 375 && height == 667) {
    // for iphone 8
    return 20;
  } else if (width == 414 && height == 896) {
    return 25;
  } else {
    return 25;
  }
}

function calculateButtonTextSize() {
  if (width <= 375 && height <= 667) {
    // for phones like iphone 8
    return 12;
  } else if (width <= 414 && height <= 896) {
    //for phones like iphone 11
    return 15;
  } else {
    return 15;
  }
}

function calculatePrivacyTextSize() {
  if (width <= 375 && height <= 667) {
    // for phones like iphone 8
    return 9.7;
  } else if (width <= 414 && height <= 896) {
    //for phones like iphone 11
    return 11;
  } else {
    return 11;
  }
}
const buttonTextSize = calculateButtonTextSize();
const buttonIconHeight = height * 0.025;
const headerSize = calculateHeaderTextSize();
const PrivacyTextSize = calculatePrivacyTextSize();
export default function SignupOptions({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  async function handleAppleClick() {
    setLoading(true);
    const nonce = Math.random().toString(36).substring(2, 10);

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
      .then((hashedNonce) =>
        AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
          nonce: hashedNonce,
        })
      )
      .then((appleCredential) => {
        const { identityToken } = appleCredential;
        const provider = new firebase.auth.OAuthProvider("apple.com");
        const credential = provider.credential({
          idToken: identityToken,
          rawNonce: nonce,
        });
        return firebase
          .auth()
          .signInWithCredential(credential)
          .then((credential) => {
            //User Succsessfully signed in
            dbh
              .collection("UserDetails")
              .doc(credential.user.uid)
              .collection("User")
              .get()
              .then((docSnapshot) => {
                if (docSnapshot.size == 0) {
                  dbh
                    .collection(`UserDetails/${credential.user.uid}/User`)
                    .add({
                      fullName: credential.user.displayName,
                      phone: credential.user.phoneNumber,
                      email: credential.user.email,
                      clientIsMobile: true,
                    })
                    .then(
                      (obj) => {},
                      (err) => {
                        setLoading(false);
                        Alert.alert("Error", err.message, [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]);
                      }
                    );
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert("Error", error.message, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      })
      .catch((error) => {
        // ...
        setLoading(false);
        Alert.alert("Error", error.message, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  handlepress = async () => {
    setLoading(true);
    try {
      await Facebook.initializeAsync({
        // appId: Platform.OS === 'ios' ? '845016889691335':'185801686567133',
        appId: "845016889691335",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });

      if (type === "success") {
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

        var cred = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(cred)
          .then((credential) => {
            //User Succsessfully signed in
            dbh
              .collection("UserDetails")
              .doc(credential.user.uid)
              .collection("User")
              .get()
              .then((docSnapshot) => {
                if (docSnapshot.size == 0) {
                  dbh
                    .collection(`UserDetails/${credential.user.uid}/User`)
                    .add({
                      fullName: credential.user.displayName,
                      phone: credential.user.phoneNumber,
                      email: credential.user.email,
                      clientIsMobile: true,
                    })
                    .then(
                      (obj) => {},
                      (err) => {
                        setLoading(false);
                        Alert.alert("Alert Title", err.message, [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]);
                      }
                    );
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert("Alert Title", error.message, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        setLoading(false);
        return { cancelled: true };
      }
    } catch ({ message }) {
      setLoading(false);
      Alert.alert("Alert Title", message, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  signInWithGoogleAsync = async () => {
    setLoading(true);
    //ios auth client id standalone 520048464069-3smfj9dv9rhld1l5dm3qrkivnq7i3hh0.apps.googleusercontent.com
    try {
      const result = await Google.logInAsync({
        androidClientId: `520048464069-drl8djviqeoa9crvdv5q05ighkb5eq1m.apps.googleusercontent.com`,
        iosClientId: `520048464069-sniestaiiavj4fa9ct390dkaogj16ad6.apps.googleusercontent.com`,
        iosStandaloneAppClientId:
          "520048464069-3smfj9dv9rhld1l5dm3qrkivnq7i3hh0.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        var cred = firebase.auth.GoogleAuthProvider.credential(result);
        firebase
          .auth()
          .signInWithCredential(cred)
          .then((credential) => {
            //User Succsessfully signed in
            dbh
              .collection("UserDetails")
              .doc(credential.user.uid)
              .collection("User")
              .get()
              .then((docSnapshot) => {
                if (docSnapshot.size == 0) {
                  dbh
                    .collection(`UserDetails/${credential.user.uid}/User`)
                    .add({
                      fullName: credential.user.displayName,
                      phone: credential.user.phoneNumber,
                      email: credential.user.email,
                      clientIsMobile: true,
                    })
                    .then(
                      (obj) => {},
                      (err) => {
                        setLoading(false);
                        setError(err);
                      }
                    );
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

        return result.accessToken;
      } else {
        setLoading(false);
        return { cancelled: true };
      }
    } catch (e) {
      setLoading(false);
      setError(e);
      return { error: true };
    }
  };

  if (isLoading) {
    return <Loader text="" />;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height }}>
      {/* <ScrollView style={[styles.authContainer]}> */}
      <View style={styles.Header}>
        <PropziLogo height={LogoHeight} width={LogoWidth} />
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={[styles.headerText]}>
            {" "}
            Discover the true value of your home
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={handleAppleClick}
            style={[styles.signInButton, { backgroundColor: "#000000" }]}
          >
            <View style={styles.container1}>
              <AntDesign name="apple1" size={buttonIconHeight} color="white" />

              <Text style={[styles.buttonText, { color: "white" }]}>
                Sign in with Apple
              </Text>
            </View>

            <Entypo
              name="chevron-right"
              size={buttonIconHeight}
              color="white"
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={handlepress}
          style={[styles.signInButton, { backgroundColor: "#4267B2" }]}
        >
          <View style={styles.container1}>
            <AntDesign
              name="facebook-square"
              size={buttonIconHeight}
              color="white"
            />

            <Text style={[styles.buttonText, { color: "white" }]}>
              Continue with Facebook
            </Text>
          </View>

          <Entypo name="chevron-right" size={buttonIconHeight} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signInWithGoogleAsync}
          style={[styles.signInButton, { backgroundColor: "#4285F4" }]}
        >
          <View style={styles.container1}>
            <AntDesign name="google" size={buttonIconHeight} color="white" />

            <Text style={[styles.buttonText, { color: "white" }]}>
              Continue with Google
            </Text>
          </View>

          <Entypo name="chevron-right" size={buttonIconHeight} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signUp");
          }}
          style={[styles.signInButton, { backgroundColor: "#f1f1fb" }]}
        >
          <View style={styles.container1}>
            <FontAwesome
              name="envelope"
              size={buttonIconHeight}
              color="#c0c7d9"
            />

            <Text style={[styles.buttonText, { color: "#686874" }]}>
              Continue with email
            </Text>
          </View>

          <Entypo
            name="chevron-right"
            size={buttonIconHeight}
            color="#c0c7d9"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
          style={{
            marginTop: "10%",
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#686874",
              fontSize: buttonTextSize,
              fontFamily: "Poppins-Regular",
              marginRight: 10,
            }}
          >
            Log in to existing account
          </Text>
          <Entypo
            name="chevron-right"
            size={buttonIconHeight}
            color="#c0c7d9"
          />
        </TouchableOpacity>
      </View>

      {/* </ScrollView> */}
      <View style={styles.footer}>
        <Text
          style={{
            color: "#c0c7d9",
            fontFamily: "Poppins-Regular",
            fontSize: PrivacyTextSize,
            textAlign: "center",
            alignItems: "flex-end",
            marginBottom: "5%",
          }}
        >
          By using this app, you agree to the{" "}
          <Text style={{ fontFamily: "Poppins-Regular", color: "#686874" }}>
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text style={{ color: "#686874", fontFamily: "Poppins-Regular" }}>
            Privacy Policy
          </Text>
          .You also agree to receive product related emails from Propzi which
          you can unsubscribe at any time.
        </Text>
      </View>
    </SafeAreaView>
  );
}
// TODO:// Add responsiveness to small card
const styles = StyleSheet.create({
  authContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    height,
    paddingTop: "2%",
    backgroundColor: "#fff",
  },

  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    marginLeft: 16,
    fontWeight: "700",
    fontSize: buttonTextSize,
    lineHeight: 23,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: headerSize,
    marginBottom: "7%",
    fontFamily: "Poppins-Bold",
    lineHeight: 42,
  },
  footer: {
    flex: 0.5,
    paddingHorizontal: "5%",
    justifyContent: "flex-end",
  },
  Header: {
    paddingHorizontal: "10%",
    flex: 0.8,
    justifyContent: "space-around",
  },
  body: {
    flex: 1,
    paddingHorizontal: "10%",
    justifyContent: "flex-start",
  },
  signInButton: {
    marginVertical: "2%",
    borderRadius: 12,
    padding: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container1: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
