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
import Toast from 'react-native-toast-message'; // Importer Toast
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // Assurez-vous que le chemin est correct
import { resetEmplacement } from '../../store/addEmplacementSlice'; // Importer resetEmplacement
import useEmplacementViewModel from '../../viewModels/emplacement_viewModel'; // Importer le hook

export default function AddEmplacement({ navigation }) {
  const dispatch = useDispatch();
  const { addEmplacement } = useEmplacementViewModel();
  const emplacement = useSelector((state: RootState) => state.emplacement.emplacements[0]);

  const handleAddEmplacement = () => {
    // Vérifier si certains attributs sont nuls
    if (!emplacement.coordonnees || !emplacement.caracteristique || !emplacement.tarif || emplacement.photos.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }

    addEmplacement({
      ...emplacement,
      id_user: '1', // A changer
      id_emplacement: emplacement.id_emplacement || '',
      localisation: emplacement.localisation || '',
      caracteristique: emplacement.caracteristique || '',
      equipement: Array.isArray(emplacement.equipement) ? emplacement.equipement : [],
      tarif: typeof emplacement.tarif === 'number' ? emplacement.tarif : 0,
      disponible: emplacement.disponible || false,
      moyenneAvis: emplacement.moyenneAvis || 0,
      photos: emplacement.photos || [],
      coordonnees: emplacement.coordonnees || { latitude: 0, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    });

    // Logique pour ajouter l'emplacement
    Toast.show({
      type: 'success',
      text1: 'Emplacement ajouté avec succès !',
    });

    // Réinitialiser l'emplacement dans le store
    dispatch(resetEmplacement());

    navigation.navigate("Profile"); // Rediriger vers le profil après l'ajout
  };

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
          onPress={handleAddEmplacement} // Appeler handleAddEmplacement
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