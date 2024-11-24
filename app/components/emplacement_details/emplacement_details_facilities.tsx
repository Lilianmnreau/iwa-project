import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmplacementDetailsFacilities({ equipment }) {
    const iconMap = {
        "Wi-Fi": "wifi",
        "Piscine": "water",
        "Parking": "car",
        "Animaux acceptés": "paw",
        "Terrasse": "home",
        "Barbecue": "bonfire",
        "Électricité": "flash",
        "Eau potable": "water",
        "Poubelles": "trash",
        "Toit": "home",
        "Feu de camp": "bonfire",
    };

    // Diviser la liste des équipements en deux colonnes
    const column1 = equipment.slice(0, Math.ceil(equipment.length / 2));
    const column2 = equipment.slice(Math.ceil(equipment.length / 2));

    return (
        <View style={styles.container}>
            {/* Première colonne d'équipements */}
            <View style={styles.column}>
                {column1.map((equip, index) => (
                    <View style={styles.item} key={index}>
                        <Ionicons name={iconMap[equip] || 'help-circle'} size={20} color="#4B8B3B" />
                        <Text style={styles.itemText}>{equip}</Text>
                    </View>
                ))}
            </View>

            {/* Deuxième colonne d'équipements */}
            <View style={styles.column}>
                {column2.map((equip, index) => (
                    <View style={styles.item} key={index}>
                        <Ionicons name={iconMap[equip] || 'help-circle'} size={20} color="#4B8B3B" />
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
