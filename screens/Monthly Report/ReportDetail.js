import React, { useState } from "react";
import {
   StyleSheet,
   View,
   Image,
   StatusBar,
   FlatList,
   Text,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK, GREEN } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import coins from "../../assets/images/coins.png";
import { ListItem, Avatar } from "react-native-elements";
import { Card } from "react-native-shadow-cards";
// Set up letter fonts
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function ReportDetail({ props, route }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded) {
      // Transaction detail list data for showing
      const transactions = [
         { id: 1, categoryName: "Food", amount: 100, date: "Fri 10AM" },
         { id: 2, categoryName: "Pets", amount: 120, date: "Fri 10AM" },
         { id: 3, categoryName: "Shopping", amount: 10, date: "Fri 10AM" },
         { id: 4, categoryName: "House", amount: 10, date: "Fri 10AM" },
         { id: 5, categoryName: "Electric", amount: 10, date: "Fri 10AM" },
         { id: 5, categoryName: "Electric", amount: 10, date: "Fri 10AM" },
         { id: 5, categoryName: "Electric", amount: 10, date: "Fri 10AM" },
      ];
      // List view render
      const renderItem = ({ item }) => (
         <ListItem bottomDivider>
            <Avatar
               size="medium"
               source={{ uri: "https://i.ibb.co/zZ85M67/soccer-ball-48px.png" }}
            />
            <ListItem.Content style={{ marginVertical: 5 }}>
               <ListItem.Title style={styles.categoryName}>
                  {item.categoryName}
               </ListItem.Title>
               <ListItem.Subtitle style={styles.detailDate}>
                  {item.date}
               </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Title style={styles.amount}>
               - ${item.amount}
            </ListItem.Title>
         </ListItem>
      );
      return (
         <View style={styles.container}>
            <StatusBar barStyle="white-content" backgroundColor="#000000" />
            {/* ---------- Title of the income or expense of the month ---------*/}
            <View
               style={
                  route.params.transactionType == "Income"
                     ? [{ backgroundColor: BLUE }, styles.titleView]
                     : [{ backgroundColor: PINK }, styles.titleView]
               }
            >
               <Text style={styles.monthText}>May 2021</Text>
               <Text style={styles.totalBalanceText}>$2142,0</Text>
               <View style={styles.line}></View>
               <Image source={coins} style={styles.image} />
            </View>
            <Text
               style={{
                  fontSize: 15,
                  alignSelf: "flex-start",
                  fontFamily: "PoppinsRegular",
                  marginLeft: 30,
                  color: GRAY,
                  marginVertical: 10,
               }}
            >
               Transactions
            </Text>
            {/* ---------- List item detail ---------*/}
            <FlatList
               style={styles.listTransaction}
               keyExtractor={(item, index) => {
                  return index.toString();
               }}
               data={transactions}
               renderItem={renderItem}
            />
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
      alignContent: "center",
      alignItems: "center",
   },
   titleView: {
      height: 140,
      width: 370,
      // backgroundColor: PINK,
      borderRadius: 22,
      marginTop: 50,
      marginBottom: 20,
      padding: 20,
      position: "relative",
      elevation: 20,
   },
   monthText: {
      fontSize: 20,
      fontFamily: "PoppinsRegular",
      color: WHITE,
      letterSpacing: 1,
   },
   totalBalanceText: {
      fontSize: 30,
      fontFamily: "PoppinsBold",
      color: WHITE,
      letterSpacing: 2,
   },
   line: {
      height: 4,
      backgroundColor: WHITE,
      alignSelf: "stretch",
   },
   image: {
      width: 130,
      height: 130,
      position: "absolute",
      top: -33,
      right: 0,
   },
   listTransaction: {
      width: "100%",
      height: 60,
   },
   categoryName: {
      fontSize: 25,
      // fontWeight: "bold",
   },
   amount: {
      fontSize: 27,
      fontWeight: "bold",
      color: "red",
   },
});
