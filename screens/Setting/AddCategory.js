import React, { useState } from "react";
import {
   StyleSheet,
   View,
   StatusBar,
   Alert,
   TouchableOpacity,
   Text,
   TextInput,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/FontAwesome5";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
export default function AddCategory({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
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
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      paddingHorizontal: 10,
      paddingVertical: 10,
   },
});
