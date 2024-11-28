import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars'; 
import moment from 'moment'; 
import { Reservation } from '../../models/reservation.model';
import Toast from 'react-native-toast-message'; // Importer Toast
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addReservation } from '../../store/slices/reservationSlice';

interface EmplacementReservationProps {
  reservations: Reservation[];
  emplacementId: number;
}

export default function EmplacementReservation({ reservations, emplacementId }: EmplacementReservationProps) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedRange, setSelectedRange] = useState<{ startDate: string | null, endDate: string | null }>({ startDate: null, endDate: null });
  const navigation = useNavigation(); // Utiliser useNavigation
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.profil.userId);

  useEffect(() => {
    const disabledDates = {};

    // Désactiver les dates réservées pour l'emplacement spécifique
    reservations
      .filter(reservation => reservation.idEmplacement === emplacementId)
      .forEach(reservation => {
        let current = moment(reservation.dateDebut);
        const end = moment(reservation.dateFin);

        while (current <= end) {
          const formattedDate = current.format('YYYY-MM-DD');
          disabledDates[formattedDate] = {
            disabled: true,
            disableTouchEvent: true,
            color: '#d3d3d3',
            textColor: 'gray',
          };
          current = current.add(1, 'day');
        }
      });

    setMarkedDates(disabledDates);
  }, [reservations, emplacementId]);

  const handleDayPress = (day) => {
    const { dateString } = day;

    if (!selectedRange.startDate) {
      // Sélectionner une date de début
      setSelectedRange({ startDate: dateString, endDate: null });
      setMarkedDates((prev) => ({
        ...prev,
        [dateString]: { selected: true, startingDay: true, color: '#4CAF50', textColor: 'white' },
      }));
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      // Sélectionner une date de fin
      const startDate = moment(selectedRange.startDate);
      const endDate = moment(dateString);

      if (endDate.isBefore(startDate)) {
        Toast.show({
          type: 'error',
          text1: 'Erreur',
          text2: 'La date de fin ne peut pas être avant la date de début',
        });
      } else {
        const newMarkedDates = { ...markedDates };
        let current = startDate;

        while (current <= endDate) {
          const formattedDate = current.format('YYYY-MM-DD');
          newMarkedDates[formattedDate] = {
            selected: true,
            color: '#4CAF50', // Vert naturel
            textColor: 'white',
          };
          current = current.add(1, 'day');
        }

        newMarkedDates[selectedRange.startDate] = { selected: true, startingDay: true, color: '#4CAF50', textColor: 'white' };
        newMarkedDates[dateString] = { selected: true, endingDay: true, color: '#4CAF50', textColor: 'white' };

        setSelectedRange({ startDate: selectedRange.startDate, endDate: dateString });
        setMarkedDates(newMarkedDates);
      }
    } else {
      // Réinitialiser la sélection si une date est déjà sélectionnée
      const newMarkedDates = { ...markedDates };

      // Retirer toutes les dates précédemment sélectionnées
      const startDate = moment(selectedRange.startDate);
      const endDate = selectedRange.endDate ? moment(selectedRange.endDate) : startDate;

      let current = startDate;
      while (current <= endDate) {
        const formattedDate = current.format('YYYY-MM-DD');
        newMarkedDates[formattedDate] = undefined; // Retirer l'ancienne sélection
        current = current.add(1, 'day');
      }

      // Ajouter la nouvelle sélection
      setSelectedRange({ startDate: dateString, endDate: null });
      newMarkedDates[dateString] = { selected: true, startingDay: true, color: '#4CAF50', textColor: 'white' };

      setMarkedDates(newMarkedDates);
    }
  };

  const handleReservationConfirmation = () => {
    const { startDate, endDate } = selectedRange;
    if (startDate && endDate) {
      Toast.show({
        type: 'success',
        text1: 'Réservation confirmée',
        text2: `Vous avez réservé du ${startDate} au ${endDate}.`,
      });
      const newReservation: Reservation = {
        idUser: userId,
        dateDebut: startDate,
        dateFin: endDate,
        statut: 'en attente',
        messageVoyageur: 'test',
        idEmplacement: emplacementId,
      };
      dispatch(addReservation(newReservation));
      // Réinitialiser les dates sélectionnées
      setSelectedRange({ startDate: null, endDate: null });
      setMarkedDates({});

      // Rediriger vers la page d'accueil
      navigation.navigate('Map' as never);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Veuillez sélectionner une plage de dates.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez vos dates</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'period'}
        hideExtraDays={true}
        minDate={moment().format('YYYY-MM-DD')}
        enableSwipeMonths={true}
      />

      <Pressable testID="confirm-reservation-button" style={styles.button} onPress={handleReservationConfirmation}>
        <Text style={styles.text_button}>Confirmer la réservation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f9fa', // Couleur de fond moderne
  },
  title: {
    fontSize: 20, // Taille de police plus grande pour le titre
    fontWeight: '600', // Police semi-gras
    marginBottom: 20,
    color: '#343a40', // Couleur élégante pour le texte
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#388E3C', // Vert naturel pour le bouton
    marginTop: 20,
  },
  text_button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});