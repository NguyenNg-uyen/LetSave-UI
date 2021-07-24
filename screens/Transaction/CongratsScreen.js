import React, { useState } from "react";
// Library
import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TextInput,
   Button,
} from "react-native";
import AppLoading from "expo-app-loading";
import CurrencyInput from "react-native-currency-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

// Image
import transactionIMG from "../.././assets/images/AddTransaction01.png";
import icon_Expense from "../.././assets/images/icon_expense.png";
import icon_Income from "../.././assets/images/icon_income.png";
import icon_Category from "../.././assets/images/icon_category.png";
import congratsImg from "../.././assets/images/CongratIMG.png";
import { GREEN, MEDIUM_PINK } from "../.././assets/color";
// Screen
import DailyScreen from "../Daily Report/DailyScreen";
import CategoryList from "../Setting/CategoryList";
// Font
import * as Font from "expo-font";
const getFonts = () => {
   return Font.loadAsync({
      PoppinsBold: require("../.././assets/fonts/Poppins-Bold.ttf"),
      PoppinsMed: require("../.././assets/fonts/Poppins-Medium.ttf"),
      PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),
   });
};
function CongratsScreen({ route, navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   if (fontsLoaded) {
      return (
         <View style={{ flexDirection: "column" }}>
            <View
               style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               <Image
                  source={congratsImg}
                  style={{ marginTop: 60, width: 280, height: 217 }}
               ></Image>
               <Text style={styles.congrats_text}>Congratulation!</Text>
               <Text style={{ fontSize: 14 }}>
                  Your transaction is successfully added to the app
               </Text>
            </View>
            <View style={styles.congrats_Container}>
               {/* Category */}
               <View style={{ flexDirection: "column", marginTop: 30 }}>
                  <Text style={styles.text_label}>Category</Text>
                  <Text style={styles.text_info}>{route.params.cate}</Text>
               </View>
               {/* Transaction Type - Date */}
               <View style={{ flexDirection: "row", marginTop: 30 }}>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.text_label}>Transaction type</Text>
                     <Text style={styles.text_info}>{route.params.type}</Text>
                  </View>
                  <View style={styles.verticleLine}></View>
                  <View style={{ flexDirection: "column", marginLeft: 25 }}>
                     <Text style={styles.text_label}>Date</Text>
                     <Text style={styles.text_info}>{route.params.inDate}</Text>
                  </View>
               </View>
               {/* Horizontal line */}
               <View style={styles.horizontalline}></View>
               {/*  Amount, finish button */}
               <View
                  style={{
                     flexDirection: "row",
                     marginTop: 30,
                     position: "relative",
                  }}
               >
                  <View style={{ flexDirection: "column" }}>
                     <Text style={{ fontSize: 20, fontFamily: "PoppinsReg" }}>
                        Amount
                     </Text>
                     <Text style={{ fontSize: 28, fontFamily: "PoppinsBold" }}>
                        ${route.params.inAmount}
                     </Text>
                  </View>
                  {/*==============  Finish Button =====================*/}
                  {/* Link to daily transaction  */}
                  <TouchableOpacity
                     style={styles.btn_Finish2}
                     onPress={() => navigation.push("Home")}
                  >
                     <Text
                        style={{
                           fontSize: 18,
                           fontFamily: "PoppinsBold",
                           color: "#FF3378",
                        }}
                     >
                        Finish
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   } else {
      return (
         <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={() => console.warn}
         />
      );
   }
}
const styles = StyleSheet.create({
   container: {
      // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative",
   },
   containerDetail: {
      flex: 1,
      // display: "flex",
      flexDirection: "column",
      // position: "relative",
      marginTop: 30,
      marginLeft: 20,
   },
   btn_Container: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      position: "relative",
      justifyContent: "center",
   },
   transactionImg: {
      top: 30,
      width: 346,
      height: 324,

      alignItems: "center",
   },
   textStyle: {
      paddingTop: 40,
      fontSize: 22,
      fontFamily: "PoppinsBold",
      textAlign: "center",
   },
   iconImg: {
      width: 60,
      height: 60,
      marginTop: 10,
   },
   btn_Income: {
      marginTop: 30,
      width: 150,
      height: 196,
      borderRadius: 20,
      backgroundColor: "#fff",
      elevation: 20,
      paddingLeft: 15,
   },
   btn_Expense: {
      marginLeft: 30,
      marginTop: 30,
      width: 150,
      height: 196,
      borderRadius: 20,
      backgroundColor: "#fff",
      elevation: 20,
      paddingLeft: 15,
   },
   btn_Text: {
      marginTop: 90,
      fontSize: 22,
      fontFamily: "PoppinsBold",
   },
   text_input: {
      fontSize: 24,
      fontFamily: "PoppinsBold",
   },
   text_label: {
      fontSize: 14,
      fontFamily: "PoppinsMed",
   },
   text_info: {
      fontSize: 20,
      fontFamily: "PoppinsBold",
   },
   btn_Finish: {
      alignItems: "center",
      justifyContent: "center",
      width: 100,
      height: 46,
      backgroundColor: "#FF3378",
      marginLeft: 60,
      elevation: 5,
      borderRadius: 10,
   },
   congrats_text: {
      marginTop: 10,
      fontFamily: "PoppinsReg",
      fontSize: 18,
   },
   congrats_Container: {
      paddingLeft: 25,
      flexDirection: "column",
      backgroundColor: "#fff",
      width: 364,
      height: 367,
      margin: 25,
      borderStyle: "dashed",
      borderWidth: 2,
      borderRadius: 3,
      borderColor: "#c2c2c2",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   verticleLine: {
      height: "100%",
      width: 1,
      backgroundColor: "#909090",
      marginLeft: 42,
      backgroundColor: "#c2c2c2",
   },
   horizontalline: {
      height: 1,
      width: 290,
      backgroundColor: "#909090",
      marginLeft: 18,
      borderColor: "#c2c2c2",
      borderStyle: "dashed",
      borderWidth: 1,
      borderRadius: 1,
      marginTop: 27,
   },
   btn_Finish2: {
      alignItems: "center",
      justifyContent: "center",
      width: 110,
      height: 55,
      borderColor: "#FF3378",
      borderRadius: 18,
      borderWidth: 1,
      position: "absolute",
      right: 15,
      top: 15,
      backgroundColor: "white",
   },
});
export default CongratsScreen;
