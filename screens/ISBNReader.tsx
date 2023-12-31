import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Camera } from "expo-camera";
import { useCamera } from "react-native-camera-hooks"; // Import useCamera from react-native-camera-hooks
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface BookData {
  title: string;
  authors?: string[];
  // Add more properties as needed
}

const ISBNReader: React.FC = () => {
  const navigation = useNavigation();
  const [isbnData, setIsbnData] = useState<BookData | null>(null);
  const [bookAdded, setBookAdded] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const [{ cameraRef, type }, { toggleFacing }] = useCamera(); // Use useCamera hook

  useFocusEffect(() => {
    checkCameraPermission();
    // Reinitialize the camera when the screen comes into focus
    if (cameraRef && type) {
      cameraRef.current.resumePreview();
    }
    setBookAdded(false);
  });

  const checkCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Use requestCameraPermissionsAsync
      setCameraPermission(status === "granted");
    } catch (error) {
      console.error("Error checking camera permission:", error);
    }
  };

  const onBarCodeRead = async (e: { data: string }) => {
    const isbn = e.data;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );

      const responseData: BookData = {
        title: response.data?.items[0]?.volumeInfo?.title || "Title Not Found",
        authors: response.data?.items[0]?.volumeInfo?.authors || [],
        // Add more properties as needed
      };

      setIsbnData(responseData);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const renderIsbnData = () => {
    if (isbnData && !bookAdded) {
      return (
        <View style={styles.isbnDataContainer}>
          <Text>Title: {isbnData.title}</Text>
          <Text>Author: {isbnData.authors?.join(", ") || "Unknown"}</Text>
          {/* Add more details as needed */}
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={handleAddBook} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  const handleAddBook = async () => {
    // Add an API call to create the book
    await axios
      .post(`URI`, {
        id: 700,
        name: isbnData.title,
        author: isbnData.authors[0],
        authorId: 2,
      })
      .then((res) => {
        setBookAdded(true);
        navigation.navigate("BookList");
      })
      .catch((error) => {
        console.log("Error happened!");
      });
  };

  return (
    <View style={styles.container}>
      {cameraPermission === false ? (
        <Text>Camera permission denied</Text>
      ) : (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          type={type}
          onBarCodeScanned={onBarCodeRead}
        />
      )}
      <TouchableOpacity
        onPress={() => toggleFacing()}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>Toggle Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("BookList")}
        style={styles.navigateToBookListButton}
      >
        <Text style={styles.navigateToBookListButtonText}>Book List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsbnData(null)}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>Reset ISBN Data</Text>
      </TouchableOpacity>
      {renderIsbnData()}
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  camera: ViewStyle;
  toggleButton: ViewStyle;
  toggleButtonText: ViewStyle;
  resetButton: ViewStyle;
  resetButtonText: ViewStyle;
  isbnDataContainer: ViewStyle;
  addButtonContainer: ViewStyle;
  addButton: ViewStyle;
  addButtonLabel: ViewStyle;
  navigateToBookListButton: ViewStyle;
  navigateToBookListButtonText: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  toggleButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 16,
  },
  resetButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 16,
  },
  isbnDataContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  addButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonLabel: {
    fontSize: 16,
    color: "white",
  },
  navigateToBookListButton: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  navigateToBookListButtonText: {
    fontSize: 16,
  },
});

export default ISBNReader;
