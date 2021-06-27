import Login from "./Login";
import Splash from "./Splash";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
const AppNavigator = createStackNavigator(
   {
      Splash: {
         screen: Splash,
         navigationOptions: {
            header: null, //this will hide the header
         },
      },
      Login: {
         screen: Login,
         navigationOptions: {
            header: null, //this will hide the header
         },
      },
   },
   {
      initialRouteName: "Splash",
   }
);
export default createAppContainer(AppNavigator);
