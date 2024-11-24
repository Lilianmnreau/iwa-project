import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCaracteristique } from '../../store/addEmplacementSlice'; // Assurez-vous que le chemin est correct
import { selectCaracteristique } from '../../store/selectors'; // Importer le sélecteur mémorisé

export default function AddEmplacementDescription() {
    const dispatch = useDispatch();
    const description = useSelector(selectCaracteristique);
    const maxLength = 400;

    const handleDescriptionChange = (text: string) => {
        dispatch(setCaracteristique(text));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.instructions}>Décrivez brièvement votre emplacement</Text>
            <TextInput
                style={styles.input}
                multiline
                maxLength={maxLength}
                placeholder="Entrez la description ici..."
                placeholderTextColor="#B0BEC5" // Couleur du texte de l'espace réservé
                value={description || ''}
                onChangeText={handleDescriptionChange}
            />
            <Text style={styles.charCount}>{(description || '').length}/{maxLength} caractères</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF', // Couleur de fond blanche
        borderRadius: 8, // Bordures arrondies
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, // Ombre sur Android
        marginBottom: 20, // Espacement en bas
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B', // Couleur du texte
        marginBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: '#757575', // Couleur gris pour les instructions
        marginBottom: 10,
    },
    input: {
        height: 100,
        borderColor: '#B0BEC5', // Couleur de bordure
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        backgroundColor: '#F9F9F9', // Couleur de fond du champ de texte
    },
    charCount: {
        marginTop: 5,
        fontSize: 12,
        color: '#757575', // Couleur gris pour le compteur de caractères
        textAlign: 'right',
    },
});