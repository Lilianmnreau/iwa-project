import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EmplacementReservationCell from '../../../components/reservation/emplacement_reservation_cell';

import { couleur } from "../../../color";


export default function ProfilEmplacementDetails({ route }) {
  const { emplacement } = route.params;
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [localisation, setLocalisation] = useState(emplacement.localisation);
  const [caracteristique, setCaracteristique] = useState(
    emplacement.caracteristique
  );
  const [equipement, setEquipement] = useState(emplacement.equipement.join(", ")); // Affichage des équipements sous forme de chaîne
  const [tarif, setTarif] = useState(emplacement.tarif);
  const [disponible, setDisponible] = useState(emplacement.disponible);
  const [moyenneAvis, setMoyenneAvis] = useState(emplacement.moyenneAvis);
  const [photos, setPhotos] = useState(emplacement.photos.join(", ")); // Affichage des photos sous forme de chaîne

  // Liste d'avis simulée
  const avisList = [
    {
      id_avis: 1,
      note: 4,
      commentaire: "Super emplacement, calme et bien équipé.",
      date_avis: "15/08/2024",
    },
    {
      id_avis: 2,
      note: 5,
      commentaire: "Parfait pour un week-end en famille.",
      date_avis: "18/09/2024",
    },
    {
      id_avis: 3,
      note: 3,
      commentaire: "Emplacement correct, mais manque d'ombre.",
      date_avis: "25/09/2024",
    },
  ];

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
    return <View style={styles.starsContainer}>{stars}</View>; // Alignement horizontal des étoiles
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => setIsEditing(!isEditing)}
              >
                <MaterialCommunityIcons
                  name="pencil-off"
                  size={24}
                  color="#00796B"
                />
              </TouchableOpacity>
            </View>
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
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Sauvegarder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color="#00796B"
                onPress={() => setIsEditing(true)}
              />
            </View>

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
              Moyenne d'Avis: <Text style={styles.infoValue}>{moyenneAvis}</Text>
            </Text>
            <Text style={styles.infoText}>
              Photos: <Text style={styles.infoValue}>{photos}</Text>
            </Text>
          </>
        )}
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>Avis</Text>
        {avisList.map((avis) => (
          <View key={avis.id_avis} style={styles.reviewCard}>
            {renderStars(avis.note)}
            <Text style={styles.reviewText}>{avis.commentaire}</Text>
            <Text style={styles.reviewDate}>{avis.date_avis}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reservationsContainer}>
        <Text style={styles.sectionTitle}>Réservations</Text>
        {reservations.map((reservation) => (
          <EmplacementReservationCell reservation={reservation} key={reservation.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: couleur, // Arrière-plan doux
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37474F",
    marginLeft: 10,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  availabilityText: {
    fontSize: 16,
    color: "#00796B",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  infoText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
  infoValue: {
    fontWeight: "500",
  },
  reviewsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#37474F",
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewText: {
    marginVertical: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#757575",
  },
  reservationsContainer: {
    marginTop: 20,
  },
  reservationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reservationDate: {
    fontWeight: "500",
  },
  reservationStatus: {
    fontSize: 14,
  },
  statusText: {
    fontWeight: "600",
    color: "#00796B",
  },
  reservationMessage: {
    marginVertical: 5,
    fontSize: 12,
    color: "#757575",
  },
  starsContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
});
