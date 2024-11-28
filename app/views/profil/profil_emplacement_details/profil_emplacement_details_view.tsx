import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EmplacementReservationCell from "../../../components/reservation/emplacement_reservation_cell";

import { RootState } from "../../../store";
import { couleur } from "../../../color";

export default function ProfilEmplacementDetails({ route }) {
  const { emplacement } = route.params;
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [localisation, setLocalisation] = useState(emplacement.localisation);
  const [caracteristique, setCaracteristique] = useState(
    emplacement.caracteristique
  );
  const [equipement, setEquipement] = useState(
    emplacement.equipements.join(", ")
  );
  const [tarif, setTarif] = useState(emplacement.tarif);
  const [disponible, setDisponible] = useState(emplacement.disponible);
  const [moyenneAvis, setMoyenneAvis] = useState(emplacement.moyenneAvis);
  const [photos, setPhotos] = useState(emplacement.photos.join(", "));

  // Récupérer les avis associés à cet emplacement depuis Redux
  let avisList
  try {
      avisList = useSelector((state: RootState) =>
      emplacement.avis.filter(
        (avis) => avis.idEmplacement === emplacement.idEmplacement
      )
    );
    } catch {
      return (
        <View>
          <Text> Pas encore d'avis sur cet emplacement</Text>
        </View>
      )
    }
  

  const reservations = [
    {
      id: 1,
      date: "12/08/2024 - 15/08/2024",
      statut: "Confirmée",
      message_voyageur: "Merci pour ce bel emplacement !",
    },
    {
      id: 2,
      date: "20/09/2024 - 22/09/2024",
      statut: "En attente",
      message_voyageur: "Est-ce possible d'arriver plus tôt ?",
    },
    {
      id: 3,
      date: "05/10/2024 - 10/10/2024",
      statut: "Annulée",
      message_voyageur: "Je dois annuler pour des raisons personnelles.",
    },
  ];

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cet emplacement ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            /* Logique de suppression */
          },
        },
      ]
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    // Sauvegarder les modifications
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Ionicons key={i} name="star" size={20} color="gold" />);
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={20} color="gray" />
        );
      }
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEditing ? "Modifier Emplacement" : "Détails de l'Emplacement"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={localisation}
              onChangeText={setLocalisation}
              placeholder="Localisation"
            />
            <TextInput
              style={styles.input}
              value={caracteristique}
              onChangeText={setCaracteristique}
              placeholder="Caractéristiques"
            />
            <TextInput
              style={styles.input}
              value={equipement}
              onChangeText={setEquipement}
              placeholder="Équipement"
            />
            <TextInput
              style={styles.input}
              value={tarif.toString()}
              onChangeText={(text) => setTarif(parseFloat(text))}
              placeholder="Tarif"
              keyboardType="numeric"
            />
            <View style={styles.availabilityContainer}>
              <Text style={styles.label}>Disponible:</Text>
              <TouchableOpacity onPress={() => setDisponible((prev) => !prev)}>
                <Text style={styles.availabilityText}>
                  {disponible ? "Oui" : "Non"}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={photos}
              onChangeText={setPhotos}
              placeholder="Photos (URLs séparés par des virgules)"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              testID="save-button"
            >
              <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              testID="delete-button"
            >
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>
              Localisation: <Text style={styles.infoValue}>{localisation}</Text>
            </Text>
            <Text style={styles.infoText}>
              Caractéristiques:{" "}
              <Text style={styles.infoValue}>{caracteristique}</Text>
            </Text>
            <Text style={styles.infoText}>
              Équipement: <Text style={styles.infoValue}>{equipement}</Text>
            </Text>
            <Text style={styles.infoText}>
              Tarif: <Text style={styles.infoValue}>{tarif} €</Text>
            </Text>
            <Text style={styles.infoText}>
              Disponible:{" "}
              <Text style={styles.infoValue}>{disponible ? "Oui" : "Non"}</Text>
            </Text>
            <Text style={styles.infoText}>
              Moyenne d'Avis:{" "}
              <Text style={styles.infoValue}>{moyenneAvis}</Text>
            </Text>
            <Text style={styles.infoText}>
              Photos: <Text style={styles.infoValue}>{photos}</Text>
            </Text>
          </>
        )}
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>Avis</Text>
        <View style={styles.reviewsGrid}>
          {avisList === undefined ? (
            avisList.map((avis) => (
              <View key={avis.idAvis} style={styles.reviewCard}>
                {renderStars(avis.note)}
                <Text style={styles.reviewComment}>{avis.commentaire}</Text>
                <Text style={styles.reviewDate}>{avis.date}</Text>
              </View>
            ))
          ) : (
            <>
              <View>
                <Text> Pas encore d'avis sur cet emplacement</Text>
              </View>
            </>
          )}
        </View>
      </View>

      <View style={styles.reservationsContainer}>
        <Text style={styles.sectionTitle}>Réservations</Text>
        {reservations.map((reservation) => (
          <EmplacementReservationCell
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#37474F",
    marginBottom: 10,
  },
  reviewsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  reviewCard: {
    width: "48%", // Deux avis côte à côte
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#757575",
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginVertical: 5,
  }
});
