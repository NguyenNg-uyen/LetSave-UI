import * as React from "react";
import Login from "./Login";
import Splash from "./Splash";
import Home from "../Home";
import CongratsScreen from "../Transaction/CongratsScreen";
import AddExpense from "../Transaction/AddExpense";
import AddIncome from "../Transaction/AddIncome";
import AddTransaction from "../Transaction/AddTransaction";
import CategoryChoice from "../Transaction/CategoryChoice";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StatScreen from "../Monthly Report/StatScreen";
import ReportDetail from "../Monthly Report/ReportDetail";
import ProfileScreen from "../Profile/ProfileScreen";
import SettingScreen from "../Setting/SettingScreen";
import CategoryList from "../Setting/CategoryList";
import AddCategory from "../Setting/AddCategory";
import ProfileSettingScreen from "../Setting/ProfileSetting";
function NavigationWrapper() {
   const Stack = createStackNavigator();
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="Splash"
               component={Splash}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Login"
               component={Login}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Home"
               component={Home}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="AddTransaction"
               component={AddTransaction}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="AddExpense"
               component={AddExpense}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="CategoryChoice"
               component={CategoryChoice}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="AddIncome"
               component={AddIncome}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="CongratsScreen"
               component={CongratsScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="StatScreen"
               component={StatScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="ReportDetail"
               component={ReportDetail}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="ProfileSettingScreen"
               component={ProfileSettingScreen}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="ProfileScreen"
               component={ProfileScreen}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="SettingScreen"
               component={SettingScreen}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="CategoryList"
               component={CategoryList}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="AddCategory"
               component={AddCategory}
               options={{ headerShown: true }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default NavigationWrapper;
