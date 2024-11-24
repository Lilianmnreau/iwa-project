import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper'; // Utilisation de Button de react-native-paper pour la cohérence
import { useSelector, useDispatch } from 'react-redux';
import { setPhotos } from '../../store/addEmplacementSlice'; // Assurez-vous que le chemin est correct
import { selectPhotos } from '../../store/selectors'; // Importer le sélecteur mémorisé

export default function AddEmplacementAddPhoto() {
    const dispatch = useDispatch();
    const images = useSelector(selectPhotos) || [];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.slice(0, 10 - images.length).map(asset => asset.uri);
            dispatch(setPhotos([...images, ...newImages]));
        }
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        dispatch(setPhotos(updatedImages));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter vos photos</Text>
            <Text style={styles.description}>Ajoutez de 1 à 10 photos de votre emplacement !</Text>
            <Button 
                mode="contained" 
                onPress={pickImage} 
                style={styles.button}
            >
                Ajouter des photos
            </Button>
            <View style={styles.imageContainer}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.image} />
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                            <Ionicons name="close-circle" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF', // Couleur de fond blanche
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, // Ombre sur Android
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B', // Couleur du texte
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#757575', // Couleur gris pour les instructions
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#00796B",
        marginBottom: 20,
        borderRadius: 5, // Arrondir les bords du bouton
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 5, // Bordures arrondies
        overflow: 'hidden', // Pour masquer le débordement
        elevation: 2, // Ombre pour les images
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5, // Bordures arrondies pour l'image
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Fond rouge transparent pour le bouton de suppression
        borderRadius: 15, // Arrondir le bouton
        padding: 5,
    },
});