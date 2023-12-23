// SignInScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { auth } from "./config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface SignInProps {
  navigation: any; // Use proper navigation type based on your navigation library
}

const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("BookList");
    } catch (error) {
      console.error("Error signing in:", error.message);
      Alert.alert(
        "Error",
        "Sign-in failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignInScreen;
