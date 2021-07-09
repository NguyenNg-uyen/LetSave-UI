import React, { useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome5";
import data from "../../components/Category/ListIcon";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
export default function AddCategory({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [categoryName, setCategotyName] = useState("");
   const [selected, setSelected] = useState({ id: 1 });
   var category = {};
   const onSelect = (index) => {
      setSelected((prevState) => ({ ...prevState, id: index }));
      let link = data[index].link;
      category = { name: categoryName, icon: link };
      console.log(category);
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
               onChangeText={(val) => setCategotyName(val)}
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
               onPress={() => {
                  navigation.navigate("CategoryList", category);
               }}
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
