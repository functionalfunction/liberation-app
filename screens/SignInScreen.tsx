// SignInScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ViewStyle,
  Text,
} from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(JSON.stringify(userCredentials));
      await AsyncStorage.setItem("keepLoggedIn", "true");
      const idToken = await userCredentials.user.getIdToken();
      await AsyncStorage.setItem("idToken", idToken);
      navigation.navigate("BookList");
    } catch (error) {
      console.error("Error signing in:", error.message);
      Alert.alert(
        "Error",
        "Sign-in failed. Please check your credentials and try again."
      );
    }
  };

  const handleNavigation = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <TouchableOpacity onPress={handleNavigation}>
        <Text style={styles.navigationText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  input: ViewStyle;
  navigationText: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  navigationText: {
    color: "blue",
  },
});

export default SignInScreen;
