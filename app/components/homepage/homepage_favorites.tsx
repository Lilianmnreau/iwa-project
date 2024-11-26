import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SkeletonFavorite from './skeleton_favorite'; // Importer le composant SkeletonFavorite
import useEmplacementViewModel from '../../viewModels/emplacement_viewModel';
import useEmplacementFavoriteViewModel from '../../viewModels/emplacement_favorite_viewModel';
import { Emplacement } from '../../models/emplacement_model';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { fetchFavoritesStart, fetchFavoritesSuccess, fetchFavoritesFailure } from '../../store/slices/favoritesSlice';

export default function HomepageFavorites() {
    const { emplacements, loading, error, getEmplacementById } = useEmplacementViewModel(); // Utiliser le ViewModel
    const { addEmplacementFavorite, removeEmplacementFavorite, isEmplacementFavorite } = useEmplacementFavoriteViewModel();
    const width = Dimensions.get("window").width;
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userId = "user123"; // Remplacer par l'ID utilisateur réel
    const apiBaseUrl = process.env.REACT_APP_ARTICLE_API_BASE_URL;

    // Simuler des données favorites (à adapter selon vos besoins)
    const [favorites, setFavorites] = useState<string[]>(['1', '3']); // IDs des emplacements favoris

    const handleArrowPress = () => {
        navigation.navigate('FavoritesPage', { favoritesData: favorites });
    };

    const handleItemPress = (index: number) => {
        const selectedEmplacement = emplacements[index];
        navigation.navigate('EmplacementDetails', { marker: selectedEmplacement }) // Log pour tester l'item cliqué
        // Ajoutez ici la logique de navigation ou d'action lorsque l'emplacement est cliqué
    };

    const toggleFavorite = (emplacement: Emplacement) => {
        if (isEmplacementFavorite(emplacement, userId)) {
            removeEmplacementFavorite(emplacement, userId);
            setFavorites(prevFavorites => prevFavorites.filter(favId => favId !== emplacement.id_emplacement));
        } else {
            addEmplacementFavorite(emplacement, userId);
            setFavorites(prevFavorites => [...prevFavorites, emplacement.id_emplacement]);
        }
    };

    const handleReloadPress = () => {
        fetchFavorites();
    };

    async function fetchFavorites() {
        dispatch(fetchFavoritesStart());
        try {
          const response = await fetch(`${apiBaseUrl}/articles`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: Emplacement[] = await response.json();
          dispatch(fetchFavoritesSuccess(data));
        } catch (error) {
          dispatch(fetchFavoritesFailure((error as Error).message));
            Toast.show({
              type: 'error',
              text1: 'Échec de la récupération des favoris',
            });
        }
      };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Vos emplacements favoris</Text>
                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={carouselRef}
                        width={width}
                        height={width / 2}
                        data={[...Array(3).keys()]} // Simuler 3 skeletons
                        loop={false}
                        renderItem={({ index }) => (
                            <SkeletonFavorite />
                        )}
                    />
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Vos emplacements favoris</Text>
                <TouchableOpacity style={styles.reloadButton} onPress={handleReloadPress}>
                    <Ionicons name="reload" size={50} color="#00796B" />
                    <Text style={styles.reloadText}>Recharger</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Filtrer les emplacements favoris
    const favoriteEmplacements = emplacements.filter(emplacement => favorites.includes(emplacement.id_emplacement));

    // Ajouter un élément pour le bouton "Voir tous les favoris"
    const dataWithButton = [...favoriteEmplacements, { id_emplacement: 'button' }];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos emplacements favoris</Text>
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={carouselRef}
                    width={width}
                    height={width / 2}
                    data={dataWithButton}
                    loop={false}
                    renderItem={({ index, item  }) => (
                        item.id_emplacement === 'button' ? (
                            <TouchableOpacity onPress={handleArrowPress} style={styles.arrowContainer} activeOpacity={1}>
                                <View style={styles.arrowCircle}>
                                    <Ionicons name="arrow-forward" size={30} color="white" />
                                </View>
                                <Text style={styles.arrowText}>Voir tous les favoris</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.carouselItem}
                                onPress={() => handleItemPress(index)}
                                activeOpacity={1} // Désactiver l'effet de flash blanc
                            >
                                <ImageBackground
                                    source={{ uri: item.photos[0] }} // Utiliser l'URL de la première photo de l'emplacement
                                    style={styles.imageBackground}
                                >
                                    <TouchableOpacity
                                        style={styles.heartIcon}
                                        onPress={() => item.id_emplacement !== 'button' && toggleFavorite(item as Emplacement)}
                                    >
                                        <Ionicons
                                            name={favorites.includes(item.id_emplacement) ? "heart" : "heart-outline"}
                                            size={32}
                                            color="red"
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.itemText}>{item.localisation}</Text>
                                        <Text style={styles.itemText}>{item.caracteristique}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start', // Aligner en haut
        paddingBottom: 20,
    },
    carouselContainer: {
        flexDirection: 'row', // Aligne le carrousel et le bouton horizontalement
        alignItems: 'center', // Centre le contenu verticalement
        marginTop: 20, // Ajoute un espacement au-dessus si nécessaire
    },
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        margin: 10,
        overflow: 'hidden',
    },
    arrowContainer: {
        flex: 1, // Prendre tout l'espace disponible pour centrer verticalement
        flexDirection: 'column', // Aligne le bouton et le texte verticalement
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#00796B",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5, // Espace entre le cercle et le texte
    },
    arrowText: {
        fontSize: 16,
        color: "#333333",
        padding: 5,
    },
    itemText: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 10,
        color: "#00796B",
    },
    reloadButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    reloadText: {
        fontSize: 16,
        color: "#00796B",
        marginTop: 10,
    },
});