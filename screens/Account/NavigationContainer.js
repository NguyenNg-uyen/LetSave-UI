import Login from "./Login";
import Splash from "./Splash";
import Home from "../Home";
import tabs from "../tabs";
import CongratsScreen from "../Transaction/CongratsScreen";
import AddExpense from "../Transaction/AddExpense";
import AddIncome from "../Transaction/AddIncome";
import AddTransaction from "../Transaction/AddTransaction";
import CategoryList from "../Setting/CategoryList";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    tabs: {
      screen: tabs,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    CongratsScreen: {
      screen: CongratsScreen,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    AddExpense: {
      screen: AddExpense,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    AddIncome: {
      screen: AddIncome,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    AddTransaction: {
      screen: AddTransaction,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
    CategoryList: {
      screen: CategoryList,
      navigationOptions: {
        headerShown: false, //this will hide the header
      },
    },
  },
  {
    initialRouteName: "Splash",
  }
);
export default createAppContainer(AppNavigator);
