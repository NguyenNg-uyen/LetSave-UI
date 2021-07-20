import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TextInput,
   Button,
   FlatList,
   Switch,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Icon and color
import icon_bell from "../.././assets/images/icon_bell.png";
import icon_profile from "../.././assets/images/icon_profile.png";
import icon_cate from "../.././assets/images/icon_cate.png";
import icon_noti from "../.././assets/images/icon_noti.png";
import icon_aboutApp from "../.././assets/images/icon_aboutApp.png";
import icon_logOut from "../.././assets/images/icon_logOut.png";
import {
   GREEN,
   MEDIUM_PINK,
   PINK,
   WHITE,
   LIGHT_GRAY,
   GRAY,
} from "../.././assets/color";
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
      PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
      PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
function SettingScreen({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [isEnabled, setIsEnabled] = useState(false);
   const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
   if (fontsLoaded) {
      return (
         <View style={{ flexDirection: "column" }}>
            <View style={styles.notification}>
               <Text
                  style={{
                     fontFamily: "PoppinsRegular",
                     fontSize: 14,
                     color: WHITE,
                  }}
               >
                  Update your Setting
               </Text>
               <Text
                  style={{
                     fontFamily: "PoppinsBold",
                     fontSize: 20,
                     color: WHITE,
                     paddingTop: 10,
                  }}
               >
                  Turn on your notification
               </Text>
               <Image source={icon_bell} style={styles.bell_style}></Image>
            </View>
            <View style={{ flexDirection: "row" }}>
               <Image source={icon_noti} style={styles.icon_style} />
               <View style={{ flexDirection: "column" }}>
                  <Text style={styles.titleStyle}>Notification</Text>
                  <Text style={styles.textStyle}>Set notification</Text>
               </View>
               <Switch
                  style={{ width: 160, height: 60 }}
                  trackColor={{ false: "LIGHT_GRAY", true: "#ffe3ee" }}
                  thumbColor={isEnabled ? "#FF0F82" : "#FF0F82"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
               />
            </View>
            {/* Horizontal line */}
            <View style={styles.horizontalline}></View>
            {/* //=========================== ABOUT THIS APP =====================================// */}
            <View style={{ flexDirection: "row" }}>
               <Image source={icon_aboutApp} style={styles.icon_style} />
               <View style={{ flexDirection: "column" }}>
                  <Text style={styles.titleStyle}>About this app</Text>
                  <Text style={styles.textStyle}>About Let' Save</Text>
               </View>
               <Text
                  style={{
                     width: 160,
                     height: 60,
                     marginLeft: 90,
                     fontFamily: "PoppinsLight",
                  }}
               >
                  v.2.0.21
               </Text>
            </View>
            {/* Horizontal line */}
            <View style={styles.horizontalline}></View>
            {/* =========================== CATEGORIES ===================================== */}
            <TouchableOpacity
               onPress={() => {
                  navigation.navigate("CategoryList");
               }}
            >
               <View style={{ flexDirection: "row" }}>
                  <Image source={icon_cate} style={styles.icon_style} />
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.titleStyle}>Categories</Text>
                     <Text style={styles.textStyle}>Categories management</Text>
                  </View>
               </View>
            </TouchableOpacity>
            {/* Horizontal line */}
            <View style={[styles.horizontalline]}></View>
            {/* =========================== UPDATE PROFILE ===================================== */}
            <TouchableOpacity>
               <View style={{ flexDirection: "row" }}>
                  <Image source={icon_profile} style={styles.icon_style} />
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.titleStyle}>Update Profile</Text>
                     <Text style={styles.textStyle}>
                        Update profile information
                     </Text>
                  </View>
               </View>
            </TouchableOpacity>
            {/* Horizontal line */}
            <View style={styles.horizontalline}></View>
            {/* =========================== LOG OUT ===================================== */}
            <TouchableOpacity>
               <View style={{ flexDirection: "row" }}>
                  <Image source={icon_logOut} style={styles.icon_style} />
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.titleStyle}>Log Out</Text>
                     <Text style={styles.textStyle}>Log out of account</Text>
                  </View>
               </View>
            </TouchableOpacity>
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
}
const styles = StyleSheet.create({
   notification: {
      paddingTop: 20,
      width: 362,
      height: 114,
      backgroundColor: PINK,
      borderRadius: 22,
      marginTop: 20,
      marginBottom: 30,
      padding: 20,
      position: "relative",
      marginHorizontal: 25,
   },
   bell_style: {
      width: 160,
      height: 150,
      position: "absolute",
      top: -40,
      right: -30,
   },
   icon_style: {
      marginLeft: 25,
      marginRight: 22,
   },
   titleStyle: {
      fontFamily: "PoppinsMedium",
      fontSize: 20,
      color: "#000000",
   },
   textStyle: {
      fontFamily: "PoppinsLight",
      fontSize: 14,
      marginTop: 8,
   },
   horizontalline: {
      height: 0.3,
      width: 285,
      backgroundColor: "#909090",
      marginLeft: 96,
      borderColor: "#c2c2c2",
      borderStyle: "solid",
      borderWidth: 0.3,
      borderRadius: 1,
      marginVertical: 20,
   },
});
export default SettingScreen;
