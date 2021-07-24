import React, { useEffect, useState } from "react";
// Library
import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TextInput,
   Button,
   Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import CurrencyInput from "react-native-currency-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import apiLib from "../../assets/ApiStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Image
import transactionIMG from "../.././assets/images/AddTransaction01.png";
import icon_Expense from "../.././assets/images/icon_expense.png";
import icon_Income from "../.././assets/images/icon_income.png";
import icon_Category from "../.././assets/images/icon_category.png";
import congratsImg from "../.././assets/images/CongratIMG.png";
import { GREEN, MEDIUM_PINK } from "../.././assets/color";
// Screen
import DailyScreen from "../Daily Report/DailyScreen";
// Font
import * as Font from "expo-font";
import axios from "axios";
const getFonts = () => {
   return Font.loadAsync({
      PoppinsBold: require("../.././assets/fonts/Poppins-Bold.ttf"),
      PoppinsMed: require("../.././assets/fonts/Poppins-Medium.ttf"),
      PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),
   });
};
function AddExpense({ navigation, route }) {
   let CategoryId, categoryName, CategoryImg;
   if (route.params !== undefined) {
      CategoryId = route.params.categoryID;
      categoryName = route.params.categoryName;
      CategoryImg = route.params.categoryImg;
   }
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [cateIcon, setCateIcon] = useState("");
   //=========== Date Picker  =================
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [date, setDate] = useState(moment().format("LL"));
   const showDatePicker = () => {
      setDatePickerVisibility(true);
   };
   const hideDatePicker = () => {
      setDatePickerVisibility(false);
   };
   const handleConfirm = (date) => {
      hideDatePicker();
      const formatDate = moment(date).format("LL");
      setDate(formatDate);
   };
   // =========== Input Data ===========
   const [amount, setAmount] = React.useState(0);
   if (fontsLoaded) {
      //================ Insert Expense API ======================
      async function insertExpense() {
         // Insert data
         const inputData = {
            type: "Expense",
            amount: amount,
            categoryId: CategoryId,
            note: "null",
         };
         let username = await AsyncStorage.getItem("username");
         let password = await AsyncStorage.getItem("password");
         // Check input field not blank
         if (inputData.amount == null || inputData.categoryId == null) {
            Alert.alert("Please fill in all fields");
         } else {
            const res = await axios({
               method: "POST",
               url: apiLib.createTransaction,
               auth: {
                  username: username,
                  password: password,
               },
               data: inputData,
            });
            if (res.status == 200) {
               navigation.navigate("CongratsScreen", {
                  // Pass data to Congrats Screen
                  type: "Expense",
                  cate: categoryName,
                  inDate: date,
                  inAmount: amount,
               });
            } else {
               Alert.alert("Insert new transaction unsuccessful");
            }
         }
      }

      return (
         <View style={[styles.containerDetail]}>
            {/* =================  1st row - Type & Amount ================= */}
            <View style={{ flexDirection: "row", marginLeft: 3 }}>
               <Image source={icon_Expense} style={{ width: 42, height: 42 }} />
               <View style={{ flexDirection: "column" }}>
                  <Text style={[{ marginLeft: 10 }, styles.text_label]}>
                     Transaction type
                  </Text>
                  <Text
                     style={[
                        { marginLeft: 10, marginTop: 8, marginRight: 0 },
                        styles.text_input,
                     ]}
                  >
                     Expense
                  </Text>
               </View>
               <View style={{ flexDirection: "column" }}>
                  <Text style={[{ marginLeft: 60 }, styles.text_label]}>
                     Amount
                  </Text>
                  <CurrencyInput
                     style={[
                        { marginLeft: 60, flex: 1, marginRight: 10 },
                        styles.text_input,
                     ]}
                     value={amount}
                     onChangeValue={setAmount}
                     prefix="$"
                     delimiter=","
                     separator="."
                     precision={0}
                     maxValue="10000000"
                  />
               </View>
            </View>
            {/*=================  2nd row - Category ================= */}
            <View
               style={{
                  flexDirection: "row",
                  marginLeft: 3,
                  marginTop: 30,
               }}
            >
               <TouchableOpacity
                  onPress={() => navigation.navigate("CategoryChoice")}
               >
                  <Image
                     source={icon_Category}
                     style={{ width: 46, height: 46 }}
                  />
               </TouchableOpacity>
               <View style={{ flexDirection: "column", flex: 1 }}>
                  <Text style={[{ marginLeft: 10 }, styles.text_label]}>
                     Category
                  </Text>
                  <Text
                     style={{
                        marginLeft: 10,
                        fontSize: 25,
                        fontFamily: "PoppinsBold",
                     }}
                  >
                     {categoryName !== undefined ? categoryName : ""}
                  </Text>
               </View>
            </View>
            {/* ================= 3rd row - Pick Date =================  */}
            <View
               style={{
                  flexDirection: "column",
                  marginLeft: 3,
                  marginTop: 40,
                  flex: 1,
               }}
            >
               <Text
                  style={{
                     marginLeft: 10,
                     fontFamily: "PoppinsMed",
                     fontSize: 18,
                     marginBottom: 10,
                  }}
               >
                  Date
               </Text>
               <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={showDatePicker}>
                     <MaterialIcons
                        name="calendar-today"
                        size={36}
                        style={{ marginHorizontal: 10 }}
                     />
                  </TouchableOpacity>
                  <Text
                     style={[
                        styles.text_input,
                        { marginLeft: 10, marginTop: 8 },
                     ]}
                  >
                     {date.toLocaleString()}
                  </Text>
                  <DateTimePickerModal
                     value={date}
                     mode={"date"}
                     onConfirm={handleConfirm}
                     onCancel={hideDatePicker}
                     isVisible={isDatePickerVisible}
                  />
                  {/* ================= Button Finish  =================*/}
                  <TouchableOpacity
                     style={styles.btn_Finish}
                     onPress={() => {
                        insertExpense();
                     }}
                  >
                     <Text
                        style={{
                           fontSize: 18,
                           fontFamily: "PoppinsBold",
                           color: "#fff",
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
      marginLeft: 100,
      borderRadius: 18,
      borderWidth: 1,
      marginTop: 15,
   },
});
export default AddExpense;
