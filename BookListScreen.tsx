import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BookListScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    // Navigate to the other screen
    navigation.navigate("ISBNReader");
  };
  return (
    <View style={styles.container}>
      <Text>Book List Screen</Text>
      {/* Add your book list rendering logic here */}
      <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Text>Navigate to Other Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
});

export default BookListScreen;
