import * as React from "react";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import test from "../Transaction/test";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const getFonts = () => {
   return Font.loadAsync({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../../assets/fonts/Poppins-Medium.ttf"),
   });
};
function CategoryNavigation() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="AddCategory"
            component={AddCategory}
            options={{
               title: "Add new category",
               headerTitleStyle: {
                  // fontFamily: "PoppinsBold",
                  fontSize: 20,
               },
               headerStyle: {
                  height: 80,
                  borderBottomEndRadius: 20,
                  borderBottomStartRadius: 20,
                  borderBottomWidth: 2,
               },
            }}
         />
      </Stack.Navigator>
   );
}

export default CategoryNavigation;
