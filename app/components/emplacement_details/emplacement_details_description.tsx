import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Emplacement } from '../../views/map/map_view';

interface EmplacementDetailsDescriptionProps {
    emplacement: Emplacement;
}

export default function EmplacementDetailsDescription({ emplacement }: EmplacementDetailsDescriptionProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{emplacement.localisation}</Text>
                <Text style={styles.description}>Caractéristiques : {emplacement.caracteristique}</Text>
                <Text style={styles.tarif}>Tarif : {emplacement.tarif} €/nuit</Text>
            </View>
            <TouchableOpacity onPress={toggleFavorite} style={styles.iconContainer}>
                <Ionicons 
                    name={isFavorite ? "heart" : "heart-outline"} 
                    size={32} 
                    color="#FF0000" 
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#F5F5F5', // Arrière-plan doux et naturel
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginTop: 20
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    iconContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF', // Fond blanc pour contraster avec l'icône
        borderRadius: 25,
        elevation: 5, // Léger effet de surélévation
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2F4F4F', // Couleur élégante et naturelle (gris foncé)
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#4B4B4B', // Texte secondaire plus doux
    },
    tarif: {
        fontSize: 16,
        color: '#4B8B3B', // Couleur naturelle, vert forêt pour le tarif
        fontWeight: '500',
        marginTop: 5,
    },
});
