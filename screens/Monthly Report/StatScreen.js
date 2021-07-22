import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   Dimensions,
   TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import CalendarStrip from "react-native-calendar-strip";
import * as Font from "expo-font";
import { LineChart } from "react-native-chart-kit";
import { PINK } from "../../assets/color";
import { WHITE } from "../../assets/color";
import Icon from "react-native-vector-icons/FontAwesome";

const netbalane = 5000.0;
const inco = 6000.0;
const expe = 2000.21;
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function StatScreen({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
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
            <CalendarStrip
               scrollable
               calendarAnimation={{ type: "sequence", duration: 30 }}
               daySelectionAnimation={{
                  type: "border",
                  borderWidth: 2,
                  borderHighlightColor: PINK,
               }}
               calendarHeaderStyle={{ color: "black" }}
               calendarColor={"#7743CE"}
               dateNumberStyle={{ color: "black" }}
               dateNameStyle={{ color: "black", fontWeight: "bold" }}
               highlightDateNumberStyle={{ color: PINK }}
               highlightDateNameStyle={{ color: PINK }}
               disabledDateNameStyle={{ color: "grey" }}
               disabledDateNumberStyle={{ color: "grey" }}
               style={{
                  height: 80,
                  width: "100%",
                  backgroundColor: WHITE,
                  top: -15,
                  marginBottom: 5,
               }}
            />
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
                        fontSize: 30,
                        top: 40,
                        left: 10,
                        fontFamily: "Poppins",
                     }}
                  >
                     ${inco}
                  </Text>
               </TouchableOpacity>
               {/* ====================== Expense button =======================*/}
               <TouchableOpacity
                  style={styles.expense}
                  onPress={() => {
                     navigation.navigate("ReportDetail", {
                        transactionType: "Expense",
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
                        fontSize: 30,
                        top: 40,
                        left: 10,
                        fontFamily: "Poppins",
                     }}
                  >
                     ${expe}
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
      marginBottom: 50,
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
      elevation: 17,
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
});
