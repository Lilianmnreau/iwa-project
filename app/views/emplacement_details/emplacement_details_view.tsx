import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmplacementDetailsFacilities from "../../components/emplacement_details/emplacement_details_facilities";
import EmplacementDetailsImages from "../../components/emplacement_details/emplacement_details_images";
import EmplacementDetailsRatings from "../../components/emplacement_details/emplacement_details_ratings";
import EmplacementDetailsDescription from "../../components/emplacement_details/emplacement_details_description";


import { couleur } from "../../color";
import { Reservation } from "../profil/profile_view";
import EmplacementReservation from "../map/emplacement_reservation_view";

export type Avis = {
  id_avis: string;
  id_emplacement: string;
  id_user: string;
  prenom_utilisateur: string; // Ajout du prénom de l'utilisateur
  note: number;
  commentaire: string;
  date_avis: string;
};

export default function EmplacementDetails({ route }) {
  const { marker } = route.params; // Passer l'emplacement au lieu du marqueur

  const avis: Avis[] = [
    {
      id_avis: '1',
      id_emplacement: '1',
      id_user: '101',
      prenom_utilisateur: 'Alice', // Prénom ajouté
      note: 5,
      commentaire: 'Superbe emplacement, très proche du centre-ville avec un accès facile à toutes les commodités.',
      date_avis: '2024-09-25',
    },
    {
      id_avis: '2',
      id_emplacement: '1',
      id_user: '102',
      prenom_utilisateur: 'Bob',
      note: 4,
      commentaire: 'Très bien situé, mais un peu bruyant la nuit.',
      date_avis: '2024-09-20',
    },
  ];

  const reservations : Reservation[] = [
    {
      id_reservation: '1',
      id_user: 'sdfsdf',
      date_debut: '2024-10-10',
      date_fin: '2024-10-15',
      statut: 'confirmée',
      message_voyageur: "jfhd",
      emplacement: marker,
    },
    {
      id_reservation: '2',
      id_user: 'sdfsdf',
      date_debut: '2024-10-20',
      date_fin: '2024-10-25',
      statut: 'confirmée',
      message_voyageur: "jfhd",
      emplacement: marker,
    },
  ]; // Exemple de réservations existantes

  if (!marker) {
    console.log("Emplacement non trouvé");
    return <Text>Erreur : Emplacement non trouvé</Text>; // Pour voir s'il est vraiment passé
  }

  function Separateur() {
    return <View style={styles.separateur} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Section des images */}
      <EmplacementDetailsImages photos={marker.photos} />

      {/* Description de l'emplacement */}
      <EmplacementDetailsDescription emplacement={marker} />


      {/* Équipements */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.sectionTitle}>Équipements</Text>
        <EmplacementDetailsFacilities equipment={marker.equipement} />
      </View>

      {/* Évaluations */}
      <View style={styles.ratingsContainer}>
      <Text style={styles.sectionTitle2}>Évaluations</Text>
        <EmplacementDetailsRatings avis={avis} rating={marker.moyenneAvis} />
      </View>

      {/* Calendrier de réservation */}
      <View style={styles.reservationContainer}>
        {/* Intégration du composant de calendrier ici */}
        <EmplacementReservation reservations={reservations} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 10, // Ajout d'un peu de padding horizontal
    backgroundColor: couleur
  },
  separateur: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%", // Ajusté à la taille du conteneur parent
    marginVertical: 10,
  },
  facilitiesContainer: {
    width: "95%",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },
  ratingsContainer: {
    width: "95%",
    marginRight: 40,
  },
  reservationContainer: {
    width: "95%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "95%",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text_button: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
