import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import {
  WHITE,
  BLUE,
  PINK,
  GRAY,
  BLACK,
  LIGHT_GRAY,
  MEDIUM_PINK,
} from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logo.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import apiLib from "../../assets/ApiStore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Image

// Set up letter fonts
const getFonts = () => {
  return Font.loadAsync({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
  });
};
const UpdateProfile = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [mail, setMail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [fname, setFname] = useState("");
  const [Username, setUsername] = useState("");
  // Validate Email
  const validate = () => {
    const emailRegex =
      /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (!emailRegex.test(mail)) {
      Alert.alert("Email is not valid");
      setMail("");
    }
  };
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
    const formatDate = moment(date).format("YYYY-MM-DD");
    setDate(formatDate);
  };
  //================ GET USER NAME =================
  useEffect(() => {
    async function getUsername() {
      let username = await AsyncStorage.getItem("username");
      let password = await AsyncStorage.getItem("password");
      setUsername(username);
    }
    getUsername();
  }, []);
  //============ Update profile API =================
  const updateUser = async () => {
    let username = await AsyncStorage.getItem("username");
    let password = await AsyncStorage.getItem("password");
    axios({
      method: "PUT",
      url: apiLib.updateProfile,
      auth: {
        username: username,
        password: password,
      },
      data: {
        email: mail,
        phone: phonenum,
        birthday: date,
        fullname: fname,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          navigation.push("Home");
        } else {
          Alert.alert("Update unsuccess");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (fontsLoaded) {
    return (
      <View style={[{ flexDirection: "column" }, styles.container]}>
        {/* Avatar and name */}
        <View
          style={{
            flexDirection: "row",
            // backgroundColor: PINK,
            height: "30%",
            borderRadius: 15,
          }}
        >
          <Image style={[styles.image, { marginTop: 20 }]} source={logo} />
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.titleText, { marginTop: 80, marginLeft: 20 }]}>
              {Username}
            </Text>
          </View>
        </View>
        {/* ===========  User information =================*/}
        <View style={styles.containerInfo}>
          <SafeAreaView>
            {/* ==================== Email field ======================= */}
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="email"
                size={25}
                style={{
                  color: PINK,
                  marginTop: 8,
                  marginLeft: 12,
                }}
              ></MaterialIcons>
              <Text style={styles.titleInfo}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="name@domain.com"
              onChangeText={(val) => setMail(val)}
              value={mail}
              onBlur={validate}
            />

            {/* ==================== Full name field ======================= */}
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="account-box"
                size={25}
                style={styles.icon}
              ></MaterialIcons>
              <Text style={styles.titleInfo}>Full Name</Text>
            </View>
            <TextInput
              style={styles.input}
              value={fname}
              onChangeText={setFname}
            />
            {/* ==================== Birthday field ======================= */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={showDatePicker}>
                <MaterialIcons
                  name="calendar-today"
                  size={25}
                  style={styles.icon}
                ></MaterialIcons>
              </TouchableOpacity>
              <Text style={styles.titleInfo}>Birthday</Text>
            </View>
            <Text style={[styles.input, { paddingVertical: 10 }]}>
              {date.toLocaleString()}
            </Text>
            <DateTimePickerModal
              value={date}
              mode={"date"}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              isVisible={isDatePickerVisible}
            />

            {/* ==================== Phone field ======================= */}
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="phone"
                size={25}
                style={styles.icon}
              ></MaterialIcons>
              <Text style={styles.titleInfo}>Phone</Text>
            </View>
            <TextInput
              style={styles.input}
              value={phonenum}
              onChangeText={setPhonenum}
              keyboardType="numeric"
            />
          </SafeAreaView>
        </View>
        {/* button submit */}
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            updateUser();
          }}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => console.warn}
      />
    );
  }
};
export default UpdateProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    backgroundColor: WHITE,
    paddingHorizontal: 10,
  },
  container1: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 20,
    // borderBottomEndRadius: 8,
    // borderBottomStartRadius: 8,
    // borderBottomWidth: 0.8,
  },
  containerInfo: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: PINK,
    paddingBottom: 15,
  },
  image: {
    borderRadius: 50,
    height: 170,
    width: 170,
    alignItems: "center",
    borderColor: WHITE,
  },
  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
    //  color: WHITE,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: WHITE,
  },
  titleInfo: {
    fontFamily: "PoppinsLight",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: "bold",
  },
  textInfo: {
    fontFamily: "PoppinsRegular",
    fontSize: 22,
    marginLeft: 30,
    backgroundColor: WHITE,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  commandButton: {
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: PINK,
    alignItems: "center",
    alignSelf: "center",
    width: "30%",
    height: "5%",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  icon: {
    color: PINK,
    marginTop: 8,
    marginLeft: 12,
  },
});
