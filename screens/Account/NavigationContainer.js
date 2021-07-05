import Login from "./Login";
import Splash from "./Splash";
import Home from "../Home";
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
   },
   {
      initialRouteName: "Splash",
   }
);
export default createAppContainer(AppNavigator);
