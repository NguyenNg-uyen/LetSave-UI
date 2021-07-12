import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  WHITE,
  GRAY,
  PINK,
  FACEBOOK,
  GMAIL,
  TWITTER,
} from "../../assets/color";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import apiLib from "../../assets/ApiStore";
// Set up letter fonts
const getFonts = () => {
  return Font.loadAsync({
    AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
  });
};
export default function Signin(props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // If fonts are loaded successfully
  if (fontsLoaded) {
    // Divide social and login
    const Divider = (props) => {
      return (
        <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>or sign in with</Text>
          <View style={styles.line}></View>
        </View>
      );
    };
    {
      /*--------------------- Call API function ---------------------*/
    }
    const callApi = async () => {
      // await axios({
      //    method: "post",
      //    headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //    },
      //    url: apiLib.login,
      //    data: {
      //       username: "sysadmin",
      //       password: "sysadmin",
      //    },
      // })
      //    .then((res) => {
      //       // if (res.status == 404) props.navigation.navigate("Home");
      //       props.navigation.navigate("Home");
      //    })
      //    .catch((error) => {
      //       console.error(error);
      //    });
      props.navigation.navigate("Home");
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.box}>
            {/*--------------------- Email input and label ---------------------*/}
            <View style={styles.emailView}>
              <Text style={styles.email}>Email</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                placeholder="name@domain.com"
                onChangeText={(val) => setMail(val)}
              />
            </View>
            {/*--------------------- Password input and label --------------------- */}
            <View style={styles.passView}>
              <View style={styles.passAndButton}>
                <Text style={styles.email}>Password</Text>
                <TextInput
                  style={{ ...styles.textInput, width: 180 }}
                  placeholder="**************"
                  secureTextEntry={true}
                  onChangeText={(val) => setPass(val)}
                />
              </View>
              {/*------------ Login button ---------------*/}
              <TouchableOpacity
                style={
                  mail == "" || pass == ""
                    ? { ...styles.btnLogin, backgroundColor: GRAY }
                    : styles.btnLogin
                }
                onPress={() => {
                  callApi();
                }}
                disabled={mail == "" || pass == ""}
              >
                <Icon name="chevron-right" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider}></Divider>
            {/*--------------------- Social login methods ---------------------*/}
            <View style={{ display: "flex", flexDirection: "row" }}>
              {/* --------------------- Facebook --------------------- */}
              <FontAwesome.Button
                name="facebook"
                backgroundColor={FACEBOOK}
                style={styles.socialBtn}
              >
                <Text style={styles.socialTitle}>Facebook</Text>
              </FontAwesome.Button>
              <View style={{ width: 20 }}></View>
              {/* --------------------- Twitter --------------------- */}
              <FontAwesome.Button
                name="twitter"
                backgroundColor={TWITTER}
                style={{ ...styles.socialBtn, paddingLeft: 10 }}
              >
                <Text style={styles.socialTitle}>Twitter</Text>
              </FontAwesome.Button>
            </View>
            <View style={{ height: 13 }}></View>
            {/* --------------------- Google --------------------- */}
            <FontAwesome.Button
              name="google"
              backgroundColor={GMAIL}
              style={{ ...styles.socialBtn, paddingLeft: 20 }}
            >
              <Text style={{ ...styles.socialTitle, marginLeft: 0 }}>
                Gmail
              </Text>
            </FontAwesome.Button>
            {/* Forgot password and continue as guesst */}
            <Text
              style={{
                ...styles.textForgotAndContinue,
                fontSize: 15,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#6C6C6C",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Forgot password
            </Text>
            <Text
              style={{
                ...styles.textForgotAndContinue,
                fontSize: 20,
                marginVertical: 5,
              }}
            >
              Continue as guesst
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  // In case fonts are not loaded successfully
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => console.warn}
      />
    );
  }
}

// Style
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  box: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  emailView: {
    marginTop: 50,
  },
  email: {
    fontSize: 20,
    marginBottom: 3,
    fontFamily: "AveriaSansLibre",
  },
  textInput: {
    width: 250,
    height: 45,
    fontSize: 20,
    padding: 0,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
    fontFamily: "AveriaSansLibre",
  },
  passView: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  passAndButton: {
    display: "flex",
    flexDirection: "column",
  },
  btnLogin: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: PINK,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginTop: 17,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: "#6C6C6C",
    marginHorizontal: 5,
  },
  textOR: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "#6C6C6C",
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    height: 21,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  fbAndGoogle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialBtn: {
    width: 120,
    height: 31,
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 18,
    color: WHITE,
  },
  textForgotAndContinue: {
    fontFamily: "AveriaSansLibre",
    color: "#6C6C6C",
  },
});
