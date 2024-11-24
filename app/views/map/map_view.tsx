import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { renderRating } from '../../utils/renderRating';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
import map_view_styles from './map_view_style';
import { RootState } from '../../store';
import {
  fetchEmplacementsStart,
  fetchEmplacementsSuccess,
  fetchEmplacementsFailure,
} from '../../store/emplacementSlice';
import { Emplacement } from '../../models/emplacement_model';

const cities = require('../../assets/cities.json');

export default function LocationMapView() {

    const mapRef = useRef<any>(); //Changer le type plus tard
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [locationGranted, setLocationGranted] = useState(false);
    const [radius, setRadius] = useState(10); // Rayon en kilomètres
    const [userLocation, setUserLocation] = useState(null);
    const [showSlider, setShowSlider] = useState(false); // État pour contrôler la visibilité du slider
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [isZoomedIn, setIsZoomedIn] = useState(false); // État pour contrôler le niveau de zoom
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const emplacements = useSelector((state: RootState) => state.emplacement.emplacements);
    const loading = useSelector((state: RootState) => state.emplacement.loading);
    const error = useSelector((state: RootState) => state.emplacement.error);

    const INITIAL_REGION = {
        latitude: 43.6,
        longitude: 3.8833,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    }

    const ZOOM_THRESHOLD = {
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    };

    useEffect(() => {
        const fetchEmplacements = async () => {
            dispatch(fetchEmplacementsStart());
            try {
                const response = await fetch(`${process.env.REACT_APP_EMPLACEMENT_API_BASE_URL}/emplacements`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Emplacement[] = await response.json();
                dispatch(fetchEmplacementsSuccess(data));
            } catch (error) {
                dispatch(fetchEmplacementsFailure((error as Error).message));
            }
        };

        fetchEmplacements();
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            Toast.show({
                type: 'info',
                text1: 'Chargement des emplacements...',
                position: 'bottom',
                bottomOffset: 630,
            });
        }
    }, [loading]);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur de chargement',
                position: 'bottom',
                bottomOffset: 630,
            });
        }
    }, [error]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
            setLocationGranted(true);

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        })();
    }, []);

    const onMarkerSelected = (marker: any) => {
        mapRef.current.animateToRegion({
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    const onCalloutSelected = (marker: any) => {
        navigation.navigate('EmplacementDetails', { marker });
    };

    const handleSearch = (text: string) => {
        setQuery(text);
        if (text) {
            const filtered = cities.cities.filter((city: any) =>
                city.city_code.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleSelectCity = (city: any) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: parseFloat(city.latitude),
                longitude: parseFloat(city.longitude),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000); // Ajoutez une durée pour l'animation
        }
        setQuery(city.name);
        setFilteredCities([]);
    };

    const handleOutsidePress = () => {
        setFilteredCities([]);
        Keyboard.dismiss();
    };

    const handleFocus = () => {
        setShowSlider(false); // Ferme le slider lorsque le TextInput est focalisé
    };

    const centerUserLocation = async () => {
        if (locationGranted) {
            let location = await Location.getCurrentPositionAsync({});
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        } else {
            Alert.alert('Location permission not granted');
        }
    };

    const filterMarkersByRadius = () => {
        if (!userLocation) return emplacements;
        return emplacements.filter(marker => {
            const distance = getDistanceFromLatLonInKm(
                userLocation.latitude,
                userLocation.longitude,
                marker.coordonnees.latitude,
                marker.coordonnees.longitude
            );
            return distance <= radius;
        });
    };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance en km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const onRegionChangeComplete = (region) => {
        if (!showSlider) {
            const isZoomedIn = region.latitudeDelta < ZOOM_THRESHOLD.latitudeDelta && region.longitudeDelta < ZOOM_THRESHOLD.longitudeDelta;
            setIsZoomedIn(isZoomedIn);

            if (isZoomedIn) {
                const filteredMarkers = emplacements.filter(marker => {
                    return (
                        marker.coordonnees.latitude >= region.latitude - region.latitudeDelta / 2 &&
                        marker.coordonnees.latitude <= region.latitude + region.latitudeDelta / 2 &&
                        marker.coordonnees.longitude >= region.longitude - region.longitudeDelta / 2 &&
                        marker.coordonnees.longitude <= region.longitude + region.longitudeDelta / 2
                    );
                });
                setVisibleMarkers(filteredMarkers);
            } else {
                setVisibleMarkers([]);
            }
        }
    };

    useEffect(() => {
        if (showSlider) {
            const filteredMarkers = filterMarkersByRadius();
            setVisibleMarkers(filteredMarkers);
        }
    }, [radius, userLocation, showSlider]);

    const PriceBubble = ({ price }) => (
      <View style={map_view_styles.bubble}>
        <Text style={map_view_styles.priceText}>{price}€</Text>
      </View>
    );

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={map_view_styles.container}>
                <View style={map_view_styles.autocompleteWrapper}>
                    <Ionicons name="search" size={20} color="black" style={map_view_styles.searchIcon} />
                    <TextInput
                        style={map_view_styles.textInput}
                        value={query}
                        onChangeText={handleSearch}
                        placeholder="Entrez le nom d’une ville"
                        onFocus={handleFocus}
                    />
                </View>
                {showSlider && (
                    <View style={map_view_styles.sliderContainer}>
                        <Text>Rayon: {radius} km</Text>
                        <Slider
                            style={map_view_styles.slider}
                            minimumValue={1}
                            maximumValue={500} // À modifier
                            step={1}
                            value={radius}
                            onValueChange={setRadius}
                        />
                    </View>
                )}
                <MapView
                    style={map_view_styles.map}
                    initialRegion={INITIAL_REGION}
                    ref={mapRef}
                    showsUserLocation={true}
                    onRegionChangeComplete={onRegionChangeComplete}
                >
                    {visibleMarkers.map((emplacement) => (
                        <Marker
                            key={emplacement.id_emplacement}
                            coordinate={emplacement.coordonnees}
                        >
                            <PriceBubble price={emplacement.tarif} />
                            <Callout onPress={() => onCalloutSelected(emplacement)}>
                                <View style={map_view_styles.calloutContainer}>
                                    <Text style={map_view_styles.calloutTitle}>
                                        {emplacement.localisation}
                                    </Text>
                                    <View >
                                        <Image
                                            source={{ uri: emplacement.photos[0] }} // Utilise la première photo
                                            style={map_view_styles.image}
                                        />
                                    </View>
                                    <Text style={map_view_styles.calloutDescription}>
                                        {emplacement.caracteristique}
                                    </Text>
                                    <Text style={map_view_styles.priceText}>
                                        {emplacement.tarif}€ / nuit
                                    </Text>
                                    <View style={map_view_styles.ratingContainer}>
                                        <Text style={map_view_styles.ratingText}>
                                            {emplacement.moyenneAvis} / 5
                                        </Text>
                                        {renderRating(emplacement.moyenneAvis)}
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
                {filteredCities.length > 0 && (
                    <View style={map_view_styles.suggestionsContainer}>
                        <FlatList
                            data={filteredCities}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectCity(item)}>
                                    <View style={map_view_styles.itemContainer}>
                                        <Ionicons name="compass" size={20} color="black" />
                                        <Text style={map_view_styles.autocompleteItemText}>{item.city_code}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.city_code}
                            style={map_view_styles.list}
                        />
                    </View>
                )}
                <TouchableOpacity style={map_view_styles.locationButton} onPress={centerUserLocation}>
                    <Ionicons name="locate" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={map_view_styles.sliderToggleButton} onPress={() => setShowSlider(!showSlider)}>
                    <Ionicons name="options" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    );  
}