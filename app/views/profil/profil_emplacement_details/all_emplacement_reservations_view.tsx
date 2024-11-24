import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import EmplacementReservationCell from "../../../components/reservation/emplacement_reservation_cell";

export default function AllEmplacementReservation() {
    const navigation = useNavigation();
    const [sortOrder, setSortOrder] = useState('recent');

    const reservations = [
        { id: 1, date: '12/08/2024 - 15/08/2024', statut: 'Confirmée', message_voyageur: 'Merci pour ce bel emplacement !' },
        { id: 2, date: '20/09/2024 - 22/09/2024', statut: 'En attente', message_voyageur: 'Est-ce possible d\'arriver plus tôt ?' },
        { id: 3, date: '05/10/2024 - 10/10/2024', statut: 'Annulée', message_voyageur: 'Je dois annuler pour des raisons personnelles.' },
    ];

    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = new Date(a.date.split(' - ')[0]);
        const dateB = new Date(b.date.split(' - ')[0]);
        return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={1}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Toutes les réservations</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                <TouchableOpacity onPress={() => setSortOrder('recent')} style={styles.filterButton} activeOpacity={1}>
                    <Text style={styles.filterText}>Les plus récentes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSortOrder('oldest')} style={styles.filterButton} activeOpacity={1}>
                    <Text style={styles.filterText}>Les plus anciennes</Text>
                </TouchableOpacity>
            </ScrollView>
            {sortedReservations.map(reservation => (
                <EmplacementReservationCell key={reservation.id} reservation={reservation} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    filterContainer: {
        marginBottom: 20,
    },
    filterButton: {
        padding: 10,
        marginRight: 10,
    },
    filterText: {
        fontSize: 14,
        color: 'gray',
    },
});