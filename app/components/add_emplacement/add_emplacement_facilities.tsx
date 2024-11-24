import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, List } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setEquipement } from '../../store/addEmplacementSlice'; // Assurez-vous que le chemin est correct
import { selectEquipement } from '../../store/selectors'; // Importer le sélecteur mémorisé

const iconMap = {
    "Wi-Fi": "wifi",
    "Piscine": "water",
    "Parking": "car",
    "Animaux acceptés": "paw",
    "Terrasse": "home",
    "Électricité": "flash",
    "Eau potable": "water",
    "Poubelles": "trash",
    "Toit": "home",
    "Feu de camp": "campfire",
};

export default function AddEmplacementFacilities() {
    const dispatch = useDispatch();
    const selectedFacilities = useSelector(selectEquipement);

    const handleSelection = (facility, value) => {
        const updatedFacilities = selectedFacilities.includes(facility)
            ? selectedFacilities.filter(item => item !== facility)
            : [...selectedFacilities, facility];
        dispatch(setEquipement(updatedFacilities));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sélectionner les équipements</Text>
            {Object.keys(iconMap).map((facility) => (
                <View key={facility} style={styles.item}>
                    {iconMap[facility] === 'campfire' ? (
                        <MaterialCommunityIcons name="campfire" size={24} color="#6D4C41" />
                    ) : iconMap[facility] === 'trash' ? (
                        <Ionicons name="trash" size={24} color="#B0BEC5" />
                    ) : (
                        <List.Icon icon={iconMap[facility]} color="#00796B" />
                    )}
                    <Text style={styles.text}>{facility}</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioItem}>
                            <Ionicons name="checkmark" size={24} color="green" style={styles.checkIcon} />
                            <RadioButton
                                value="oui"
                                status={selectedFacilities.includes(facility) ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'oui')}
                                color="#007BFF"
                            />
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="non"
                                status={!selectedFacilities.includes(facility) ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'non')}
                                color="#007BFF"
                            />
                            <Ionicons name="close" size={24} color="red" style={styles.crossIcon} />
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00796B',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#424242',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    checkIcon: {
        marginRight: 5,
    },
    crossIcon: {
        marginLeft: 5,
    },
});