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
import { WHITE, GRAY, PINK } from "../../assets/color";
import * as Font from "expo-font";
import CheckBox from "react-native-check-box";
import AppLoading from "expo-app-loading";
import apiLib from "../../assets/ApiStore";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
   });
};
export default function Signin() {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [isSelected, setSelection] = useState(false);
   const [mail, setMail] = useState("");
   const [pass, setPass] = useState("");
   // If fonts are loaded successfully
   if (fontsLoaded) {
      {
         /*--------------------- Call API function ---------------------*/
      }
      const callApi = async () => {
         await axios({
            method: "post",
            url: apiLib.register,
            data: {
               username: mail,
               password: pass,
            },
         })
            .then((res) => {
               if (res.status === 200) Alert.alert("Sign up sucessfully");
            })
            .catch((error) => {
               console.error(JSON.stringify(error));
            });
      };
      {
         /*--------------------- Validation function ---------------------*/
      }
      const validate = () => {
         const emailRegex =
            /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
         if (!emailRegex.test(mail)) {
            Alert.alert("Email is not valid");
            setMail("");
         }
      };
      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            {/*--------------------- Email Field ---------------------*/}
            <ScrollView style={styles.container}>
               <View style={styles.box}>
                  <View style={styles.emailView}>
                     <Text style={styles.email}>Email</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="name@domain.com"
                        onChangeText={(val) => setMail(val)}
                        value={mail}
                        onBlur={validate}
                     />
                  </View>
                  {/*--------------------- Password Field ---------------------*/}
                  <View style={styles.passView}>
                     <Text style={styles.email}>Password</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="**************"
                        onChangeText={(val) => setPass(val)}
                        secureTextEntry={true}
                     />
                  </View>
                  {/*--------------------- Re-Password Field ---------------------*/}
                  <View style={styles.passView}>
                     <Text style={styles.email}>Confirm Password</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="**************"
                        secureTextEntry={true}
                     />
                  </View>
                  {/*--------------------- Checkbox Field ---------------------*/}
                  <View style={styles.viewPrivacy}>
                     <CheckBox
                        isChecked={isSelected}
                        checkedCheckBoxColor={PINK}
                        onClick={() => {
                           setSelection(!isSelected);
                        }}
                        checkBoxColor={PINK}
                     />
                     <Text style={styles.textPrivacy}>
                        I agree with privacy and policy
                     </Text>
                  </View>
                  {/*--------------------- Confirm Button Field ---------------------*/}
                  <TouchableOpacity
                     style={
                        isSelected
                           ? styles.btnSignup
                           : { ...styles.btnSignup, backgroundColor: GRAY }
                     }
                     onPress={() => {
                        callApi();
                     }}
                     disabled={!isSelected}
                  >
                     <Text style={styles.textSignUp}>Sign Up</Text>
                  </TouchableOpacity>
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
      marginTop: 15,
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
   },
   viewPrivacy: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
   },
   textPrivacy: {
      fontFamily: "AveriaSansLibre",
      fontSize: 17,
      marginLeft: 7,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: "#6C6C6C",
      color: "black",
   },
   btnSignup: {
      width: 250,
      height: 54,
      marginVertical: 20,
      backgroundColor: PINK,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
   },
   textSignUp: {
      fontFamily: "AveriaSansLibre",
      fontSize: 30,
      color: WHITE,
   },
});
