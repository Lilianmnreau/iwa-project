import { StyleSheet } from 'react-native';

const map_view_styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    callout: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden', // Assure que le contenu respecte les bords arrondis
    },
    calloutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    autocompleteWrapper: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white', // Ajout d'un fond blanc pour le conteneur
        height: 50, // Fixe la hauteur de la vue de l'autocomplete
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        height: '100%',
        borderWidth: 0,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60, // Ajustez cette valeur en fonction de la hauteur de votre input
        left: 10,
        right: 10,
        zIndex: 2, // Assurez-vous que la liste est au-dessus de l'autocompleteWrapper
        maxHeight: 200, // Limite la hauteur de la liste pour éviter qu'elle n'agrandisse la vue principale
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    list: {
        borderWidth: 0,
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, // Ajoutez du padding pour rendre les éléments plus grands
    },
    autocompleteItemText: {
        fontSize: 18, // Augmentez cette valeur pour rendre le texte plus grand
        marginLeft: 10, // Ajoutez une marge à gauche pour séparer l'icône du texte
    },
    locationButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    sliderToggleButton: {
        position: 'absolute',
        bottom: 80, // Positionné au-dessus du bouton de localisation
        left: 20,
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    sliderContainer: {
        position: 'absolute',
        top: 70, // Positionné en dessous du TextInput
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        zIndex: 3,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default map_view_styles;