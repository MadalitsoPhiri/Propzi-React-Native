import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import { btnSize, colors } from "../styles";
import { dbh, firebase } from "../../firebase";

// TODO:// Configure the title
export default function LoginScreen({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnEmailChange = (e) => {
    setEmail(e.toLowerCase());
    console.log(e);
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.toLowerCase());
    console.log(e);
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (user) => {
          setLoggedIn(true);
        },
        (err) => console.log(err)
      );
  };

  return (
    <ScrollView style={styles.authContainer}>
      {/* Logo */}
      <Text style={styles.title}>Lets create your Propzi account</Text>
      <Text
        style={{
          color: colors.SECONDARY_COLOR,
        }}
      >
        Get your value for free whenever you want
      </Text>
      <View
        style={{
          borderBottomColor: colors.BORDER_COLOR,
          borderBottomWidth: 1,
          marginVertical: 15,
        }}
      ></View>
      <Text style={styles.title}>Log In</Text>

      <View>
        <Text style={styles.label}>Email Address</Text>
        <AuthInput value={email} onChangeText={handleOnEmailChange} />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <AuthInput value={password} onChangeText={handleOnPasswordChange} />
      </View>
      <View style={styles.authBtn}>
        <Button
          onPress={handleLogin}
          title={"Login"}
          borderRadius={6}
          width={btnSize.SMALL_WIDTH}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text
            style={{
              color: colors.PRIMARY_COLOR,
              marginVertical: 13,
            }}
          >
            SignOut
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", color: colors.SECONDARY_COLOR }}>
          By clicking on "Create account" you agree to Propzi's Teams of
          Service,Including the Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
}
// TODO:// Add responsiveness to small card
const styles = StyleSheet.create({
  authContainer: {
    padding: 20,
  },

  label: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  authBtn: {
    marginVertical: 28,
  },
});
