import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, FlatList, Image, TextInput } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import avartar from "../.././assets/images/avatar.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { LIGHT_GRAY, PINK, WHITE } from '../../assets/color';
import * as Progress from 'react-native-progress';
import ModalPicker from "../ModalPicker";
import { margin, marginLeft, style } from 'styled-system';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import icon_Category from "../.././assets/images/icon_category.png";
import moment from "moment";
import payment from "../../assets/payment.png"
import moneypack from "../../assets/money.png"
import calendar from "../../assets/calendar.png"
import catego from "../../assets/category.png"
import createBudget from "../../assets/createownBudget.png"

const getFonts = () => {
    return Font.loadAsync({
        Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
        Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
        PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),
    });
};
export default function BudgetSreen({ navigation, route }) {
    const [text, onChangeText] = React.useState("Useless Text");
    const [fontsLoaded, setFontsLoaded] = useState(false);
    let categoryId, categoryName;
    // if (route.params !== undefined) {
    //    categoryId = route.params.categoryID;
    //    categoryName = route.params.categoryName;
    // }
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
    if (fontsLoaded)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name="chevron-left"
                        size={20}
                        style={{
                            marginLeft: 10,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: "Poppins",
                            fontSize: 20,
                            marginLeft: 110,
                            marginTop: 10
                        }}
                    >CreateBudget</Text>

                </View>
                {/*------------------ Notification-------------- */}
                <View style={[styles.notification]}>
                    <Text
                        style={{
                            fontFamily: "Poppins",
                            fontSize: 26,
                            color: WHITE,
                            paddingTop: 5,
                            textAlign:"center"
                        }}
                    >
                        <Image
                        source={createBudget}
                        style={{
                            height: 30,
                            width: 30,
                        }} />
                        CREATE OWN BUDGET
                    </Text>
                </View>
                <SafeAreaView style={styles.containerInfo}>
                    <View style={styles.infoElement}>
                        <Image
                            width={50}
                            height={100}
                            style={styles.image}
                            source={payment}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder={"Enter Budget"}
                        />
                    </View>
                    <View style={styles.infoElement}>
                        <Image
                            width={50}
                            height={100}
                            style={styles.image}
                            source={moneypack}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder={"Enter Money Amount"}
                        />
                    </View>
                    <View style={styles.infoElement}>
                        <Image
                            width={50}
                            height={100}
                            style={{
                                marginLeft: -90,
                                height: 35,
                                width: 30,
                            }}
                            source={calendar}
                        />
                        <TouchableOpacity
                            onPress={showDatePicker}
                            style={{
                                marginLeft: 100,
                                marginTop: 20,
                            }}>

                            <Text
                                style={[
                                    styles.text_input,
                                ]}
                            >
                                {date.toLocaleString()}
                            </Text>
                            <DateTimePickerModal
                                value={date}
                                mode={"date"}
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                isVisible={isDatePickerVisible}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.infoElement, {
                            flexDirection: "row",
                            marginLeft: 32,
                            marginTop: 40,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CategoryChoice")}
                        >
                            <Image
                                source={catego}
                                style={{ width: 30, height: 25 }}
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text style={[{ marginLeft: 85, fontSize: 15, marginTop: 0, }, styles.text_label]}>
                                Choose Category
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 25,
                                    fontFamily: "Poppins",
                                }}
                            >
                                {categoryName !== undefined ? categoryName : ""}
                            </Text>
                            {/* <Text>{route.params.cateName}</Text> */}
                            {/* <TextInput
                    style={[styles.text_input, { marginTop: 8, marginLeft: 8 }]}
                    placeholder={route.params.cateName}
                    onChangeText={setCategory}
                    value={category}
              /> */}
                        </View>
                    </View>

                    {/* button submit */}
                    <View>
                        <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
                            <Text
                                style=
                                {{
                                    borderWidth: 1,
                                    borderColor: PINK,
                                    marginTop: 50,
                                    height: 32,
                                    width: 90,
                                    fontSize: 20,
                                    borderRadius: 10,
                                    color: WHITE,
                                    backgroundColor: PINK,
                                    fontFamily: "Poppins",
                                    textAlign: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View >
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
};
const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: "column",
            flex: 1,
            backgroundColor: WHITE,
        },
        header:
        {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginBottom: 0,
            marginTop: 25,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomColor: LIGHT_GRAY,
        },
        input: {
            height: 40,
            width: "80%",
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: "PoppinsReg",
            borderRadius: 25,
            fontSize: 15,
        },
        titleInfo: {
            fontFamily: "Poppins",
            fontSize: 18,
            marginLeft: 30,
            marginTop: 15,
            flexDirection: "row"
        },
        containerInfo: {
            marginTop: 0,
            backgroundColor: WHITE,
            height: "60%",
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: PINK,
            elevation: 10,

        },
        infoElement:
        {
            flexDirection: "row",
            marginTop: 25,
        },
        text_input: {
            fontSize: 15,
            fontFamily: "PoppinsReg",
            textAlign: "center",
            justifyContent: "center",
            marginTop: -10,
        },
        image:
        {
            height: 30,
            width: 25,
            marginLeft: 15
        },
        horizontalline: {
            height: 1,
            width: 335,
            backgroundColor: WHITE,
            borderColor: WHITE,
            borderStyle: "solid",
            borderWidth: 1.2,
            borderRadius: 1,
        },
        notification: {
            paddingTop: 20,
            width: 350,
            height: 75,
            backgroundColor: PINK,
            borderRadius: 22,
            marginTop: 20,
            marginBottom: 30,
            marginLeft: 25,
            padding: 15,
            paddingTop: 11,
            position: "relative",
            marginHorizontal: 4,
        },
    });