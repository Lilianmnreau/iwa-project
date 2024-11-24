import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmplacementDetailsAllRatings from './emplacement_details_all_ratings';
import { Ionicons } from '@expo/vector-icons';

// Mock pour Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock pour la navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('EmplacementDetailsAllRatings', () => {
  it('affiche la liste complète des avis', () => {
    const { getByText } = render(<EmplacementDetailsAllRatings />);

    // Vérifier que tous les avis sont affichés
    expect(getByText('Excellent!')).toBeTruthy();
    expect(getByText('Very good')).toBeTruthy();
    expect(getByText('Average')).toBeTruthy();
  });

  it('filtre les avis par les meilleurs (5 étoiles)', () => {
    const { getByText, queryByText } = render(<EmplacementDetailsAllRatings />);

    // Appuyer sur le filtre "Les meilleurs"
    const bestFilterButton = getByText('Les meilleurs');
    fireEvent.press(bestFilterButton);

    // Vérifier que seul l'avis avec 5 étoiles est affiché
    expect(getByText('Excellent!')).toBeTruthy();
    expect(queryByText('Very good')).toBeNull();
    expect(queryByText('Average')).toBeNull();
  });

  it('filtre les avis par les pires (1 étoile)', () => {
    const { getByText, queryByText } = render(<EmplacementDetailsAllRatings />);

    // Appuyer sur le filtre "Les pires"
    const worstFilterButton = getByText('Les pires');
    fireEvent.press(worstFilterButton);

    // Aucun avis avec 1 étoile, donc la liste doit être vide
    expect(queryByText('Excellent!')).toBeNull();
    expect(queryByText('Very good')).toBeNull();
    expect(queryByText('Average')).toBeNull();
  });

  it('recherche un avis par texte', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<EmplacementDetailsAllRatings />);

    // Saisir un texte dans la barre de recherche
    const searchInput = getByPlaceholderText('Rechercher dans les avis...');
    fireEvent.changeText(searchInput, 'Average');

    // Vérifier que seul l'avis correspondant est affiché
    expect(getByText('Average')).toBeTruthy();
    expect(queryByText('Excellent!')).toBeNull();
    expect(queryByText('Very good')).toBeNull();
  });

  it('filtre les avis par 4 étoiles', () => {
    const { getByTestId, queryByText } = render(<EmplacementDetailsAllRatings />);

    // Appuyer sur le filtre "4 étoiles"
    const fourStarsFilter = getByTestId('filter-4');
    fireEvent.press(fourStarsFilter);

    // Vérifier que seul l'avis avec 4 étoiles est affiché
    expect(queryByText('Very good')).toBeTruthy();
    expect(queryByText('Excellent!')).toBeNull();
    expect(queryByText('Average')).toBeNull();
  });

  it('rende correctement les étoiles', () => {
    const { getAllByTestId } = render(<EmplacementDetailsAllRatings />);

    // Vérifier que les étoiles sont rendues correctement
    const stars = getAllByTestId('star');
    expect(stars.length).toBeGreaterThan(0);
  });
});
