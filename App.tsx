import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookListScreen from "./screens/BookListScreen"; // Your book list component
import ISBNReader from "./screens/ISBNReader";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import useAuth from "./hooks/useAuth";

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { user } = useAuth();

  console.log("user is:", user);

  if (user) {
    console.log("here1");
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen name="BookList" component={BookListScreen} />
          <Stack.Screen name="ISBNReader" component={ISBNReader} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    console.log("here2");
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ISBNReader" component={ISBNReader} />
          <Stack.Screen name="BookList" component={BookListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
