import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Assurez-vous d'importer les icônes

export default function ContactDetail({ route, navigation }: any) {
  const { name, firstName, email, phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Details</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{firstName}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email || "N/A"}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{phoneNumber || "N/A"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9", // Arrière-plan doux
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15, // Espacement à droite du bouton
  },
  headerTitle: {
    fontSize: 26, // Augmenter la taille pour plus de visibilité
    fontWeight: "700", // Utiliser un poids de police plus lourd
    color: "#333", // Couleur sombre pour le texte
  },
  detailItem: {
    marginBottom: 15,
    padding: 15, // Ajouter un padding pour l'espacement
    borderRadius: 10, // Coins arrondis pour les éléments de détail
    backgroundColor: "#fff", // Fond blanc pour chaque élément
    elevation: 1, // Ombre légère pour donner de la profondeur
  },
  label: {
    fontSize: 16,
    color: "#888", // Couleur grise pour le label
    fontWeight: "600", // Utiliser un poids de police légèrement plus lourd
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333", // Couleur sombre pour la valeur
  },
});
