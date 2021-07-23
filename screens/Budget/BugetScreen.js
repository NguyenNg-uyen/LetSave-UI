import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Image, } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import avartar from "../.././assets/images/avatar.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { LIGHT_GRAY, PINK, WHITE } from '../../assets/color';
import * as Progress from 'react-native-progress';
import ModalPicker from "../ModalPicker";
import { style } from 'styled-system';

const getFonts = () => {
    return Font.loadAsync({
        Frijole: require("../../assets/fonts/Frijole-Regular.ttf"),
        Poppins: require("../../assets/fonts/Poppins-Bold.ttf"),
    });
};
export default function BudgetSreen() {
    // FLATLIST DATA ITEM
    const DATA = [
        {
            id: "1",
            image: require("../.././assets/images/logo.png"),
            service: "Food & Bevrage",
            money2: "$1234,2",
            money: "$1000.0",
            percent: "80%",
            percentnumber: 0.8,
        },
        {
            id: "2",
            image: require("../.././assets/images/logo.png"),
            service: "Food & Bevrage",
            money2: "$1234,2",
            money: "$1000.0",
            percent: "80%",
            percentnumber: 0.8,
        },
        {
            id: "3",
            image: require("../.././assets/images/logo.png"),
            service: "Food & Bevrage",
            money2: "$1234,2",
            money: "$1000.0",
            percent: "80%",
            percentnumber: 0.8,
        },
        {
            id: "4",
            image: require("../.././assets/images/logo.png"),
            service: "Food & Bevrage",
            money2: "$1234,2",
            money: "$1000.0",
            percent: "80%",
            percentnumber: 0.8,
        },
    ];
    const Item = ({ image, service, money2, money, percent, percentnumber }) => (
        <View style={styles.item}>
            <Image source={image} style={styles.itemicon} />
            <Text style={styles.service}>{service}</Text>
            <Text style={styles.money2}>{money2}</Text>
            <Text style={styles.money}>{money}</Text>
            <Text style={styles.percent}>{percent}</Text>
            <Progress.Bar style={styles.progessbar}
                animated={true}
                indeterminateAnimationDuration={1000}
                progress={percentnumber}
                width={338}
                height={10} />
        </View>
    );
    const renderItem = ({ item }) => (
        <Item
            image={item.image}
            service={item.service}
            money2={item.money2}
            money={item.money}
            percent={item.percent}
            percentnumber={item.percentnumber}
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
                    >Budget</Text>
                    <MaterialIcons
                        name="queue"
                        size={40}
                        style={{
                        }}
                    />
                </View>
                <View style={styles.calendar1}>
                    <View>
                        
                    </View>
                    <Text style={[{ marginRight: 10 }, styles.line]}>
                        - ~ - ~ - ~
                    </Text>
                    <ModalPicker
                    style={style.calendar2}
                    />
                    <Text style={[{ marginLeft: 10 }, styles.line]}>
                        ~ - ~ - ~ -
                    </Text>
                </View>
                <View>
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
};
const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: "column",
            flex: 1,
            alignItems: 'center',
            backgroundColor: WHITE,
        },
        FlatList: {
            flex: 1,
            marginBottom: 230,
        },
        header:
        {
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
            borderRadius: 15,
            borderWidth: 0.5,
            flexDirection: "row",
            elevation:10,
            
        },
        itemicon: {
            backgroundColor: "black",
            borderRadius: 54,
            height: 85,
            width: 85,
            left: -10,
        },
        money: {
            marginTop: 55,
            marginLeft: 20,
            fontSize: 15,

        },
        service: {
            fontSize: 15,
            fontFamily: "Poppins",
            left: 0,
            marginTop: 10,
            alignSelf: "flex-start",
        },
        money2:
        {
            fontSize: 30,
            fontFamily: "Poppins",
            marginTop: 40,
            marginLeft: -125,
            marginRight: 50,
        },
        percent:
        {
            fontFamily: "Poppins"
        },
        progessbar:
        {
            height: "10%",
            marginTop: 85,
            width: "100%",
            marginLeft: -250,
            left: -100,
            top: 15,
            marginBottom: 10,
        }, 
        calendar1: {
            // width: "100%",
            display: "flex",
            width:"105%",
            alignItems:"center",
            justifyContent:"center",
            flexDirection: "row",
            marginBottom: 10,
            borderBottomLeftRadius:15,
            borderBottomRightRadius:15,
            // marginLeft: 10,
            borderWidth: 2,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomColor: LIGHT_GRAY,
            borderTopColor:WHITE,
        },
        calendar2:
        {
            marginBottom:20,
        }
        ,
        line: {
            marginTop: 0,
            fontSize: 28,
            color: PINK,
        },
    });