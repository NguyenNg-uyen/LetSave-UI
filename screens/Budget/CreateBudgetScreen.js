import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   TouchableOpacity,
   SafeAreaView,
   FlatList,
   Image,
   TextInput,
   Alert,
   ToastAndroid,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { LIGHT_GRAY, PINK, WHITE } from "../../assets/color";
import ModalPicker from "../ModalPicker";
import payment from "../../assets/payment.png";
import moneypack from "../../assets/money.png";
import calendar from "../../assets/calendar.png";
import catego from "../../assets/category.png";
import createBudget from "../../assets/createownBudget.png";
import apiLib from "../../assets/ApiStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
      PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),
   });
};
export default function CreateBudgetScreen({ navigation, route }) {
   const [budgetName, setBudgetName] = useState("");
   const [amount, setAmount] = React.useState(0);
   const [month, setMonth] = useState(parseInt(new Date().getMonth()) + 1);
   const [year, setYear] = useState(parseInt(new Date().getFullYear()));
   const getMonthAndYear = (month, year) => {
      setMonth(month);
      setYear(year);
   };
   const [fontsLoaded, setFontsLoaded] = useState(false);
   let categoryId, categoryName;
   if (route.params !== undefined) {
      categoryId = route.params.categoryID;
      categoryName = route.params.categoryName;
   }
   async function addBudget() {
      // Insert data
      const inputData = {
         name: budgetName,
         amount: amount,
         categoryId: categoryId,
         date: year + "-" + month,
      };
      let username = await AsyncStorage.getItem("username");
      let password = await AsyncStorage.getItem("password");
      // Check input field not blank
      if (inputData.amount == null || inputData.categoryId == null) {
         Alert.alert("Please fill in all fields");
      } else {
         const res = await axios({
            method: "POST",
            url: apiLib.createBudget,
            auth: {
               username: username,
               password: password,
            },
            data: inputData,
         });
         if (res.status == 200) {
            ToastAndroid.show("Add budget successfully", ToastAndroid.SHORT);
            navigation.goBack();
         } else {
            Alert.alert("Insert new transaction unsuccessful");
         }
      }
   }
   //=========== Date Picker  =================
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            {/*------------------ Notification-------------- */}
            <View style={[styles.notification]}>
               <Text
                  style={{
                     fontFamily: "Poppins",
                     fontSize: 26,
                     color: WHITE,
                     paddingTop: 5,
                     textAlign: "center",
                  }}
               >
                  <Image
                     source={createBudget}
                     style={{
                        height: 30,
                        width: 30,
                     }}
                  />
                  Create Own Budget
               </Text>
            </View>
            <SafeAreaView style={styles.containerInfo}>
               <View style={styles.infoElement}>
                  <Image
                     width={50}
                     height={100}
                     style={styles.image}
                     source={payment}
                  />
                  <TextInput
                     style={styles.input}
                     onChangeText={setBudgetName}
                     placeholder={"Enter Budget"}
                  />
               </View>
               <View style={styles.infoElement}>
                  <Image
                     width={50}
                     height={100}
                     style={styles.image}
                     source={moneypack}
                  />
                  <TextInput
                     style={styles.input}
                     onChangeText={setAmount}
                     placeholder={"Enter Money Amount"}
                     prefix="$"
                     delimiter=","
                     separator="."
                     precision={0}
                     maxValue="10000000"
                  />
               </View>
               <View style={styles.infoElement}>
                  <Image
                     width={50}
                     height={100}
                     style={{
                        marginLeft: -90,
                        height: 35,
                        width: 30,
                        marginRight: 65,
                     }}
                     source={calendar}
                  />
                  {/* <View style={styles.calendar}> */}
                  <ModalPicker sendMonthAndYear={getMonthAndYear} />
                  {/* </View> */}
               </View>
               <View
                  style={
                     (styles.infoElement,
                     {
                        flexDirection: "row",
                        marginLeft: 32,
                        marginTop: 40,
                     })
                  }
               >
                  <TouchableOpacity
                     onPress={() => navigation.navigate("BudgetCategoryChoice")}
                  >
                     <Image source={catego} style={{ width: 30, height: 25 }} />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                     <Text
                        style={[
                           { marginLeft: 85, fontSize: 20, marginTop: 0 },
                           styles.text_label,
                        ]}
                     >
                        {categoryName !== undefined
                           ? categoryName
                           : "Choose Category"}
                     </Text>
                  </View>
               </View>

               {/* button submit */}

               <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                     addBudget();
                  }}
               >
                  <Text
                     style={{
                        color: WHITE,
                        fontFamily: "Poppins",
                        fontSize: 17,
                     }}
                  >
                     Done
                  </Text>
               </TouchableOpacity>
            </SafeAreaView>
         </View>
      );
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
const styles = StyleSheet.create({
   container: {
      flexDirection: "column",
      flex: 1,
      backgroundColor: WHITE,
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: 0,
      marginTop: 25,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      borderBottomColor: LIGHT_GRAY,
   },
   input: {
      height: 40,
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      fontFamily: "PoppinsReg",
      borderRadius: 25,
      fontSize: 15,
   },
   titleInfo: {
      fontFamily: "Poppins",
      fontSize: 18,
      marginLeft: 30,
      marginTop: 15,
      flexDirection: "row",
   },
   containerInfo: {
      marginTop: 0,
      backgroundColor: WHITE,
      height: "60%",
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 15,
      borderWidth: 1,
      borderColor: PINK,
      elevation: 10,
   },
   infoElement: {
      flexDirection: "row",
      marginTop: 25,
   },
   text_input: {
      fontSize: 15,
      fontFamily: "PoppinsReg",
      textAlign: "center",
      justifyContent: "center",
      marginTop: -10,
   },
   image: {
      height: 30,
      width: 25,
      marginLeft: 15,
   },
   horizontalline: {
      height: 1,
      width: 335,
      backgroundColor: WHITE,
      borderColor: WHITE,
      borderStyle: "solid",
      borderWidth: 1.2,
      borderRadius: 1,
   },
   notification: {
      paddingTop: 20,
      width: 350,
      height: 75,
      backgroundColor: PINK,
      borderRadius: 22,
      marginTop: 60,
      marginBottom: 30,
      marginLeft: 25,
      padding: 15,
      paddingTop: 11,
      position: "relative",
      marginHorizontal: 4,
   },
   btnAdd: {
      borderWidth: 1,
      borderColor: PINK,
      marginTop: 40,
      height: 45,
      width: 120,
      fontSize: 20,
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: PINK,
   },
   calendar: { marginLeft: 10 },
});
