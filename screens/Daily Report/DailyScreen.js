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
   Alert,
} from "react-native";
import stat from "../.././assets/images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import logo from "../../assets/images/logo.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";
import { MEDIUM_PINK, LIGHT_GRAY, GREEN, PINK } from "../../assets/color";
import icon_InsertIncome from "../../assets/images/icon_InsertIncome.png";
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};

export default function DailyScreen() {
   const [data, setData] = useState([]);
   // const [avatar, setAvatar] = useState("");
   const [userName, setUsername] = useState("");
   const [balance, setBalance] = useState(0);
   // ========================== Date picker handler ====================================
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [date, setDate] = useState(moment().format("LL"));
   const showDatePicker = () => {
      setDatePickerVisibility(true);
   };
   const hideDatePicker = () => {
      setDatePickerVisibility(false);
   };
   const handleConfirm = async (datee) => {
      hideDatePicker();
      const formatDate = moment(datee).format("YYYY-MM-DD");
      setDate(formatDate);
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");

      axios({
         method: "POST",
         url: apiLib.getTransactionByParticularDate,
         auth: {
            username: username,
            password: password,
         },
         data: {
            date: formatDate,
         },
      })
         .then((res) => {
            let newlist = res.data.map((item) => {
               if (item.type == "Expense") {
                  item.amount = "- $" + item.amount;
               } else if (item.type == "Income") {
                  item.amount = "+ $" + item.amount;
               }
               return item;
            });
            setData(newlist);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   useEffect(() => {
      const getDailyTransactions = async () => {
         const username = await AsyncStorage.getItem("username");
         const password = await AsyncStorage.getItem("password");
         setUsername(username);
         //==================== Get daily transaction ==========================
         axios({
            method: "GET",
            url: apiLib.getDailyTransactioninCurrentYear,
            auth: {
               username: username,
               password: password,
            },
         })
            .then((res) => {
               let newlist = res.data.map((item) => {
                  if (item.type == "Expense") {
                     item.amount = "- $" + item.amount;
                  } else if (item.type == "Income") {
                     item.amount = "+ $" + item.amount;
                  }
                  return item;
               });
               setData(newlist);
            })
            .catch((err) => {
               console.log(err);
            });

         // Get balance
         axios({
            method: "GET",
            url: apiLib.getBalances,
            auth: {
               username: username,
               password: password,
            },
         })
            .then((res) => {
               setBalance(res.data.total);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getDailyTransactions();
   }, []);
   // const Item = ({ image, service, timeline, money }) => (
   //    <View style={styles.item}>
   //       <Image source={{ uri: image }} style={styles.itemicon} />
   //       <Text style={styles.service}>{service}</Text>
   //       <Text style={styles.timeline}>{timeline}</Text>
   //       <Text style={styles.money}>{money}</Text>
   //    </View>
   // );
   const renderItem = ({ item }) => (
      <View style={styles.item}>
         <Image
            source={
               item.type == "Expense"
                  ? { uri: item.categoryImage }
                  : icon_InsertIncome
            }
            style={styles.itemicon}
         />
         <Text style={styles.service}>
            {item.type == "Expense" ? item.categoryName : item.note}
         </Text>
         <Text style={styles.timeline}>{item.date}</Text>
         <Text
            style={
               item.type == "Income"
                  ? [{ color: GREEN }, styles.money]
                  : [{ color: "#FF3378" }, styles.money]
            }
         >
            {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
         </Text>
      </View>
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
                     <Image style={styles.image} source={logo} />
                  </View>
               </View>
               <Text
                  name="username"
                  style={{
                     left: -1,
                     top: 10,
                     fontSize: 20,
                     color: "white",
                     fontFamily: "Poppins",
                  }}
               >
                  {" "}
                  {userName}{" "}
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
                  ${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                  Daily Transaction
               </Text>
               <TouchableOpacity
                  onPress={showDatePicker}
                  style={{ left: 370, top: -20 }}
               >
                  <Icon name="calendar" color="#FF3378" size={20}></Icon>
               </TouchableOpacity>
               <DateTimePickerModal
                  value={date}
                  mode={"date"}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  isVisible={isDatePickerVisible}
               />
               <SafeAreaView style={styles.FlatList}>
                  <FlatList
                     data={data}
                     renderItem={renderItem}
                     keyExtractor={(item, index) => index.toString()}
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
      elevation: 17,
      position: "relative",
   },
   itemicon: {
      backgroundColor: MEDIUM_PINK,
      borderRadius: 54,
      height: 75,
      width: 75,
      left: -10,
   },
   money: {
      fontSize: 25,
      fontFamily: "Poppins",
      alignSelf: "flex-end",
      position: "absolute",
      right: 10,
      top: 35,
   },
   service: {
      fontSize: 15,
      fontFamily: "Poppins",
      left: 0,
      top: 10,
      alignSelf: "flex-start",
   },
   container: {
      top: 0,
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
   timeline: {
      fontFamily: "Poppins",
      fontSize: 15,
      position: "absolute",
      top: 55,
      left: 90,
      color: LIGHT_GRAY,
   },
});
