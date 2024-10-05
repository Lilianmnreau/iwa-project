import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddEmplacementMap from "../../components/add_emplacement/add_emplacement_map";
import AddEmplacementFacilities from "../../components/add_emplacement/add_emplacement_facilities";
import AddEmplacementDescription from "../../components/add_emplacement/add_emplacement_description";
import AddEmplacementPrice from "../../components/add_emplacement/add_emplacement_price";
import AddEmplacementAddPhoto from "../../components/add_emplacement/add_emplacement_add_photo";
import { couleur } from "../../color";

export default function AddEmplacement({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#37474F" />
          </TouchableOpacity>
          <Text style={styles.title}>Ajouter un emplacement</Text>
        </View>
        <View style={styles.mapContainer}>
          <AddEmplacementMap />
        </View>
        <View style={styles.facilitiesContainer}>
          <AddEmplacementFacilities />
        </View>
        <AddEmplacementDescription />
        <AddEmplacementAddPhoto />
        <AddEmplacementPrice />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            /* Ajouter la logique pour ajouter l'emplacement */
          }}
        >
          <Text style={styles.addButtonText}>Ajouter l'emplacement</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: couleur,
    },
  scrollContainer: {
    padding: 20,
    backgroundColor: "#F0F4F8", // Couleur de fond douce pour une meilleure lisibilité
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37474F",
    marginLeft: 10,
  },
  mapContainer: {
    height: 400, // Hauteur fixe pour le conteneur de la carte
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF", // Couleur de fond pour le conteneur de la carte
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  facilitiesContainer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50", // Couleur verte pour le bouton
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});