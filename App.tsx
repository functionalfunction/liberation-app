import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookListScreen from "./BookListScreen"; // Your book list component
import ISBNReader from "./ISBNReader";

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ISBNReader">
        <Stack.Screen name="ISBNReader" component={ISBNReader} />
        <Stack.Screen name="BookList" component={BookListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
