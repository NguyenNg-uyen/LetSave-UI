import React, { useState, useRef, useEffect } from "react";
import {
   StyleSheet,
   View,
   StatusBar,
   Alert,
   TouchableOpacity,
   Text,
   TextInput,
   Image,
   FlatList,
   Pressable,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import data from "../../components/Category/ListIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";
import { decode, encode } from "base-64";
// Set up letter fonts
if (!global.btoa) {
   global.btoa = encode;
}

if (!global.atob) {
   global.atob = decode;
}

const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
export default function AddCategory({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [category, setCategoty] = useState({ name: "", image: "" });
   const [selected, setSelected] = useState({ id: 1 });

   const onSelect = async (index) => {
      setSelected((prevState) => ({ ...prevState, id: index }));
      let link = data[index].link;
      setCategoty((prevState) => ({ ...prevState, image: link }));
   };

   const handleChange = (val) => {
      setCategoty((prevState) => ({
         ...prevState,
         name: val,
      }));
   };

   const addCategories = async () => {
      let username = await AsyncStorage.getItem("username");
      let password = await AsyncStorage.getItem("password");
      const res = await axios({
         method: "POST",
         url: apiLib.createCategories,
         auth: {
            username: username,
            password: password,
         },
         data: {
            name: category.name,
            image: category.image,
         },
      });
      if (res.status == 200) {
         Alert.alert("Add category successfully!");
         navigation.navigate("CategoryList");
      } else Alert.alert("Add failed!!");
      return res;
   };
   const renderItem = ({ item, index }) => {
      return (
         <View style={styles.iconSelectionView}>
            <Pressable
               style={
                  index == selected.id
                     ? {
                          borderRadius: 100,
                          backgroundColor: "rgba(255, 15, 130, 0.2)",
                       }
                     : { borderRadius: 100, backgroundColor: "transparent" }
               }
               onPress={() => onSelect(index)}
               delayPressIn={0}
            >
               <Image source={{ uri: item.link }} style={styles.icon} />
            </Pressable>
         </View>
      );
   };
   // If fonts are loaded successfully
   if (fontsLoaded) {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
            <Text style={styles.textTitle}>Category name</Text>
            <TextInput
               style={styles.textInput}
               onChangeText={(val) => handleChange(val)}
               value={category.name}
            />
            <Text style={styles.textTitle}>Select Icon</Text>
            <FlatList
               keyExtractor={(item, index) => index.toString()}
               data={data}
               renderItem={renderItem}
               numColumns={5}
            />
            <TouchableOpacity
               style={styles.btnSave}
               onPress={() => addCategories()}
            >
               <Text style={styles.textSave}>Save</Text>
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
      paddingBottom: 30,
      paddingTop: 30,
      backgroundColor: WHITE,
   },
   icon: {
      width: 47,
      height: 47,
      marginVertical: 12,
      marginHorizontal: 15,
      borderRadius: 20,
      padding: 5,
   },
   iconSelectionView: {
      alignSelf: "center",
   },
   textTitle: {
      fontFamily: "PoppinsRegular",
      color: "#A4A2A2",
      marginLeft: 20,
      fontSize: 15,
   },
   textInput: {
      width: 320,
      height: 40,
      fontSize: 23,
      padding: 0,
      borderBottomColor: GRAY,
      borderBottomWidth: 1,
      fontFamily: "PoppinsBold",
      letterSpacing: 1,
      marginLeft: 20,
      marginBottom: 20,
   },
   btnSave: {
      alignSelf: "center",
      backgroundColor: PINK,
      width: 220,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
   },
   textSave: {
      fontSize: 17,
      fontFamily: "PoppinsRegular",
      letterSpacing: 1,
      color: WHITE,
   },
});
