import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilView from './profile_view';
import { Alert } from 'react-native';

// Mocks pour les icônes
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    Ionicons: (props) => React.createElement('Icon', props),
    MaterialIcons: (props) => React.createElement('Icon', props),
    MaterialCommunityIcons: (props) => React.createElement('Icon', props),
  };
});

// Mock pour expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
}));

// Mock pour react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

// Mock pour expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [{ uri: 'test-uri' }] })),
}));

// Mock pour renderRating
jest.mock('../../utils/renderRating', () => ({
  renderRating: jest.fn(() => null),
}));

// Définition du mockProfilViewModel en dehors du jest.mock
const mockProfilViewModel = {
  users: [
    {
      id_user: 1,
      prenom: 'John',
      nom: 'Doe',
      email: 'john.doe@example.com',
      telephone: '1234567890',
      mot_de_passe: 'password',
      role: 'User',
      photo: null,
      emplacements: [
        {
          id_emplacement: 1,
          localisation: 'Paris',
          caracteristique: 'Belle vue',
          equipement: 'Wi-Fi',
          tarif: 100,
          disponible: true,
          moyenneAvis: 4.5,
        },
      ],
      reservations: [
        {
          id_reservation: 1,
          date_debut: '2023-12-01',
          date_fin: '2023-12-10',
          statut: 'Confirmée',
          message_voyageur: 'Hâte de venir !',
        },
      ],
    },
  ],
  updateUser: jest.fn(),
};

// Mock pour le ViewModel utilisateur
jest.mock('../../viewModels/user_viewModel', () => {
  return jest.fn(() => mockProfilViewModel);
});

it('affiche les informations utilisateur', () => {
    const { getByText } = render(<ProfilView />);
  
    expect(getByText(/Prénom:/)).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(getByText(/Nom:/)).toBeTruthy();
    expect(getByText('Doe')).toBeTruthy();
    expect(getByText(/Email:/)).toBeTruthy();
    expect(getByText('john.doe@example.com')).toBeTruthy();
    expect(getByText(/Téléphone:/)).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
    expect(getByText(/Rôle:/)).toBeTruthy();
    expect(getByText('User')).toBeTruthy();
  });



  it('permet de passer en mode édition', () => {
    const { getByTestId, getByPlaceholderText } = render(<ProfilView />);

    // Appuyer sur le bouton d'édition
    const editButton = getByTestId('edit-profile-button');
    fireEvent.press(editButton);

    // Vérifier que les champs d'édition sont affichés
    expect(getByPlaceholderText('Prénom')).toBeTruthy();
    expect(getByPlaceholderText('Nom')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Téléphone')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
  });

  it('permet de modifier les informations utilisateur', () => {
    const mockUpdateUser = jest.fn();
    require('../../viewModels/user_viewModel').mockReturnValue({
      users: [
        {
          id_user: 1,
          prenom: 'John',
          nom: 'Doe',
          email: 'john.doe@example.com',
          telephone: '1234567890',
          mot_de_passe: 'password',
          role: 'User',
          photo: null,
          emplacements: [],
          reservations: [],
        },
      ],
      updateUser: mockUpdateUser,
    });

    const { getByTestId, getByPlaceholderText, getByText } = render(<ProfilView />);

    // Passer en mode édition
    const editButton = getByTestId('edit-profile-button');
    fireEvent.press(editButton);

    // Modifier le prénom
    const prenomInput = getByPlaceholderText('Prénom');
    fireEvent.changeText(prenomInput, 'Jane');

    // Sauvegarder les modifications
    const saveButton = getByText('Sauvegarder');
    fireEvent.press(saveButton);

    // Vérifier que updateUser a été appelé avec les bonnes valeurs
    expect(mockUpdateUser).toHaveBeenCalledWith(1, { prenom: 'Jane' });
  });

  it('navigue vers les paramètres lorsqu’on appuie sur le bouton réglages', () => {
    const navigationMock = { navigate: jest.fn() };
    require('@react-navigation/native').useNavigation.mockReturnValue(navigationMock);

    const { getByTestId } = render(<ProfilView />);

    const settingsButton = getByTestId('settings-button');
    fireEvent.press(settingsButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('SettingsStack');
  });

  it('navigue vers l’ajout d’emplacement lorsqu’on appuie sur le bouton d’ajout', () => {
    const navigationMock = { navigate: jest.fn() };
    require('@react-navigation/native').useNavigation.mockReturnValue(navigationMock);

    const { getByTestId } = render(<ProfilView />);

    const addButton = getByTestId('add-emplacement-button');
    fireEvent.press(addButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('Add_emplacement');
  });

  /*
  it('navigue vers les détails de l’emplacement lorsqu’on appuie sur un emplacement', () => {
    const navigationMock = { navigate: jest.fn() };
    require('@react-navigation/native').useNavigation.mockReturnValue(navigationMock);
  
    const { getByTestId } = render(<ProfilView />);
  
    const emplacementItem = getByTestId('emplacement-1');
    fireEvent.press(emplacementItem);
  
    expect(navigationMock.navigate).toHaveBeenCalledWith('Emplacement_detail', { emplacement: expect.any(Object) });
  });
  it('navigue vers les détails de la réservation lorsqu’on appuie sur une réservation', () => {
    const navigationMock = { navigate: jest.fn() };
    require('@react-navigation/native').useNavigation.mockReturnValue(navigationMock);
  
    const { getByTestId } = render(<ProfilView />);
  
    const reservationItem = getByTestId('reservation-1');
    fireEvent.press(reservationItem);
  
    expect(navigationMock.navigate).toHaveBeenCalledWith('Reservation_detail', { reservation: expect.any(Object) });
  });
*/