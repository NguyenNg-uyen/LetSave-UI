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
import { WHITE, GRAY, PINK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { CheckBox } from "react-native-elements";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
   });
};
export default function Signin() {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [enableshift, setenableShift] = useState(false);
   const [isSelected, setSelection] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
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
                     <Text style={styles.email}>Password</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="**************"
                        onFocus={() => setenableShift(true)}
                     />
                  </View>
                  <View style={styles.passView}>
                     <Text style={styles.email}>Confirm Password</Text>
                     <TextInput
                        style={styles.textInput}
                        placeholder="**************"
                        onFocus={() => setenableShift(true)}
                     />
                  </View>
                  <View style={styles.viewPrivacy}>
                     <CheckBox
                        checked={true}
                        onValueChange={setSelection}
                        checkedColor="red"
                        title="Click here"
                     />
                  </View>
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
   },
   viewPrivacy: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
});
