import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useEmplacementViewModel from '../../viewModels/emplacement_viewModel';

export default function FavoritesPage() {
    const { emplacements, loading, error, getEmplacementById } = useEmplacementViewModel(); // Utiliser le ViewModel pour récupérer les emplacements
    const [favoritesData, setFavoritesData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (!loading && !error) {
            const favoritesIds = ['1', '3']; // Remplacer par les IDs réels de vos favoris
            const favoriteEmplacements = emplacements.filter(emplacement => favoritesIds.includes(emplacement.id_emplacement));
            setFavoritesData(favoriteEmplacements);
        }
    }, [emplacements, loading, error]);

    const handleItemPress = (item) => {
        const emplacement = getEmplacementById(item.id_emplacement);
        if (emplacement) {
            navigation.navigate('EmplacementDetails', { marker: emplacement }); // Navigation vers la page de détails avec l'emplacement
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.favoriteItem} 
            onPress={() => handleItemPress(item)} // Gérer le clic sur l'élément
        >
            <ImageBackground
                source={{ uri: item.photos[0] }} // Utiliser l'URL de la première photo de l'emplacement
                style={styles.imageBackground}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{item.localisation}</Text>
                    <Text style={styles.itemText}>{item.caracteristique}</Text>
                </View>
                <View style={styles.heartIcon}>
                    <Ionicons name="heart" size={32} color="red" />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text>Chargement...</Text>;
    }

    if (error) {
        return <Text>Erreur: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Vos emplacements favoris</Text>
            </View>
            <FlatList
                data={favoritesData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_emplacement} // Utiliser l'ID de l'emplacement comme clé
                contentContainerStyle={styles.flatListContent} // Style pour que les éléments remplissent presque toute la largeur
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    goBackButton: {
        marginRight: 10,
        color: "black",
        borderRadius: 20,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
    },
    favoriteItem: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white', // Fond blanc
        width: '95%', // Prendre presque toute la largeur
        alignSelf: 'center', // Centrer horizontalement
    },
    imageBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end', // Placer le texte en bas
        alignItems: 'flex-start',
    },
    textContainer: {
        padding: 10,
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        paddingRight: 90,
        paddingLeft: 30,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    flatListContent: {
        alignItems: 'center', // Centrer les éléments
    },
});