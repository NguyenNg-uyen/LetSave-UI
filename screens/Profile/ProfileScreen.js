import React, { useState } from "react";
import {
   StyleSheet,
   View,
   Image,
   StatusBar,
   FlatList,
   Text,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK, LIGHT_GRAY } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import SettingScreen from "../Setting/SettingScreen";
import avatar from "../../assets/images/avatar.png";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
      PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
      PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
const ProfileScreen = ({ navigation }) => {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   if (fontsLoaded) {
      return (
         <View style={[{ flexDirection: "column" }, styles.container]}>
            <View style={styles.container1}>
               <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={{ fontFamily: "PoppinsBold", fontSize: 24 }}>
                     Profile
                  </Text>
                  {/* ==================== Open Setting Screen =========================*/}
                  <TouchableOpacity
                     onPress={() => {
                        navigation.navigate("SettingScreen");
                     }}
                  >
                     <MaterialIcons
                        name="settings"
                        size={30}
                        style={{ marginLeft: 270 }}
                     ></MaterialIcons>
                  </TouchableOpacity>
               </View>
               {/* Avatar and name */}
               <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <Image
                     style={[styles.image, { marginTop: 20 }]}
                     source={avatar}
                  />
                  <View style={{ flexDirection: "column" }}>
                     <Text
                        style={[
                           styles.titleText,
                           { marginTop: 80, marginLeft: 20 },
                        ]}
                     >
                        Abbie Wilson
                     </Text>
                     <Text
                        style={[
                           styles.titleInfo,
                           { fontSize: 16, marginLeft: 20 },
                        ]}
                     >
                        Free Account
                     </Text>
                  </View>
               </View>
               <View style={[styles.notification]}>
                  <Text
                     style={{
                        fontFamily: "PoppinsRegular",
                        fontSize: 14,
                        color: WHITE,
                     }}
                  >
                     Total Balance
                  </Text>
                  <Text
                     style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 26,
                        color: WHITE,
                        paddingTop: 5,
                     }}
                  >
                     $4250.25
                  </Text>
                  <View style={[styles.horizontalline]}></View>
               </View>
            </View>
            {/* ===========  User information =================*/}
            <View style={[{ flex: 0.9 }, styles.containerInfo]}>
               <Text style={styles.titleInfo}>Email</Text>
               <Text style={styles.textInfo}>jparker@gmail.com</Text>
               <Text style={styles.titleInfo}>Date of Birth</Text>
               <Text style={styles.textInfo}>04-19-1992</Text>
               <Text style={styles.titleInfo}>Phone</Text>
               <Text style={styles.textInfo}>0900123345</Text>
            </View>
         </View>
      );
   } else {
      return (
         <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={() => console.warn}
         />
      );
   }
};
export default ProfileScreen;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: "auto",
      backgroundColor: "DFD7D7",
   },
   container1: {
      flex: 1,
      padding: 20,
      // borderBottomEndRadius: 8,
      // borderBottomStartRadius: 8,
      // borderBottomWidth: 0.8,
      borderWidth: 2,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      borderColor: "#c2c2c2",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
   },
   containerInfo: {
      backgroundColor: "#FBFBFB",
   },
   notification: {
      paddingTop: 20,
      width: 360,
      height: 100,
      backgroundColor: PINK,
      borderRadius: 22,
      marginTop: 20,
      marginBottom: 30,
      padding: 15,
      paddingTop: 11,
      position: "relative",
      marginHorizontal: 4,
   },
   image: {
      borderRadius: 50,
      height: 170,
      width: 170,
      alignItems: "center",
      borderColor: WHITE,
   },
   titleText: {
      fontFamily: "PoppinsBold",
      fontSize: 24,
   },
   titleInfo: {
      fontFamily: "PoppinsLight",
      fontSize: 18,
      marginLeft: 30,
      marginTop: 15,
   },
   textInfo: {
      fontFamily: "PoppinsRegular",
      fontSize: 22,
      marginLeft: 30,
   },
   horizontalline: {
      height: 1,
      width: 320,
      backgroundColor: WHITE,
      borderColor: WHITE,
      borderStyle: "solid",
      borderWidth: 1.2,
      borderRadius: 1,
   },
});
