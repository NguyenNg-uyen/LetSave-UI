import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Text,
   View,
   Button,
   Image,
   FlatList,
   SafeAreaView,
   StatusBar,
   TouchableOpacity,
} from "react-native";
import stat from "../.././assets/images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};

export default function DailyScreen() {
   const [data, setData] = useState([]);
   const [avatar, setAvatar] = useState("");
   const [fullname, setFullname] = useState("");
   const [balance, setBalance] = useState(0); 

   useEffect(() => {

      const getDailyTransactions = async () => {
         const username = await AsyncStorage.getItem("username");
         const password = await AsyncStorage.getItem("password");

         // get daily transaction
         axios({
            method: 'GET',
            url: 'http://localhost:8080/transactions/daily',
            auth: {
               username: username,
               password: password
            }
         })
            .then(res => {
               let newlist = res.data.map((item) => {
                  if (item.type == 'Expense') {
                     item.amount = -item.amount;
                  } else if (item.type == 'Income') {
                     item.amount = '+' + item.amount;
                  }
                  return item;
               });
               setData(newlist);
            })
            .catch(err => {
               console.log(err);
            });

         // Get fullname and avatar
         axios({
            method: 'GET',
            url: 'http://localhost:8080/accounts/profile',
            auth: {
               username: username,
               password: password
            }
         })
            .then(res => {
               setFullname(res.data.fullname);
               setAvatar(res.data.avatar);
            })
            .catch(err => {
               console.log(err);
            });

         // Get balance
         axios({
            method: 'GET',
            url: 'http://localhost:8080/balances',
            auth: {
               username: username,
               password: password
            }
         })
            .then(res => {
               setBalance(res.data.total);
            })
            .catch(err => {
               console.log(err);
            });
      };

      getDailyTransactions();

   }, []);
   
   const Item = ({ image, service, timeline, money }) => (
      <View style={styles.item}>
         <Image source={image} style={styles.itemicon} />
         <Text style={styles.service}>{service + "\n" + timeline}</Text>
         <Text style={styles.money}>{money}</Text>
      </View>
   );
   const renderItem = ({item}) => (
      <Item
         image={item.categoryImage}
         service={item.type}
         timeline={item.date}
         money={item.amount}
      />
   );
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            {/* Profile content */}
            <View name="user" style={styles.profile1}>
               <View name="avatar">
                  <View style={styles.avatarbackground}>
                     <Image style={styles.image} source={avatar} />
                  </View>
               </View>
               <Text
                  name="username"
                  style={{
                     left: 0,
                     top: 10,
                     fontSize: 14,
                     color: "white",
                     fontFamily: "Poppins",
                  }}
               >
                  {" "}
                  {fullname}{" "}
               </Text>
            </View>
            <View style={{ left: 120, top: 14, left: 60 }}>
               <Text
                  style={{
                     fontSize: 30,
                     color: "white",
                     fontFamily: "Poppins",
                  }}
               >
                  ${balance}
               </Text>
               <Text
                  style={{
                     fontSize: 18,
                     color: "white",
                     left: 10,
                     fontFamily: "Poppins",
                     top: -17,
                  }}
               >
                  Current Balance
               </Text>
            </View>
            {/* Transaction List */}
            <View style={styles.list}>
               <Text
                  style={{
                     fontFamily: "Poppins",
                     color: "#FF3378",
                     fontSize: 20,
                     left: 15,
                     top: 10,
                  }}
               >
                  Recent Transaction
               </Text>
               <Icon
                  name="calendar"
                  color="#FF3378"
                  size={20}
                  style={{ left: 370, top: -20 }}
               ></Icon>
               <SafeAreaView style={styles.FlatList}>
                  <FlatList
                     data={data}
                     renderItem={renderItem}
                     keyExtractor={(item) => item.id}
                  />
               </SafeAreaView>
            </View>
         </View>
      );
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
const styles = StyleSheet.create({
   FlatList: {
      flex: 1,
      marginBottom: 270,
   },
   item: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 15,
      borderWidth: 0.5,
      borderColor: "#FF3378",
      flexDirection: "row",
      shadowRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
   },
   itemicon: {
      backgroundColor: "black",
      borderRadius: 54,
      height: 85,
      width: 85,
      left: -10,
   },
   money: {
      top: -15,
      fontSize: 32,
      fontFamily: "Poppins",
      alignSelf: "flex-end",
      color: "#FF3378",
   },
   service: {
      fontSize: 15,
      fontFamily: "Poppins",
      left: 0,
      top: 10,
      alignSelf: "flex-start",
   },
   container: {
      top: 40,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FF3378",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
   },
   list: {
      top: 50,
      height: 760,
      width: 410,
      backgroundColor: "#FBFBFB",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
   },
   image: {
      borderRadius: 50,
      height: 90,
      width: 90,
      alignItems: "center",
      top: 2.2,
      left: 2.2,
   },
   avatarbackground: {
      backgroundColor: "white",
      height: 95,
      width: 95,
      borderRadius: 50,
   },
   profile1: {
      position: "relative",
      backgroundColor: "#FF3378",
      right: 130,
      height: 130,
      width: 110,
      top: 120,
      right: 130,
   },
});
