import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetSreen from "../screens/Budget/BugetScreen";
import DailyScreen from "../screens/Daily Report/DailyScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import StatScreen from "../screens/Monthly Report/StatScreen";
import AddScreen from "../screens/Transaction/AddScreen";
import {
   StyleSheet,
   Text,
   View,
   Button,
   Image,
   TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// import money from "../assets/images/money.png";
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
   <TouchableOpacity
      style={{
         top: -30,
         justifyContent: "center",
         alignItems: "center",
      }}
      onPress={onPress}
   >
      <View
         style={{
            borderRadius: 35,
            width: 70,
            height: 70,
            backgroundColor: "#FF3378",
         }}
      >
         {children}
      </View>
   </TouchableOpacity>
);
const Tabs = () => {
   return (
      <Tab.Navigator
         tabBarOptions={{
            showLabel: false,
            style: {
               position: "absolute",
               bottom: 0,
               left: 0,
               elevation: 0,
               backgroundColor: "#ffffff",
               borderTopRightRadius: 15,
               borderTopLeftRadius: 15,
               height: 85,
            },
         }}
      >
         <Tab.Screen
            name="Daily"
            component={DailyScreen}
            options={{
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        alignItems: "center",
                        justifyContent: "center",
                        top: 5,
                     }}
                  >
                     <Icon
                        name="calendar-o"
                        size={30}
                        style={{ color: focused ? "#e32f45" : "#748c94" }}
                     ></Icon>
                     <Text
                        style={{
                           color: focused ? "#e32f45" : "#748c94",
                           fontSize: 14,
                           top: 5,
                        }}
                     >
                        Daily
                     </Text>
                  </View>
               ),
            }}
         />
         <Tab.Screen
            name="Stat"
            component={StatScreen}
            options={{
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        alignItems: "center",
                        justifyContent: "center",
                        top: 5,
                     }}
                  >
                     <Icon
                        name="bar-chart"
                        size={30}
                        style={{ color: focused ? "#e32f45" : "#748c94" }}
                     ></Icon>
                     <Text
                        style={{
                           color: focused ? "#e32f45" : "#748c94",
                           fontSize: 14,
                           top: 5,
                        }}
                     >
                        Stat
                     </Text>
                  </View>
               ),
            }}
         />
         <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
               tabBarIcon: ({ focused }) => (
                  <Icon name="plus" size={20} color="white" />
               ),
               tabBarButton: (props) => <CustomTabBarButton {...props} />,
            }}
         />
         <Tab.Screen
            name="Budget"
            component={BudgetSreen}
            options={{
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        alignItems: "center",
                        justifyContent: "center",
                        top: 5,
                     }}
                  >
                     <Icon
                        name="google-wallet"
                        size={30}
                        style={{ color: focused ? "#e32f45" : "#748c94" }}
                     ></Icon>
                     <Text
                        style={{
                           color: focused ? "#e32f45" : "#748c94",
                           fontSize: 14,
                           top: 5,
                        }}
                     >
                        Budget
                     </Text>
                  </View>
               ),
            }}
         />
         <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
               tabBarIcon: ({ focused }) => (
                  <View
                     style={{
                        alignItems: "center",
                        justifyContent: "center",
                        top: 5,
                     }}
                  >
                     <Icon
                        name="user-circle"
                        size={30}
                        style={{ color: focused ? "#e32f45" : "#748c94" }}
                     ></Icon>
                     <Text
                        style={{
                           color: focused ? "#e32f45" : "#748c94",
                           fontSize: 14,
                           top: 5,
                        }}
                     >
                        Budget
                     </Text>
                  </View>
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default Tabs;
