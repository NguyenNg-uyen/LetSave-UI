import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   StatusBar,
   Animated,
} from "react-native";
import { GREEN, MEDIUM_PINK } from "../assets/color";
import logo from "../assets/images/logo.png";
import money from "../assets/images/money.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../assets/fonts/Frijole-Regular.ttf"),
      FrederickatheGreat: require("../assets/fonts/FrederickatheGreat-Regular.ttf"),
   });
};
const logoOpacity = new Animated.Value(0);
export default function Splash() {
   Animated.sequence([
      Animated.timing(this.state.logoOpacity, {
         toValue: 1,
         duration: 2000,
      }),
   ]);
   const [fontsLoaded, setFontsLoaded] = useState(false);
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <StatusBar />
            <Animated.Image
               style={{ ...styles.logo, opacity: logoOpacity }}
               source={logo}
            />
            <Text style={styles.slogan}>Litte saves</Text>
            <Text style={{ fontFamily: "Frijole", color: GREEN, fontSize: 25 }}>
               FOR
            </Text>
            <Text style={styles.slogan}>huge result</Text>
            <Image style={styles.money} source={money} />
            <View style={styles.circle1}></View>
            <View style={styles.circle2}></View>
            <View style={styles.circle3}></View>
            <View style={styles.circle4}></View>
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
   circle1: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      left: -100,
      top: -30,
   },
   circle2: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      right: -120,
      top: 200,
   },
   circle3: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      left: -100,
      bottom: -100,
   },
   circle4: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      right: -100,
      bottom: -50,
   },
   money: {
      marginTop: 60,
      width: 220,
      height: 220,
   },
});
