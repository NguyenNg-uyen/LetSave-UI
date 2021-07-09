import React, { useState } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
export default function CategoryList({ navigation }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const data = [
      {
         id: 1,
         name: "Transportation",
         image: require("../../assets/icons/gas_station_48px.png"),
      },
      {
         id: 2,
         name: "Food",
         image: require("../../assets/icons/food_48px.png"),
      },
      {
         id: 3,
         name: "Sick",
         image: { uri: "https://i.ibb.co/09zns0N/pill-48px.png" },
      },
      {
         id: 4,
         name: "Pet",
         image: require("../../assets/icons/pets_48px.png"),
      },
      {
         id: 4,
         name: "Shopping",
         image: require("../../assets/icons/green_dress_48px.png"),
      },
      {
         id: 5,
         name: "Electric",
         image: require("../../assets/icons/internet_48px.png"),
      },
      {
         id: 6,
         name: "Books",
         image: require("../../assets/icons/pets_48px.png"),
      },
      {
         id: 7,
         name: "House",
         image: require("../../assets/icons/house_48px.png"),
      },
      {
         id: 8,
         name: "House",
         image: require("../../assets/icons/house_48px.png"),
      },
   ];
   const [categoriesListFilter, setCategoriesListFiler] = useState(data);

   const handleSearch = (text) => {
      setCategoriesListFiler(
         data.filter((category) => {
            return category.name.toLowerCase().includes(text.toLowerCase());
         })
      );
   };
   // If fonts are loaded successfully
   if (fontsLoaded) {
      const keyExtractor = (item, index) => index.toString();

      const renderItem = ({ item }) => (
         <ListItem bottomDivider>
            <Avatar size="medium" source={item.image} />
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
