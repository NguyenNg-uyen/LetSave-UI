import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   TouchableOpacity,
   SafeAreaView,
   FlatList,
   Image,
   TextInput,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { GRAY, LIGHT_GRAY, PINK, WHITE } from "../../assets/color";
import { LinearGradient } from "expo-linear-gradient";
import congratsuccess from "../../assets/congra.png";
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
      PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),
   });
};
export default function ChangePasswordSuccess({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <View style={styles.containerBody}>
               <Image source={congratsuccess} style={styles.image} />
               <Text
                  style={{
                     marginTop: 15,
                     fontFamily: "PoppinsBold",
                     fontSize: 25,
                  }}
               >
                  Password Reset
               </Text>
               <Text
                  style={{
                     fontSize: 15,
                     color: GRAY,
                  }}
               >
                  Your password has been reset successfully
               </Text>
               <TouchableOpacity
                  style={styles.buttonSubbmit}
                  onPress={() => {
                     navigation.navigate("Home");
                  }}
               >
                  <LinearGradient
                     colors={[PINK, "#ee8e6b"]}
                     style={styles.linearGradient}
                  >
                     <Text style={styles.button}>Done</Text>
                  </LinearGradient>
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
      flexDirection: "column",
      flex: 1,
      // backgroundColor: "black",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      width: "100%",
   },
   containerBody: {
      height: "70%",
      width: "100%",
      marginTop: 15,
      borderRadius: 15,
      alignItems: "center",
   },
   image: {
      marginTop: 20,
      height: 300,
      width: 300,
   },
   button: {
      alignSelf: "center",
      fontSize: 20,
      fontFamily: "PoppinsBold",
      marginTop: 50,
      borderRadius: 15,
      width: "100%",
      height: "150%",
      textAlign: "center",
      alignItems: "center",
      color: WHITE,
   },
   buttonSubbmit: {
      marginTop: 50,
      height: "10%",
      width: "40%",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
   },
   linearGradient: {
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      borderRadius: 20,
      height: "30%",
      width: "80%",
   },
});
