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
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { resetEmplacement } from "../../store/slices/addEmplacementSlice";
import useEmplacementViewModel from "../../viewModels/emplacement_viewModel";
import AddEmplacementLocation from "../../components/add_emplacement/add_emplacement_localisation";

export default function AddEmplacement({ navigation }) {
  const dispatch = useDispatch();
  const { addEmplacement } = useEmplacementViewModel();
  const userId = useSelector(
    (state: RootState) => state.profil.userId // Assurez-vous que le slice `addEmplacement` est bien configuré
  );
  // Récupérer l'emplacement temporaire dans le state Redux
  const emplacement = useSelector(
    (state: RootState) => state.addEmplacement // Assurez-vous que le slice `addEmplacement` est bien configuré
  );

  const handleAddEmplacement = () => {
    // Validation des champs obligatoires
    if (
      !emplacement.coordonnees ||
      !emplacement.caracteristique ||
      !emplacement.tarif ||
      emplacement.photos.length === 0
    ) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    // Préparer les données pour correspondre au modèle Emplacement
    const newEmplacement = {
      idEmplacement: 0, // Généré par le backend
      idUser: userId,
      localisation: emplacement.localisation || "",
      caracteristique: emplacement.caracteristique || "",
      equipements: emplacement.equipements || [],
      services: emplacement.services || [],
      tarif: emplacement.tarif || 0,
      disponible: emplacement.disponible ?? true,
      moyenneAvis: 0, // Par défaut à 0 pour un nouvel emplacement
      photos: emplacement.photos || [],
      avis: [], // Aucun avis au moment de l'ajout
      coordonnees: emplacement.coordonnees || {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };


    // Ajouter l'emplacement via le ViewModel
    addEmplacement(newEmplacement);

    // Afficher une notification de succès
    Toast.show({
      type: "success",
      text1: "Succès",
      text2: "Emplacement ajouté avec succès !",
    });

    // Réinitialiser l'état après ajout
    dispatch(resetEmplacement());

    // Rediriger vers la page Profil
    navigation.navigate("Profile");
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
        <AddEmplacementLocation />r
        <AddEmplacementDescription />
        <AddEmplacementAddPhoto />
        <AddEmplacementPrice />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddEmplacement}
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
    backgroundColor: "#F0F4F8",
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
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#4CAF50",
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
