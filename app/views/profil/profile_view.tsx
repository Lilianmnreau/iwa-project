import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { couleur } from "../../color";
import { renderRating } from "../../utils/renderRating";

import { User } from "../../models/user.model";
import { useUserViewModel } from "../../viewModels/user_viewModel";
import { Emplacement } from "../../models/emplacement_model";
import { Reservation } from "../../models/reservation.model";
import useEmplacementViewModel from "../../viewModels/emplacement_viewModel";
import { TextInput } from "react-native-gesture-handler";

export default function ProfilView() {
  const navigation = useNavigation();
  const profilViewModel = useUserViewModel();

  const [isEditing, setIsEditing] = useState(false);

  // Récupération du premier utilisateur (simulateur d'utilisateur connecté)
  const userInfo = profilViewModel.users[0] || null; // Utiliser le premier user
  const [emplacements, setEmplacements] = useState<Emplacement[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (userInfo) {
      setEmplacements(userInfo.emplacements || []);
      setReservations(userInfo.reservations || []);
    }
  }, [userInfo]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission requise",
        "Vous devez autoriser l'accès à la galerie."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Mise à jour via le ViewModel pour le premier user
      profilViewModel.updateUser(userInfo.id_user, {
        photo: result.assets[0].uri,
      });
    }
  };

  const handleChange = (field: keyof User, value: string) => {
    profilViewModel.updateUser(userInfo.id_user, { [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const renderProfileImage = () => {
    if (userInfo?.photo) {
      return (
        <Image source={{ uri: userInfo.photo }} style={styles.profileImage} />
      );
    } else {
      const initials = `${userInfo?.prenom?.charAt(0)}${userInfo?.nom?.charAt(
        0
      )}`.toUpperCase();
      return (
        <View style={styles.defaultImageContainer}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      );
    }
  };

  const navigateToSettings = () => {
    navigation.navigate("SettingsStack" as never); // Navigation vers la page des réglages
  };

  const navigateToEmplacementDetails = (emplacement: Emplacement) => {
    navigation.navigate("Emplacement_detail", { emplacement });
  };

  const navigateToReservationDetails = (reservation: Reservation) => {
    navigation.navigate("Reservation_detail", { reservation });
  };

  const handleAddEmplacement = () => {
    navigation.navigate("Add_emplacement" as never);
  }



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={navigateToSettings}
            style={styles.settingsButton}
          >
            <Ionicons name="settings" size={24} color="#37474F" />
            {/* Couleur du bouton réglages */}
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageContainer}>
          {renderProfileImage()}
          {renderRating(4.5, false)}
          {isEditing && (
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Choisir une photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Profil</Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <MaterialCommunityIcons
                  name="pencil-off"
                  size={24}
                  color="#00796B"
                />
              ) : (
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color="#00796B"
                />
              )}
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={userInfo?.prenom || ""}
                onChangeText={(value) => handleChange("prenom", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={userInfo?.nom || ""}
                onChangeText={(value) => handleChange("nom", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userInfo?.email || ""}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                value={userInfo?.telephone || ""}
                onChangeText={(value) => handleChange("telephone", value)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={userInfo?.mot_de_passe || ""}
                onChangeText={(value) => handleChange("mot_de_passe", value)}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>
                Prénom:{" "}
                <Text style={styles.infoValue}>
                  {userInfo?.prenom || "Non défini"}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Nom:{" "}
                <Text style={styles.infoValue}>
                  {userInfo?.nom || "Non défini"}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Email:{" "}
                <Text style={styles.infoValue}>
                  {userInfo?.email || "Non défini"}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Téléphone:{" "}
                <Text style={styles.infoValue}>
                  {userInfo?.telephone || "Non défini"}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                Rôle:{" "}
                <Text style={styles.infoValue}>
                  {userInfo?.role || "Non défini"}
                </Text>
              </Text>
            </>
          )}
        </View>

        <View style={styles.emplacementContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Emplacements</Text>
            <Ionicons
              name="home"
              size={20}
              color="#37474F"
              style={styles.iconRight}
            />
          </View>
          {emplacements.map((emplacement) => (
            <TouchableOpacity
              key={emplacement.id_emplacement}
              onPress={() => navigateToEmplacementDetails(emplacement)}
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {emplacement.localisation}{" "}
                  {renderRating(emplacement.moyenneAvis, false)}
                </Text>
                <Text style={styles.cardText}>
                  Caractéristiques: {emplacement.caracteristique}
                </Text>
                <Text style={styles.cardText}>
                  Équipement: {emplacement.equipement}
                </Text>
                <Text style={styles.cardText}>
                  Tarif: {emplacement.tarif} €
                </Text>
                <Text style={styles.cardText}>
                  Disponible: {emplacement.disponible ? "Oui" : "Non"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddEmplacement}
          >
            <Ionicons name="add-circle" size={40} color="#00796B" />
          </TouchableOpacity>
        </View>

        <View style={styles.reservationContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Réservations</Text>
            <Ionicons
              name="calendar"
              size={20}
              color="#37474F"
              style={styles.iconRight}
            />
          </View>
          {reservations.map((reservation) => (
            <TouchableOpacity
              key={reservation.id_reservation}
              onPress={() => navigateToReservationDetails(reservation)}
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Réservation {reservation.id_reservation}
                </Text>
                <Text style={styles.cardText}>
                  Dates: {reservation.date_debut} - {reservation.date_fin}
                </Text>
                <Text style={styles.cardText}>
                  Statut: {reservation.statut}
                </Text>
                <Text style={styles.cardText}>
                  Message: {reservation.message_voyageur}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleur, // Vert doux pour l'arrière-plan
  },
  scrollContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Pour que le bouton réglages soit à droite
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  settingsButton: {
    padding: 10,
    borderRadius: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
  },
  defaultImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#00796B",
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row", // Ajoute cette ligne pour que les éléments soient en ligne
    justifyContent: "space-between", // Cela maintiendra le texte et le bouton d'édition aux extrémités
    alignItems: "center", // Pour centrer verticalement
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#37474F", // Gris foncé
    justifyContent: "space-between",
  },
  input: {
    height: 44,
    borderColor: "#B0BEC5", // Gris doux
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#37474F", // Vert montagne élégant
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  infoText: {
    fontSize: 16,
    color: "#546E7A", // Gris bleuté pour le texte d'information
    marginVertical: 4,
  },
  infoValue: {
    fontWeight: "bold",
    color: "#37474F", // Gris foncé pour la valeur d'information
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F", // Gris foncé pour le titre de la carte
  },
  cardText: {
    fontSize: 14,
    color: "#546E7A", // Gris bleuté pour le texte de la carte
  },
  addButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#37474F",
  },
  iconRight: {
    marginLeft: 10,
  },
  editProfileButton: {
    padding: 10,
  },
});
