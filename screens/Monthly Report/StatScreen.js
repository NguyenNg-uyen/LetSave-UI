import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   SafeAreaView,
   Dimensions,
   TouchableOpacity,
   FlatList,
} from "react-native";
import ModalPicker from "../ModalPicker";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { LineChart } from "react-native-chart-kit";
import { LIGHT_GRAY, PINK, WHITE } from "../../assets/color";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";

const netbalane = 5000.0;
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function StatScreen({ navigation }) {
   // ==================== CallBack function to get month and year of the modal =================
   const [month, setMonth] = useState(parseInt(new Date().getMonth()) + 1);
   const [year, setYear] = useState(parseInt(new Date().getFullYear()));
   const getMonthAndYear = (month, year) => {
      setMonth(month);
      setYear(year);
   };
   // ==================== Get total balance of Income and Expense of a month =======================
   const [incomeBalance, setIncomeBalance] = useState(0);
   const [expenseBalance, setExpenseBalance] = useState(0);
   useEffect(() => {
      const getMonthlyBalance = async () => {
         const username = await AsyncStorage.getItem("username");
         const password = await AsyncStorage.getItem("password");

         //==================== Get daily transaction ==========================
         axios({
            method: "POST",
            url: apiLib.getMonthlyTransactionByParticularYear,
            auth: {
               username: username,
               password: password,
            },
            data: {
               type: "Income",
               year: year,
            },
         })
            .then((res) => {
               let result = res.data.find((item) => {
                  let itemMonth = new Date(item.date).getMonth() + 1;
                  return itemMonth == month;
               });
               result !== undefined
                  ? setIncomeBalance(parseInt(result.amount))
                  : setIncomeBalance(0);
            })
            .catch((err) => {
               console.log(err);
            });

         // Get fullname and avatar
         axios({
            method: "POST",
            url: apiLib.getMonthlyTransactionByParticularYear,
            auth: {
               username: username,
               password: password,
            },
            data: {
               type: "Expense",
               year: year,
            },
         })
            .then((res) => {
               let result = res.data.find((item) => {
                  let itemMonth = new Date(item.date).getMonth() + 1;
                  return itemMonth == month;
               });
               result !== undefined
                  ? setExpenseBalance(parseInt(result.amount))
                  : setExpenseBalance(0);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getMonthlyBalance();
   }, [year, month]);
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // ============== If fonts are loaded successfully ==============
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <Text
               style={{
                  alignSelf: "flex-start",
                  left: 15,
                  fontFamily: "Poppins",
                  fontSize: 30,
                  top: -15,
               }}
            >
               Stat
            </Text>
            <View style={styles.calendar1}>
               <Text style={[{ marginRight: 10 }, styles.line]}>---------</Text>
               <ModalPicker sendMonthAndYear={getMonthAndYear} />
               <Text style={[{ marginLeft: 10 }, styles.line]}>---------</Text>
            </View>

            {/* ------------------------LineChart----------------------------- */}

            <LineChart
               style={styles.linechart}
               data={{
                  labels: [
                     "Jan",
                     "",
                     "",
                     "Feb",
                     "",
                     "",
                     "Mar",
                     "",
                     "",
                     "Apr",
                     "",
                     "Feb",
                  ],
                  datasets: [
                     {
                        data: [
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                        ],
                        style: {
                           fontSize: 100,
                        },
                     },
                  ],

                  legend: ["Net Balance= " + netbalane + "$"], // optional
               }}
               width={Dimensions.get("window").width} // from react-native
               height={220}
               yAxisLabel="$"
               yAxisSuffix="k"
               yAxisInterval={3} // optional, defaults to 1
               chartConfig={{
                  backgroundColor: WHITE,
                  backgroundGradientFrom: PINK,
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = -15) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                     `rgba(255, 255, 255, ${opacity})`,
                  style: {
                     borderRadius: 16,
                  },
                  propsForDots: {
                     r: "0",
                     strokeWidth: "5",
                     stroke: "white",
                  },
               }}
               bezier
               style={{
                  marginVertical: 8,
                  borderRadius: 35,
                  margin: 5,
                  fontSize: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                     width: 0,
                     height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 11.14,
                  elevation: 17,
               }}
            />
            {/* income expense */}
            <View style={styles.inex}>
               {/* ====================== Imcome button =======================*/}
               <TouchableOpacity
                  style={styles.income}
                  onPress={() => {
                     navigation.navigate("ReportDetail", {
                        transactionType: "Income",
                        year: year,
                        month: month,
                        incomeBalance: incomeBalance,
                     });
                  }}
               >
                  <View style={styles.btnleft}>
                     <Icon
                        name="chevron-left"
                        size={30}
                        color="white"
                        style={{ left: -2, top: 2.5 }}
                     />
                  </View>
                  <Text
                     style={{
                        color: "#B8B4B4",
                        fontSize: 15,
                        top: 40,
                        left: 15,
                        fontFamily: "Poppins",
                     }}
                  >
                     Income
                  </Text>
                  <Text
                     style={{
                        color: "black",
                        fontSize: 25,
                        top: 40,
                        left: 10,
                        fontFamily: "Poppins",
                     }}
                  >
                     $
                     {incomeBalance
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
               </TouchableOpacity>
               {/* ====================== Expense button =======================*/}
               <TouchableOpacity
                  style={styles.expense}
                  onPress={() => {
                     navigation.navigate("ReportDetail", {
                        transactionType: "Expense",
                        year: year,
                        month: month,
                        expenseBalance: expenseBalance,
                     });
                  }}
               >
                  <View style={styles.btnright}>
                     <Icon
                        name="chevron-right"
                        size={30}
                        color="white"
                        style={{ left: 1, top: 2.5 }}
                     />
                  </View>
                  <Text
                     style={{
                        color: "#B8B4B4",
                        fontSize: 15,
                        top: 40,
                        left: 15,
                        fontFamily: "Poppins",
                     }}
                  >
                     Expense
                  </Text>
                  <Text
                     style={{
                        color: "black",
                        fontSize: 25,
                        top: 40,
                        left: 10,
                        fontFamily: "Poppins",
                     }}
                  >
                     $
                     {expenseBalance
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
               </TouchableOpacity>
            </View>
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
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: WHITE,
      flexDirection: "column",
   },
   inex: {
      top: 20,
      // backgroundColor: PINK,
      height: "30%",
      width: "92%",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      top: -5,
      marginBottom: 70,
   },
   income: {
      backgroundColor: WHITE,
      height: "80%",
      width: "45%",
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
      elevation: 30,
   },
   expense: {
      backgroundColor: WHITE,
      height: "80%",
      width: "45%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
      elevation: 17,
      borderRadius: 25,
   },
   btnleft: {
      backgroundColor: "#52C1F1",
      width: "30%",
      height: "30%",
      alignItems: "center",
      justifyContent: "center",
      top: 15,
      left: 10,
      borderRadius: 50,
   },
   btnright: {
      backgroundColor: PINK,
      width: "30%",
      height: "30%",
      alignItems: "center",
      justifyContent: "center",
      top: 15,
      left: 10,
      borderRadius: 50,
   },
   calendar1: {
      // width: "100%",
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
      // marginLeft: 10,
   },
   line: {
      marginTop: 6,
      fontSize: 28,
      color: PINK,
   },
});
