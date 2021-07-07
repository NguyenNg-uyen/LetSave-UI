import React, { useState } from "react";
import {
   StyleSheet,
   View,
   Image,
   StatusBar,
   Dimensions,
   KeyboardAvoidingView,
   ScrollView,
   BackHandler,
} from "react-native";
import { Card } from "react-native-shadow-cards";
import { WHITE, MEDIUM_PINK, PINK, GRAY } from "../../assets/color";
import logo from "../../assets/images/logo.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Signin from "../../components/login/Signin";
import Signup from "../../components/login/Signup";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      AveriaSansLibre: require("../../assets/fonts/AveriaSansLibre-Regular.ttf"),
   });
};
var { height, width } = Dimensions.get("window");
const Tab = createMaterialTopTabNavigator();
export default function Login({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   const disableBackButton = () => {
      BackHandler.exitApp();
      return true;
   };
   BackHandler.addEventListener("hardwareBackPress", disableBackButton);
   if (fontsLoaded)
      return (
         <KeyboardAvoidingView style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
            <Image style={styles.logo} source={logo} />
            <ScrollView>
               <Card style={styles.box}>
                  <NavigationContainer>
                     <Tab.Navigator
                        tabBarOptions={{
                           labelStyle: {
                              fontSize: 20,
                              fontFamily: "AveriaSansLibre",
                           },
                           activeTintColor: PINK,
                           inactiveTintColor: GRAY,
                           indicatorStyle: {
                              backgroundColor: PINK,
                           },
                        }}
                     >
                        <Tab.Screen
                           name="Sign in"
                           children={() => <Signin navigation={navigation} />}
                        />
                        <Tab.Screen name="Sign up" component={Signup} />
                     </Tab.Navigator>
                  </NavigationContainer>
               </Card>
            </ScrollView>
            <View style={{ ...styles.circle, right: -130, top: -100 }}></View>
         </KeyboardAvoidingView>
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
      height: 0.62 * height,
      backgroundColor: WHITE,
      borderRadius: 30,
      overflow: "hidden",
   },
   circle: {
      backgroundColor: "#ffffff",
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
   },
});
