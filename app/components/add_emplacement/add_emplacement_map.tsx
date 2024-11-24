import { View, StyleSheet, Button, Text } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setCoordonnees } from '../../store/addEmplacementSlice'; // Assurez-vous que le chemin est correct
import { selectCoordonnees } from '../../store/selectors'; // Importer le sélecteur mémorisé

export default function AddEmplacementMap() {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const coordonnees = useSelector(selectCoordonnees);
    const [markerPosition, setMarkerPosition] = useState({
        latitude: coordonnees?.latitude || 48.8566, // Coordonnées par défaut pour Paris, France
        longitude: coordonnees?.longitude || 2.3522,
    });
    const [isPositionFixed, setIsPositionFixed] = useState(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permission de localisation refusée");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setMarkerPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        };

        requestLocationPermission();
    }, []);

    const handleRegionChange = (region) => {
        if (!isPositionFixed) {
            setMarkerPosition({
                latitude: region.latitude,
                longitude: region.longitude,
            });
        }
    };

    const handleFixPosition = () => {
        if (isPositionFixed) {
            setIsPositionFixed(false);
        } else {
            dispatch(setCoordonnees({
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }));
            setIsPositionFixed(true);
            console.log("Coordonnées fixées :", markerPosition);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Ionicons name="location-outline" size={24} color="#00796B" />
                    <Text style={styles.title}>Sélectionner un emplacement</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        ref={mapRef}
                        showsUserLocation={true}
                        onRegionChange={handleRegionChange}
                        initialRegion={{
                            latitude: markerPosition.latitude,
                            longitude: markerPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={markerPosition}
                            draggable={!isPositionFixed}
                            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
                        />
                    </MapView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title={isPositionFixed ? "Modifier la position" : "Fixer la position"}
                        onPress={handleFixPosition}
                        color="#007BFF" // Couleur du bouton
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF', // Couleur de fond pour la carte
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796B', // Couleur du texte pour le titre
        marginLeft: 10,
    },
    mapContainer: {
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F0F4F8', // Couleur de fond douce pour le conteneur de la carte
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 10,
    },
});