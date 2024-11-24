import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EmplacementReservationCell({ reservation }) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EmplacementReservationDetails', { reservation });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{reservation.date}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Statut:</Text>
                <Text style={styles.value}>{reservation.statut}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Message:</Text>
                <Text style={styles.value}>{reservation.message_voyageur}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        flex: 1,
    },
});