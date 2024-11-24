import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Reservation_details from './Reservation_details';
import { Alert, View, Text } from 'react-native';

beforeAll(() => {
    jest.useFakeTimers({ timerLimit: 1000 });
  });
  
  afterAll(() => {
    jest.useRealTimers();
  });
  

// Mock pour Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock pour react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
  })),
}));

  

// Mock pour Alert
jest.spyOn(Alert, 'alert');

describe('Reservation_details', () => {
  const mockReservation = {
    date_debut: '2023-12-01',
    date_fin: '2023-12-10',
    statut: 'Confirmée',
    message_voyageur: 'Merci pour la réservation !',
  };

  it('affiche correctement les détails de la réservation', () => {
    const { getByText } = render(
      <Reservation_details route={{ params: { reservation: mockReservation } }} navigation={{}} />
    );

    // Vérifier les détails de la réservation
    expect(getByText('Détails de la Réservation')).toBeTruthy();
    expect(getByText('2023-12-01 / 2023-12-10')).toBeTruthy();
    expect(getByText('Confirmée')).toBeTruthy();
    expect(getByText('Merci pour la réservation !')).toBeTruthy();
  });

  it('affiche un bouton pour annuler une réservation active', () => {
    // Fixer la date actuelle au 5 décembre 2023
    jest.setSystemTime(new Date('2023-12-05'));
  
    const activeReservation = {
      date_debut: '2023-12-01',
      date_fin: '2023-12-10', // Date future par rapport au 5 décembre 2023
      statut: 'Confirmée',
      message_voyageur: 'Merci pour la réservation !',
    };
  
    const { getByText } = render(
      <Reservation_details route={{ params: { reservation: activeReservation } }} navigation={{}} />
    );
  
    // Vérifier la présence du bouton "Annuler"
    const cancelButton = getByText('Annuler');
    expect(cancelButton).toBeTruthy();
  });
  
  
  
  

  it('affiche un bouton pour donner un avis si la réservation est terminée', () => {
    const finishedReservation = {
      ...mockReservation,
      date_fin: '2023-01-01', // Date passée
    };
  
    const { getByTestId } = render(
      <Reservation_details route={{ params: { reservation: finishedReservation } }} navigation={{}} />
    );
  
    // Vérifier la présence du bouton "Donner un avis"
    const reviewButton = getByTestId('give-review-button');
    expect(reviewButton).toBeTruthy();
  
    // Simuler un clic sur le bouton
    fireEvent.press(reviewButton);
  
    // Vérifier que le formulaire apparaît
    const reviewForm = getByTestId('review-form-title');
    expect(reviewForm).toBeTruthy();
  });
  

  it('envoie un avis après avoir rempli le formulaire', () => {
    const finishedReservation = {
      ...mockReservation,
      date_fin: '2023-01-01',
    };

    const { getByText, getByPlaceholderText } = render(
      <Reservation_details route={{ params: { reservation: finishedReservation } }} navigation={{}} />
    );

    // Ouvrir le formulaire d'avis
    const reviewButton = getByText('Donner un avis');
    fireEvent.press(reviewButton);

    // Remplir le formulaire
    const commentInput = getByPlaceholderText('Commentaire');
    fireEvent.changeText(commentInput, 'Super expérience !');

    const submitButton = getByText('Soumettre');
    fireEvent.press(submitButton);

    // Vérifier que l'alerte est affichée
    expect(Alert.alert).toHaveBeenCalledWith('Avis envoyé', 'Merci pour votre avis.');
  });
  
  
});


