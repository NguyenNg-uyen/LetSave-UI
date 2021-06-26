import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GREEN, MEDIUM_PINK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
   });
};

export default function Signup() {
   var { height, width } = Dimensions.get("window");
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <Text style={styles.text}>Sign up</Text>
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
   container: {},
   text: { fontFamily: "AveriaSansLibre" },
});
