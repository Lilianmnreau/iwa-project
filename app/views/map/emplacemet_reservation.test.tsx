/*import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmplacementReservation from './emplacement_reservation_view';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { Reservation } from '../../models/reservation.model';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('EmplacementReservation', () => {
  const mockReservations: Reservation[] = [
    {
      id_reservation: '1',
      id_user: '123',
      date_debut: '2023-11-01',
      date_fin: '2023-11-05',
      statut: 'confirmée',
      message_voyageur: 'Merci pour la réservation !',
      emplacement: {
        id_emplacement: '10',
        id_user: '456',
        localisation: 'Paris, France',
        caracteristique: 'Vue sur la Tour Eiffel',
        equipement: ['WiFi', 'Electricité', 'Douche'],
        tarif: 50,
        disponible: true,
        moyenneAvis: 4.5,
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        coordonnees: {
          latitude: 48.8588443,
          longitude: 2.2943506,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
    },
  ];

  it('doit désactiver les dates réservées dans le calendrier', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <EmplacementReservation reservations={mockReservations} />
      </NavigationContainer>
    );

    // Vérifie que les dates réservées sont marquées comme désactivées
    expect(getByTestId('calendar')).toBeTruthy();
    expect(getByTestId('2023-11-01')).toBeTruthy(); // Exemple avec une date réservée
  });

  it('doit permettre de sélectionner une plage de dates valide', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EmplacementReservation reservations={mockReservations} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('6')); // Sélectionner une date de début
    fireEvent.press(getByText('8')); // Sélectionner une date de fin

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Réservation confirmée',
      text2: 'Vous avez réservé du 2023-11-06 au 2023-11-08.',
    });
  });

  it('doit afficher une erreur si la date de fin est avant la date de début', () => {
    const { getByText } = render(
      <NavigationContainer>
        <EmplacementReservation reservations={mockReservations} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('8')); // Sélectionner une date de fin avant la date de début
    fireEvent.press(getByText('6')); // Sélectionner une date de début

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Erreur',
      text2: 'La date de fin ne peut pas être avant la date de début',
    });
  });

  it('doit afficher une erreur si aucune plage de dates n\'est sélectionnée lors de la confirmation', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <EmplacementReservation reservations={mockReservations} />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('confirm-button'));

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Erreur',
      text2: 'Veuillez sélectionner une plage de dates.',
    });
  });

  it('doit réinitialiser les dates sélectionnées après une réservation réussie', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <EmplacementReservation reservations={mockReservations} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('6')); // Sélectionner une date de début
    fireEvent.press(getByText('8')); // Sélectionner une date de fin
    fireEvent.press(getByTestId('confirm-button'));

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Réservation confirmée',
      text2: 'Vous avez réservé du 2023-11-06 au 2023-11-08.',
    });
  });
});
*/