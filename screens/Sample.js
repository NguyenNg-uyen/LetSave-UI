import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   StatusBar,
   Dimensions,
} from "react-native";
import { GREEN, MEDIUM_PINK } from "../assets/color";
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

export default function Splash() {
   var { height, width } = Dimensions.get("window");
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <StatusBar />
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
const styles = StyleSheet.create({});
