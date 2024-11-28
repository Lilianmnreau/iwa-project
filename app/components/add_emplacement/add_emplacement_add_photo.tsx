import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setPhotos } from "../../store/slices/addEmplacementSlice"; // Utilisez le nouveau slice
import { RootState } from "../../store"; // Assurez-vous que le chemin est correct

export default function AddEmplacementAddPhoto() {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.addEmplacement.photos); // Récupérez les photos du slice

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Autoriser plusieurs images
      quality: 1,
    });

    if (!result.canceled) {
      // Ajouter de nouvelles images sans dépasser la limite de 10
      const newImages = result.assets
        .slice(0, 10 - images.length)
        .map((asset) => asset.uri);
      dispatch(setPhotos([...images, ...newImages]));
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    dispatch(setPhotos(updatedImages));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter vos photos</Text>
      <Text style={styles.description}>
        Ajoutez de 1 à 10 photos de votre emplacement !
      </Text>
      <Button mode="contained" onPress={pickImage} style={styles.button}>
        Ajouter des photos
      </Button>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00796B",
    marginBottom: 20,
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 15,
    padding: 5,
  },
});
