import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    SafeAreaView,
    TextInput,
    onChangeText,
} from "react-native";
import { WHITE, BLUE, PINK, GRAY, BLACK, LIGHT_GRAY, MEDIUM_PINK } from "../../assets/color";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import avatar from "../../assets/images/avatar.png";
// Set up letter fonts
const getFonts = () => {
    return Font.loadAsync({
        PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
        PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
        PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    });
};
const ProfileSettingScreen = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if (fontsLoaded) {
        return (
            <View style={[{ flexDirection: "column" }, styles.container]}>
                <View style={styles.container1}>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SettingScreen");
                            }}
                        >
                            <MaterialIcons
                                name="chevron-left"
                                size={30}
                                style={{ marginRight: 90, left: -25 }}

                            ></MaterialIcons>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: "PoppinsBold", fontSize: 20 }}>
                            Profile Setting
                        </Text>
                        {/* ==================== Open Setting Screen =========================*/}
                    </View>
                    {/* Avatar and name */}
                    <View style={{ flexDirection: "row", backgroundColor:PINK,height:"30%",borderRadius:15 }}>
                        <Image
                            style={[styles.image, { marginTop: 20 }]}
                            source={avatar}
                        />
                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={[
                                    styles.titleText,
                                    { marginTop: 80, marginLeft: 20 },
                                ]}
                            >
                                Abbie Wilson
                            </Text>
                        </View>
                    </View>
                    {/* ===========  User information =================*/}
                    <View style={[{ flex: 0.9 }, styles.containerInfo]}>
                        <SafeAreaView>
                            <View style={{ flexDirection: "row" }}>
                                <MaterialIcons
                                name="email"
                                size={25}
                                style={{ color: WHITE,marginTop:8,marginLeft:12 }}
                                >
                                </MaterialIcons>
                                <Text style={styles.titleInfo}>
                                    Email
                                </Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={"jparker@gmail.com"}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <MaterialIcons
                                name="cake"
                                size={25}
                                style={{ color: WHITE,marginTop:8,marginLeft:12 }}
                                >
                                </MaterialIcons>
                                <Text style={styles.titleInfo}>
                                    Birthday
                                </Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={"04-19-1992"}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <MaterialIcons
                                name="phone"
                                size={25}
                                style={{ color: WHITE,marginTop:8,marginLeft:12 }}
                                >
                                </MaterialIcons>
                                <Text style={styles.titleInfo}>
                                    Phone
                                </Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={"0900123345"}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <MaterialIcons
                                name="home"
                                size={25}
                                style={{ color: WHITE,marginTop:8,marginLeft:12 }}
                                >
                                </MaterialIcons>
                                <Text style={styles.titleInfo}>
                                    Address
                                </Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={"VietNam"}
                            />
                        </SafeAreaView>
                    </View>
                </View>
                {/* button submit */}
                <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
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
export default ProfileSettingScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "auto",
        backgroundColor: WHITE,
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
        top: 10,
        backgroundColor: MEDIUM_PINK,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#c2c2c2",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        color:WHITE,
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
        fontWeight:"bold",
    },
    textInfo: {
        fontFamily: "PoppinsRegular",
        fontSize: 22,
        marginLeft: 30,
        backgroundColor: WHITE,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
    },
    commandButton: {
        borderRadius: 10,
        backgroundColor: PINK,
        alignItems: 'center',
        alignSelf: 'center',
        width: "30%",
        height: "5%",
        top: -25,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
});
