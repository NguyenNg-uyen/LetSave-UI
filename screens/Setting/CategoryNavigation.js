import * as React from "react";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

function CategoryNavigation() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="CategoryList"
               component={CategoryList}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="AddCategory"
               component={AddCategory}
               options={{ title: "Add Category" }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default CategoryNavigation;
