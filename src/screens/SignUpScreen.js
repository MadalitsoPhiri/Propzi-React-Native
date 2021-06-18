import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { btnSize, colors } from "../styles";
import EmailIcon from "../../assets/envelope-regular.svg";
import LockIcon from "../../assets/lock-solid.svg";
import PhoneIcon from "../../assets/phone-alt-solid.svg";
import UserIcon from "../../assets/user-regular.svg";
import { Formik } from "formik";
import * as yup from "yup";
import { firebase, dbh } from "../../firebase";
import Loader from "../components/Loader";
import { ActivityIndicator } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpSchema = yup.object({
  fullName: yup.string().required("full name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "Password is too short - should be 8 chars minimum"),
  confirmPassword: yup
    .string()
    .required("please confirm your password")
    .when("password", (password, schema) => {
      return schema.test({
        test: (confirmPassword) => password === confirmPassword,
        message: "passwords must match!",
      });
    }),
});

// TODO:// Configure the title

const { width, height } = Dimensions.get("window");

export default function SignUpScreen({ navigation }) {
  const [isHidden, setHidden] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  const setHiddenValue = () => {
    if (isHidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const handleCreateAccount = (info) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(info.email, info.password)
      .then(
        (credential) => {
          dbh
            .collection(`UserDetails/${credential.user.uid}/User`)
            .add({
              fullName: info.fullName,
              phone: info.phone,
              email: info.email,
            })
            .then(
              (obj) => {},
              (err) => {
                setLoading(false);
                setError(err);
              }
            );
        },
        (err) => {
          setLoading(false);
          setError(err);
        }
      );
  };

  if (isLoading) {
    return <Loader text="Signing up..." />;
  }

  return (
    <KeyboardAwareScrollView extraHeight={120} enableOnAndroid={true}>
      {/* Logo */}
      <View style={styles.authContainer}>
        <Formik
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            console.log(values);
            handleCreateAccount(values);
          }}
        >
          {(props) => (
            <View>
              <Text style={styles.title}>Lets create your Propzi account</Text>
              <Text
                style={{
                  color: colors.SECONDARY_COLOR,
                  fontSize: 13,
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
                <View style={[styles.input, { width: "100%" }]}>
                  <UserIcon
                    height={20}
                    width={20}
                    style={{ marginRight: "5%", color: "#BDBDBD" }}
                  />
                  <TextInput
                    placeholder={"Full name"}
                    autoCorrect={true}
                    onChangeText={props.handleChange("fullName")}
                    value={props.values.fullName}
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4F4F4F",
                      marginRight: "12%",
                    }}
                    onBlur={props.handleBlur("fullName")}
                  />
                </View>
              </View>
              {props.touched.fullName && props.errors.fullName ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {props.errors.fullName}
                </Text>
              ) : null}

              <View>
                <Text style={styles.label}>Phone</Text>
                <View style={[styles.input, { width: "100%" }]}>
                  <PhoneIcon
                    height={20}
                    width={20}
                    style={{ marginRight: "5%", color: "#BDBDBD" }}
                  />
                  <TextInput
                    placeholder={"Enter Phone"}
                    autoCorrect={true}
                    onChangeText={props.handleChange("phone")}
                    value={props.values.phone}
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4F4F4F",
                      marginRight: "12%",
                    }}
                    onBlur={props.handleBlur("phone")}
                  />
                </View>
              </View>

              {props.touched.phone && props.errors.phone ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {props.errors.phone}
                </Text>
              ) : null}

              <View>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.input, { width: "100%" }]}>
                  <EmailIcon
                    height={20}
                    width={20}
                    style={{ marginRight: "5%", color: "#BDBDBD" }}
                  />
                  <TextInput
                    placeholder={"Enter Email"}
                    autoCorrect={true}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4F4F4F",
                      marginRight: "12%",
                    }}
                    onBlur={props.handleBlur("email")}
                  />
                </View>
              </View>

              {props.touched.email && props.errors.email ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {props.errors.email}
                </Text>
              ) : null}

              <View>
                <Text style={styles.label}>Create password</Text>
                <View style={[styles.input, { width: "100%" }]}>
                  <LockIcon
                    height={20}
                    width={20}
                    style={{ marginRight: "5%", color: "#BDBDBD" }}
                  />
                  <TextInput
                    placeholder={"Password"}
                    autoCorrect={true}
                    onChangeText={props.handleChange("password")}
                    secureTextEntry={isHidden ? true : false}
                    value={props.values.password}
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4F4F4F",
                      flex: 1,
                      marginRight: "5%",
                    }}
                    onBlur={props.handleBlur("password")}
                  />
                  <TouchableOpacity onPress={setHiddenValue}>
                    {isHidden ? (
                      <Text
                        style={{
                          flex: 0.2,
                          textAlign: "right",
                          color: "#4F4F4F",
                          paddingBottom: 10,
                        }}
                      >
                        Show
                      </Text>
                    ) : (
                      <Text
                        style={{
                          flex: 0.2,
                          textAlign: "right",
                          color: "#4F4F4F",
                          paddingBottom: 10,
                        }}
                      >
                        Hide
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {props.touched.password && props.errors.password ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {props.errors.password}
                </Text>
              ) : null}

              <View>
                <Text style={styles.label}>Confirm password</Text>
                <View style={[styles.input, { width: "100%" }]}>
                  <LockIcon
                    height={20}
                    width={20}
                    style={{ marginRight: "5%", color: "#BDBDBD" }}
                  />
                  <TextInput
                    placeholder={"Confirm"}
                    autoCorrect={true}
                    onChangeText={props.handleChange("confirmPassword")}
                    secureTextEntry={isHidden ? true : false}
                    value={props.values.confirmPassword}
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: "#4F4F4F",
                      flex: 1,
                      marginRight: "5%",
                    }}
                    onBlur={props.handleBlur("confirmPassword")}
                  />
                  <TouchableOpacity onPress={setHiddenValue}>
                    {isHidden ? (
                      <Text
                        style={{
                          flex: 0.2,
                          textAlign: "right",
                          color: "#4F4F4F",
                          paddingBottom: 10,
                        }}
                      >
                        Show
                      </Text>
                    ) : (
                      <Text
                        style={{
                          flex: 0.2,
                          textAlign: "right",
                          color: "#4F4F4F",
                          paddingBottom: 10,
                        }}
                      >
                        Hide
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {props.touched.confirmPassword && props.errors.confirmPassword ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {props.errors.confirmPassword}
                </Text>
              ) : null}

              {Error ? (
                <Text style={{ marginTop: "5%", color: "red" }}>
                  {Error.message}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={props.handleSubmit}
                style={styles.authBtn}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "700",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Create account
                </Text>
              </TouchableOpacity>

              <View style={{ alignItems: "center", marginBottom: "20%" }}>
                <Text>Already have an account?</Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.replace("login");
                  }}
                >
                  <Text
                    style={{
                      color: "#6FCF97",
                      marginVertical: 13,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: "center",
                    color: colors.SECONDARY_COLOR,
                    fontSize: 11,
                  }}
                >
                  By clicking on "Create account" you agree to Propzi's Teams of
                  Service,Including the Privacy Policy
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
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
  },

  title: {
    color: "#4F4F4F",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  authBtn: {
    marginTop: "20%",
    marginBottom: "10%",
    width: "65%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#6FCF97",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 16,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
});
