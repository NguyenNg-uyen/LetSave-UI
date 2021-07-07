import React, { useState } from "react";
import {
   StyleSheet,
   View,
   Image,
   StatusBar,
   FlatList,
   Text,
} from "react-native";
import { Card } from "react-native-shadow-cards";
import { WHITE, BLUE, PINK, GRAY, BLACK } from "../../assets/color";
import ListDetail from "../../components/MonthLy Report/ListDetail";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import coins from "../../assets/images/coins.png";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function ReportDetail({ props }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
      const transaction = [
         { id: 1, categoryName: "Food", amount: 100, date: "Fri 10AM" },
         { id: 2, categoryName: "Food", amount: 120, date: "Fri 10AM" },
         { id: 3, categoryName: "Food", amount: 10, date: "Fri 10AM" },
         { id: 4, categoryName: "Food", amount: 10, date: "Fri 10AM" },
         { id: 5, categoryName: "Food", amount: 10, date: "Fri 10AM" },
      ];
      return (
         <View style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
            <View style={styles.titleView}>
               <Text style={styles.monthText}>May 2021</Text>
               <Text style={styles.totalBalanceText}>$2142,0</Text>
               <View style={styles.line}></View>
               <Image source={coins} style={styles.image} />
            </View>
            <Text
               style={{
                  fontSize: 15,
                  alignSelf: "flex-start",
                  fontFamily: "PoppinsRegular",
                  marginLeft: 30,
                  color: BLACK,
                  marginVertical: 10,
               }}
            >
               Transactions
            </Text>
            <FlatList
               data={transaction}
               renderItem={({ item }) => (
                  <ListDetail transactionDetail={item} />
               )}
               keyExtractor={(item) => `${item.id}`}
            />
         </View>
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
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      position: "relative",
   },
   titleView: {
      height: 140,
      width: 370,
      backgroundColor: PINK,
      borderRadius: 22,
      marginTop: 50,
      marginBottom: 30,
      padding: 20,
      position: "relative",
   },
   monthText: {
      fontSize: 20,
      fontFamily: "PoppinsRegular",
      color: WHITE,
      letterSpacing: 1,
   },
   totalBalanceText: {
      fontSize: 30,
      fontFamily: "PoppinsBold",
      color: WHITE,
      letterSpacing: 2,
   },
   line: {
      height: 4,
      backgroundColor: WHITE,
      alignSelf: "stretch",
   },
   image: {
      width: 150,
      height: 140,
      position: "absolute",
      top: -33,
      right: 0,
   },
});
