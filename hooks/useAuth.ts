import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkForValidUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          console.log("setting the user:", user);
          setUser(user);
        } else {
          console.log("setting the useruseruser:", null);
          setUser(null);
        }
      } catch (error) {
        console.log("error occured while getting the storage user");
      }
    };

    checkForValidUser();

    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("got user: ", user);
      if (user) {
        console.log("user setting:", user);
        setUser(user);
        AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("user setting:", null);
        setUser(null);
        AsyncStorage.removeItem("user");
      }
    });
    return unsub;
  }, []);

  return { user };
}
