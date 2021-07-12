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
import iconData from "../../components/Category/ListIcon";
import AddScreen from "../Transaction/AddScreen";

// Set up letter fonts
const getFonts = () => {
  return Font.loadAsync({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
  });
};
export default function CategoryList({ navigation, category }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const data = [
    {
      id: 1,
      name: "Transportation",
      image: require("../../assets/icons/gas_station_48px.png"),
    },
    {
      id: 2,
      name: "Motor",
      image: { uri: iconData[9].link },
    },
  ];
  // Searching Data
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
        <TouchableOpacity onPress={() => navigation.navigate("AddScreen")}>
          <ListItem.Content>
            <ListItem.Title style={styles.textCategoryName}>
              {item.name}
            </ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
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
          // renderItem={({ renderItem }) => (
          //   <TouchableOpacity onPress={() => navigation.navigate('AddScreen')}>
          //     <View>
          //       <Text>ID: {item.id}</Text>
          //       <Text>Title: {item.title}</Text>
          //     </View>
          //   </TouchableOpacity>
          // )}
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
