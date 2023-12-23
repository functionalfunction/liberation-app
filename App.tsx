// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookListScreen from "./BookListScreen"; // Your book list component
import ISBNReader from "./ISBNReader";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import useAuth from "./hooks/useAuth";

const Stack = createStackNavigator();

const App: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen name="ISBNReader" component={ISBNReader} />
          <Stack.Screen name="BookList" component={BookListScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
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
