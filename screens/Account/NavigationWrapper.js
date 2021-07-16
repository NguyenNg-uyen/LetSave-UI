import * as React from "react";
import Login from "./Login";
import Splash from "./Splash";
import tabs from "../tabs";
import CongratsScreen from "../Transaction/CongratsScreen";
import AddExpense from "../Transaction/AddExpense";
import AddIncome from "../Transaction/AddIncome";
import AddTransaction from "../Transaction/AddTransaction";
import CategoryList from "../Transaction/CategoryList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
               name="Tabs"
               component={tabs}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="AddTransaction"
               component={AddTransaction}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="CategoryList"
               component={CategoryList}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="AddExpense"
               component={AddExpense}
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
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default NavigationWrapper;
