import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import { btnSize, colors } from "../styles";

// TODO:// Configure the title
export default function SignUpScreen() {
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
      <Text style={styles.title}>Sign Up</Text>
      <View>
        <Text style={styles.label}>Full name</Text>
        <AuthInput />
      </View>
      <View>
        <Text style={styles.label}>Phone Number</Text>
        <AuthInput />
      </View>
      <View>
        <Text style={styles.label}>Email Address</Text>
        <AuthInput />
      </View>
      <View>
        <Text style={styles.label}>Create Password</Text>
        <AuthInput />
      </View>
      <View>
        <Text style={styles.label}>Confirm Passowrd</Text>
        <AuthInput />
      </View>
      <View style={styles.authBtn}>
        <Button title={"Create"} borderRadius={6} width={btnSize.SMALL_WIDTH} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>Already have an account?</Text>
        <Text
          style={{
            color: colors.PRIMARY_COLOR,
            marginVertical: 13,
          }}
        >
          Login
        </Text>
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
