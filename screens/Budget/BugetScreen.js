import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   FlatList,
   Image,
   Alert,
   TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { LIGHT_GRAY, PINK, WHITE, MEDIUM_PINK, GRAY } from "../../assets/color";
import * as Progress from "react-native-progress";
import ModalPicker from "../ModalPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import apiLib from "../../assets/ApiStore";
const getFonts = () => {
   return Font.loadAsync({
      //   PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};
export default function BudgetSreen({ navigation }) {
   const [budgetList, setBudgetList] = useState([]);
   const [month, setMonth] = useState(parseInt(new Date().getMonth()) + 1);
   const [year, setYear] = useState(parseInt(new Date().getFullYear()));
   const getMonthAndYear = (month, year) => {
      setMonth(month);
      setYear(year);
   };
   useEffect(() => {
      const getBudgets = async () => {
         let username = await AsyncStorage.getItem("username");
         let password = await AsyncStorage.getItem("password");
         axios({
            method: "POST",
            url: apiLib.getBudgetByMonth,
            auth: {
               username,
               password,
            },
            data: {
               month: month,
               year: year,
            },
         }).then((res) => {
            setBudgetList(res.data);
         });
      };

      getBudgets();
   }, [month, year]);
   const Item = ({ image, service, money2, money, percent, percentnumber }) => (
      <View style={styles.item}>
         <Image source={{ uri: image }} style={styles.itemicon} />
         <Text style={styles.service}>{service}</Text>
         <Text style={styles.money2}>${money2}</Text>
         <Text style={styles.money}>
            ${money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
         </Text>
         <Text style={styles.percent}>{percent + "%"}</Text>
         <Progress.Bar
            style={styles.progessbar}
            animated={true}
            indeterminateAnimationDuration={1000}
            progress={percentnumber}
            width={338}
            height={10}
         />
      </View>
   );
   const renderItem = ({ item }) => (
      <Item
         image={item.image}
         service={item.name}
         money2={item.actualAmount}
         money={item.amount}
         percent={item.status}
         percentnumber={item.status / 100}
      />
   );
   const [fontsLoaded, setFontsLoaded] = useState(false);
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            <View style={styles.header}>
               <Text
                  style={{
                     fontFamily: "Poppins",
                     fontSize: 30,
                  }}
               >
                  Budget
               </Text>

               <TouchableOpacity
                  onPress={() => {
                     Alert.alert("OK");
                     // navigation.navigate("CreateBudgetScreen");
                  }}
                  style={{ backgroundColor: "black" }}
               >
                  <MaterialIcons name="queue" size={40} />
               </TouchableOpacity>
            </View>
            <View style={styles.calendar1}>
               <View
                  style={{
                     marginBottom: 10,
                     display: "flex",
                     flexDirection: "row",
                  }}
               >
                  <Text style={[{ marginRight: 10 }, styles.line]}>
                     ---------
                  </Text>
                  <ModalPicker sendMonthAndYear={getMonthAndYear} />
                  <Text style={[{ marginLeft: 10 }, styles.line]}>
                     ---------
                  </Text>
               </View>
            </View>
            <View>
               <SafeAreaView style={styles.FlatList}>
                  <FlatList
                     data={budgetList}
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
   container: {
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      backgroundColor: WHITE,
   },
   FlatList: {
      flex: 1,
      marginBottom: 230,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: WHITE,
      width: "90%",
      marginTop: 45,
   },
   item: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      height: 160,
      borderRadius: 20,
      borderWidth: 0.5,
      elevation: 10,
      position: "relative",
      width: 380,
      flexDirection: "row",
   },
   itemicon: {
      borderRadius: 54,
      height: 80,
      width: 80,
      left: -10,
      backgroundColor: MEDIUM_PINK,
   },
   money: {
      fontSize: 15,
      position: "absolute",
      bottom: 40,
      right: 20,
   },
   service: {
      fontSize: 20,
      fontFamily: "Poppins",
      color: GRAY,
   },
   money2: {
      fontSize: 30,
      position: "absolute",
      top: 42,
      left: 100,
   },
   percent: {
      fontFamily: "Poppins",
      position: "absolute",
      color: PINK,
      fontSize: 30,
      right: 20,
      top: 18,
   },
   progessbar: {
      height: "10%",
      width: "100%",
      position: "absolute",
      bottom: 15,
      left: 20,
   },
   calendar1: {
      // width: "100%",
      display: "flex",
      width: "105%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginBottom: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      // marginLeft: 10,
      borderWidth: 2,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderBottomColor: LIGHT_GRAY,
      borderTopColor: WHITE,
   },
   calendar2: {
      marginBottom: 20,
   },
   line: {
      marginTop: 8,
      fontSize: 28,
      color: PINK,
   },
});
