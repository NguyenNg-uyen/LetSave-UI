import React, { useState, useEffect, useRef } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";
import { decode, encode } from "base-64";
import cash from "../../assets/images/icon_InsertIncome.png";
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
      PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function ReportDetail({ props, route }) {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [transactionList, setTransactionList] = useState([]);
   useEffect(() => {
      const getTransactionsList = async () => {
         let username = await AsyncStorage.getItem("username");
         let password = await AsyncStorage.getItem("password");
         axios({
            method: "POST",
            url: apiLib.getAllTransactionsInAMonth,
            auth: {
               username: username,
               password: password,
            },
            data: {
               type: route.params.transactionType,
            },
         })
            .then((res) => {
               let formatAmount = res.data.map((item) => {
                  if (item.type == "Expense") item.amount = "- $" + item.amount;
                  else item.amount = "+ $" + item.amount;
                  return item;
               });
               if (res.status == 200) setTransactionList(formatAmount);
            })
            .catch((err) => console.error(err));
      };
      getTransactionsList();
   }, []);

   // If fonts are loaded successfully
   if (fontsLoaded) {
      // ================= List view render ==================
      const renderItem = ({ item }) => (
         <ListItem bottomDivider>
            <Avatar
               size="medium"
               source={
                  route.params.transactionType == "Expense"
                     ? { uri: item.categoryImage }
                     : cash
               }
            />
            <ListItem.Content style={{ marginVertical: 5 }}>
               <ListItem.Title style={styles.categoryName}>
                  {route.params.transactionType == "Income"
                     ? item.note
                     : item.categoryName}
               </ListItem.Title>
               <ListItem.Subtitle style={styles.detailDate}>
                  {item.date}
               </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Title
               style={
                  route.params.transactionType == "Income"
                     ? [{ color: BLUE }, styles.categoryName]
                     : [{ color: PINK }, styles.categoryName]
               }
            >
               {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
               data={transactionList}
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
      backgroundColor: WHITE,
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
