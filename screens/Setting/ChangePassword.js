import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, FlatList, Image, TextInput } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { LIGHT_GRAY, PINK, WHITE } from '../../assets/color';
import { LinearGradient } from 'expo-linear-gradient';
import { fontSize, width } from 'styled-system';
const getFonts = () => {
    return Font.loadAsync({
        Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
        PoppinsReg: require("../.././assets/fonts/Poppins-Regular.ttf"),

    });
};
export default function ChangePassword({ navigation }) {
    const [currentPassword, onChangecurrentPassword] = React.useState("Useless Text");
    const [newPassword, onChangenewPassword] = React.useState("Useless Text");
    const [confirmPassword, onChangeconfirmPassword] = React.useState("Useless Text");
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if (fontsLoaded)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    
                    <Text
                            style={{
                                fontFamily: "PoppinsReg",
                                fontWeight: "bold",
                                fontSize: 25,
                                marginTop: 50,
                                marginLeft: -80,

                            }}
                        >Reset Password</Text>
                </View>
                <View style={styles.containerBody}>
                    <Text style={styles.titletext}>Current Password</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={onChangecurrentPassword}
                        value={currentPassword}
                        secureTextEntry
                    />
                    <Text style={styles.titletext}>New Password</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={onChangenewPassword}
                        value={newPassword}
                        secureTextEntry
                    />
                    <Text style={styles.titletext}>Confirm New Password</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={onChangeconfirmPassword}
                        value={confirmPassword}
                        secureTextEntry

                    />

                    <TouchableOpacity style={styles.buttonSubbmit}>
                        <LinearGradient colors={[PINK,'#ee8e6b']}
                            style={styles.linearGradient}>
                            <Text style={styles.button}>
                                Update Password
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
};
const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: "column",
            flex: 1,
            // backgroundColor: "black",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            width: "100%"
        },
        header:
        {
            marginTop: -70,
            marginBottom: 20,
            marginLeft: -120
        },
        containerBody:
        {
            height: "60%",
            width: "100%",
            marginTop:-30,
            borderRadius:15,
        
        },
        titletext:
        {
            fontFamily: "PoppinsBold",
            fontSize: 15,
            color: LIGHT_GRAY,
            marginTop: 50,
            marginLeft: 15,
        },
        textinput:
        {
            borderWidth: 1,
            borderBottomColor: LIGHT_GRAY,
            borderRightColor: WHITE,
            borderLeftColor: WHITE,
            borderTopColor: WHITE,
            width: "92%",
            marginLeft: 15,
            fontSize: 25,
            fontFamily:"PoppinsReg"
        },
        button:
        {
            alignSelf: "center",
            fontSize: 20,
            fontFamily: "PoppinsBold",
            marginTop: 50,
            borderRadius: 15,
            width: "100%",   
            height:"110%",      
            textAlign: 'center',
            alignItems: "center",
            color: WHITE
        },
        buttonSubbmit:
        {
            marginTop:40,
            height: "15%",
            width: "40%",
            alignItems: "center",
            alignSelf: "center",
            justifyContent:"center",
        },
        linearGradient: {
            flex: 1,
            justifyContent:"center",
            alignSelf:"center",
            alignItems:"center",
            borderRadius: 10,
            height:"30%",
            width:"230%",
        },
    });