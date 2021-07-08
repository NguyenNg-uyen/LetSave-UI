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
export default function CategoryList({ category }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
      return (
         <View style={styles.container}>
            <Image
               source={require("../../assets/icons/android_48px.png")}
               style={styles.image}
            />
            <Text style={styles.textCategoryName}>{category.name}</Text>
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
      width: "100%",
      height: 50,
      display: "flex",
      padding: 10,
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
   },
   textCategoryName: {
      fontFamily: "PoppinsRegular",
      fontSize: 20,
      color: BLACK,
      marginLeft: 10,
   },
   image: {
      width: 40,
      height: 40,
   },
});
