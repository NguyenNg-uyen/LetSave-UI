import React, { useState } from "react";
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
import avartar from "../.././assets/images/avatar.png";
import Icon from "react-native-vector-icons/FontAwesome";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
const getFonts = () => {
   return Font.loadAsync({
      Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
      Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
   });
};

export default function DailyScreen() {
   const DATA = [
      {
         id: "1",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "2",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "3",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "4",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "5",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "6",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "7",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
      {
         id: "8",
         image: require("../.././assets/images/logo.png"),
         service: "Food & Bevrage",
         timeline: "Fri 10AM",
         money: "-1220,2$",
      },
   ];
   const Item = ({ image, service, timeline, money }) => (
      <View style={styles.item}>
         <Image source={image} style={styles.itemicon} />
         <Text style={styles.service}>{service + "\n" + timeline}</Text>
         <Text style={styles.money}>{money}</Text>
      </View>
   );
   const renderItem = ({ item }) => (
      <Item
         image={item.image}
         service={item.service}
         timeline={item.timeline}
         money={item.money}
      />
   );
   //=========== Date Picker  =================
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [date, setDate] = useState(moment().format("LL"));
   const showDatePicker = () => {
      setDatePickerVisibility(true);
   };
   const hideDatePicker = () => {
      setDatePickerVisibility(false);
   };
   const handleConfirm = (date) => {
      hideDatePicker();
      const formatDate = moment(date).format("LL");
      setDate(formatDate);
   };
   const [fontsLoaded, setFontsLoaded] = useState(false);
   // If fonts are loaded successfully
   if (fontsLoaded)
      return (
         <View style={styles.container}>
            {/* Profile content */}
            <View name="user" style={styles.profile1}>
               <View name="avatar">
                  <View style={styles.avatarbackground}>
                     <Image style={styles.image} source={avartar} />
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
                  Abbie Wilson{" "}
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
                  $4225.450
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
               <View 
               style={styles.content}>
               <Text
                  style={{
                     fontFamily: "Poppins",
                     color: "#FF3378",
                     fontSize: 20,
                     marginLeft:15,
                     marginTop:10,
                  }}
               >
                  Recent Transaction
               </Text>
               <TouchableOpacity onPress={showDatePicker}>
                  <Icon
                     name="calendar"
                     color="#FF3378"
                     size={20}
                     style={{ marginTop:12,marginRight:18}}
                  ></Icon>
               </TouchableOpacity>
               <DateTimePickerModal
                     value={date}
                     mode={"date"}
                     onConfirm={handleConfirm}
                     onCancel={hideDatePicker}
                     isVisible={isDatePickerVisible}
                  />
                  </View>
               <SafeAreaView style={styles.FlatList}>
                  <FlatList
                     data={DATA}
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
      marginBottom:15,
      fontSize: 32,
      fontFamily: "Poppins",
      alignSelf: "flex-end",
      color: "#FF3378",
   },
   service: {
      fontSize: 15,
      fontFamily: "Poppins",
      left: 0,
      marginTop:10,
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
   content:{
      justifyContent:"space-between",
      flexDirection:"row",
   }
});
