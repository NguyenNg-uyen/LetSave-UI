import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   StatusBar,
   Dimensions,
} from "react-native";
import { WHITE, MEDIUM_PINK } from "../assets/color";
import logo from "../assets/images/logo.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../assets/fonts/Frijole-Regular.ttf"),
      FrederickatheGreat: require("../assets/fonts/FrederickatheGreat-Regular.ttf"),
   });
};
var { height, width } = Dimensions.get("window");
export default function Splash() {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <StatusBar />
            <Image style={styles.logo} source={logo} />
            <View style={styles.box} />
         </View>
      );
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
      backgroundColor: MEDIUM_PINK,
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      position: "relative",
   },
   logo: {
      width: 165,
      height: 165,
      marginBottom: 20,
      marginTop: 30,
   },
   box: {
      width: 0.81 * width,
      height: 0.6 * height,
      backgroundColor: WHITE,
      borderRadius: 30,
   },
});
