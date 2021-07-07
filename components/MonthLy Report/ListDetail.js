import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Card } from "react-native-shadow-cards";
import { BLACK, GRAY, LIGHT_GRAY } from "../../assets/color";
import food from "../.././assets/images/foodber.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../.././assets/fonts/Poppins-Medium.ttf"),
      PoppinsBold: require("../.././assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function ListDetail({ transactionDetail }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
      return (
         <View style={{ flex: 1 }}>
            <View style={styles.container}>
               <Image source={food} style={styles.image} />
               <View style={styles.nameAndDateView}>
                  <Text style={styles.categoryNameText}>
                     {transactionDetail.categoryName}
                  </Text>
                  <Text style={styles.dateText}>{transactionDetail.date}</Text>
               </View>
               <Text style={styles.amountText}>
                  ${transactionDetail.amount}
               </Text>
            </View>
            <View style={styles.line}></View>
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
      width: 360,
      height: 85,
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "center",
      position: "relative",
   },
   image: {
      width: 70,
      height: 70,
      marginRight: 20,
   },
   nameAndDateView: {
      flexDirection: "column",
   },
   categoryNameText: {
      fontFamily: "PoppinsBold",
      fontSize: 23,
   },
   dateText: {
      fontFamily: "PoppinsRegular",
      fontSize: 17,
      color: BLACK,
   },
   amountText: {
      fontFamily: "PoppinsBold",
      fontSize: 30,
      color: BLACK,
      position: "absolute",
      right: 0,
   },
   line: {
      backgroundColor: LIGHT_GRAY,
      height: 1,
      width: 270,
      alignSelf: "flex-end",
      marginBottom: 20,
   },
});
