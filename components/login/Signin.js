import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
   ScrollView,
   KeyboardAvoidingView,
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
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
   });
};
export default function Signin() {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [enableshift, setenableShift] = useState(false);
   const Divider = (props) => {
      return (
         <View {...props}>
            <View style={styles.line}></View>
            <Text style={styles.textOR}>or sign in with</Text>
            <View style={styles.line}></View>
         </View>
      );
   };
   // If fonts are loaded successfully
   if (fontsLoaded) {
      const Divider = (props) => {
         return (
            <View {...props}>
               <View style={styles.line}></View>
               <Text style={styles.textOR}>or sign in with</Text>
               <View style={styles.line}></View>
            </View>
         );
      };
      return (
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enable={enableshift}
         >
            <ScrollView style={styles.container}>
               <View style={styles.box}>
                  <View style={styles.emailView}>
                     <Text style={styles.email}>Email</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="name@domain.com"
                     />
                  </View>
                  <View style={styles.passView}>
                     <View style={styles.passAndButton}>
                        <Text style={styles.email}>Password</Text>
                        <TextInput
                           style={{ ...styles.textInput, width: 180 }}
                           placeholder="**************"
                           onFocus={() => setenableShift(true)}
                        />
                     </View>
                     <TouchableOpacity style={styles.btnLogin}>
                        <Icon name="chevron-right" size={20} color="white" />
                     </TouchableOpacity>
                  </View>
                  <Divider style={styles.divider}></Divider>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                     <FontAwesome.Button
                        name="facebook"
                        backgroundColor={FACEBOOK}
                        style={styles.socialBtn}
                     >
                        <Text style={styles.socialTitle}>Facebook</Text>
                     </FontAwesome.Button>
                     <View style={{ width: 20 }}></View>
                     <FontAwesome.Button
                        name="twitter"
                        backgroundColor={TWITTER}
                        style={{ ...styles.socialBtn, paddingLeft: 10 }}
                     >
                        <Text style={styles.socialTitle}>Twitter</Text>
                     </FontAwesome.Button>
                  </View>
                  <View style={{ height: 13 }}></View>
                  <FontAwesome.Button
                     name="google"
                     backgroundColor={GMAIL}
                     style={{ ...styles.socialBtn, paddingLeft: 20 }}
                  >
                     <Text style={{ ...styles.socialTitle, marginLeft: 0 }}>
                        Gmail
                     </Text>
                  </FontAwesome.Button>
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
                        marginHorizontal: 10,
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
      marginTop: 60,
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
