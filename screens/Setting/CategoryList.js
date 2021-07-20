import React, { useState, useEffect, useRef } from "react";
import {
   StyleSheet,
   View,
   StatusBar,
   FlatList,
   Alert,
   TouchableOpacity,
   Text,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { ListItem, Avatar } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";
import { decode, encode } from "base-64";

if (!global.btoa) {
   global.btoa = encode;
}

if (!global.atob) {
   global.atob = decode;
}
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
//================= Get Data Function =======================
export default function CategoryList({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [categoriesListFilter, setCategoriesListFiler] = useState([]);
   const ref = useRef([]);
   useEffect(() => {
      const getCategoriesList = async () => {
         let username = await AsyncStorage.getItem("username");
         let password = await AsyncStorage.getItem("password");
         const res = await axios({
            method: "GET",
            url: apiLib.getCategories,
            auth: {
               username: username,
               password: password,
            },
         });
         ref.current = res.data;
         setCategoriesListFiler(ref.current);
         return res;
      };
      getCategoriesList();
   }, []);
   // ===================== Searching Category Function ======================
   const handleSearch = (text) => {
      setCategoriesListFiler(
         ref.current.filter((category) => {
            return category.name.toLowerCase().includes(text.toLowerCase());
         })
      );
   };
   // If fonts are loaded successfully
   if (fontsLoaded) {
      const keyExtractor = (item, index) => index.toString();
      const renderItem = ({ item }) => (
         <ListItem bottomDivider>
            <Avatar size="medium" source={{ uri: item.image }} />
            <ListItem.Content>
               <ListItem.Title style={styles.textCategoryName}>
                  {item.name}
               </ListItem.Title>
            </ListItem.Content>
         </ListItem>
      );
      return (
         <View style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
            <Searchbar
               placeholder="Search..."
               onChangeText={(text) => handleSearch(text)}
            />
            <FlatList
               keyExtractor={keyExtractor}
               data={categoriesListFilter}
               renderItem={renderItem}
            />
            <TouchableOpacity
               style={styles.btnAdd}
               onPress={() => navigation.navigate("AddCategory")}
            >
               <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>
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
   textCategoryName: {
      fontFamily: "PoppinsBold",
      fontSize: 19,
   },
   btnAdd: {
      position: "absolute",
      width: 65,
      height: 65,
      alignItems: "center",
      justifyContent: "center",
      right: 20,
      bottom: 30,
      backgroundColor: PINK,
      borderRadius: 35,
      elevation: 5,
   },
   plusIcon: {
      fontSize: 40,
      color: "white",
   },
});
