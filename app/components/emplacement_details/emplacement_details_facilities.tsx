import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Emplacement } from '../../models/emplacement_model';

interface EmplacementDetailsDescriptionProps {
  emplacement: Emplacement;
}

export default function EmplacementDetailsFacilities({
  emplacement,
}: EmplacementDetailsDescriptionProps) {
    const equipements = emplacement.equipements
  const iconMap = {
    "Wi-Fi": "wifi",
    Piscine: "water",
    Parking: "car",
    "Animaux acceptés": "paw",
    Terrasse: "home",
    Barbecue: "bonfire",
    Électricité: "flash",
    "Eau potable": "water",
    Poubelles: "trash",
    Toit: "home",
    "Feu de camp": "bonfire",
  };
  // Vérifiez si `equipements` est bien un tableau avant d'utiliser `.slice`
  if (!Array.isArray(equipements)) {
    console.error("Les équipements doivent être un tableau.");
    return null; // Ou retournez une vue vide ou un message d'erreur
  }

  // Diviser la liste des équipements en deux colonnes
  const column1 = equipements.slice(0, Math.ceil(equipements.length / 2));
  const column2 = equipements.slice(Math.ceil(equipements.length / 2));

  return (
    <View style={styles.container}>
      {/* Première colonne d'équipements */}
      <View style={styles.column}>
        {column1.map((equip, index) => (
          <View style={styles.item} key={index}>
            <Ionicons
              name={iconMap[equip] || "help-circle"}
              size={20}
              color="#4B8B3B"
            />
            <Text style={styles.itemText}>{equip}</Text>
          </View>
        ))}
      </View>

      {/* Deuxième colonne d'équipements */}
      <View style={styles.column}>
        {column2.map((equip, index) => (
          <View style={styles.item} key={index}>
            <Ionicons
              name={iconMap[equip] || "help-circle"}
              size={20}
              color="#4B8B3B"
            />
            <Text style={styles.itemText}>{equip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#F5F5F5', // Arrière-plan naturel
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    column: {
        flex: 1,
        paddingHorizontal: 10, // Espacement pour aérer les colonnes
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    itemText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4B4B4B', // Texte subtil et naturel
        fontWeight: '500',
    },
});
