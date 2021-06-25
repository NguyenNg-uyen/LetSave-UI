import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   StatusBar,
   Animated,
   Dimensions,
} from "react-native";
import { GREEN, MEDIUM_PINK } from "../assets/color";
import logo from "../assets/images/logo.png";
import money from "../assets/images/money.png";
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
   // Animation
   const logoOpacity = new Animated.Value(0); //Opacity of logo
   const sloganMaginTop = new Animated.Value(1000);
   const moneyOpacity = new Animated.Value(0);
   Animated.sequence([
      // Logo Animation
      Animated.timing(logoOpacity, {
         toValue: 1,
         duration: 1500,
         useNativeDriver: true,
      }),
      // Text Animation
      Animated.timing(sloganMaginTop, {
         toValue: 0,
         duration: 2000,
         useNativeDriver: false,
      }),
      // Image Animation
      Animated.timing(moneyOpacity, {
         toValue: 1,
         duration: 1500,
         useNativeDriver: true,
      }),
   ]).start(() => {});
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <StatusBar />
            {/* Logo Position*/}
            <Animated.Image
               style={{ ...styles.logo, opacity: logoOpacity }}
               source={logo}
            />
            {/* Slogan position */}
            <Animated.Text
               style={{ ...styles.slogan, marginTop: sloganMaginTop }}
            >
               Litte saves
            </Animated.Text>
            <Animated.Text
               style={{
                  fontFamily: "Frijole",
                  color: GREEN,
                  fontSize: 25,
                  marginTop: sloganMaginTop,
               }}
            >
               FOR
            </Animated.Text>
            <Animated.Text
               style={{ ...styles.slogan, marginTop: sloganMaginTop }}
            >
               huge result
            </Animated.Text>
            {/* Bottom image position */}
            <Animated.Image
               style={{ ...styles.money, opacity: moneyOpacity }}
               source={money}
            />
            {/* Decorative Circle */}
            <View style={{ ...styles.circle, left: -100, top: -30 }}></View>
            <View style={{ ...styles.circle, right: -130, top: 200 }}></View>
            <View style={{ ...styles.circle, left: -100, bottom: -100 }}></View>
            <View style={{ ...styles.circle, right: -100, bottom: -50 }}></View>
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
   slogan: {
      fontSize: 25,
      color: GREEN,
      fontFamily: "FrederickatheGreat",
   },
   logo: {
      marginTop: 100,
      marginBottom: 70,
      width: 200,
      height: 200,
   },
   circle: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
   },
   money: {
      position: "absolute",
      bottom: 0,
      width: 220,
      height: 220,
   },
});
