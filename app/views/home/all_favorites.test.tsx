import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoritesPage from './all_favorite_view';
import { useNavigation } from '@react-navigation/native';
import useEmplacementViewModel from '../../viewModels/emplacement_viewModel';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../viewModels/emplacement_viewModel', () => jest.fn());

describe('FavoritesPage', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  const mockViewModel = {
    emplacements: [
      {
        id_emplacement: '1',
        localisation: 'Paris, France',
        caracteristique: 'Près de la Tour Eiffel',
        photos: ['https://via.placeholder.com/150'],
      },
      {
        id_emplacement: '3',
        localisation: 'Lyon, France',
        caracteristique: 'Proche du Vieux Lyon',
        photos: ['https://via.placeholder.com/150'],
      },
    ],
    loading: false,
    error: null,
    getEmplacementById: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useEmplacementViewModel as jest.Mock).mockReturnValue(mockViewModel);
    jest.clearAllMocks();
  });

  it('doit afficher un message de chargement lorsque `loading` est true', () => {
    (useEmplacementViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      loading: true,
    });

    const { getByText } = render(<FavoritesPage />);
    expect(getByText('Chargement...')).toBeTruthy();
  });

  it('doit afficher un message d\'erreur lorsque `error` est défini', () => {
    (useEmplacementViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      error: 'Erreur de chargement',
    });

    const { getByText } = render(<FavoritesPage />);
    expect(getByText('Erreur: Erreur de chargement')).toBeTruthy();
  });

  it('doit afficher les emplacements favoris', () => {
    const { getByText, getByTestId } = render(<FavoritesPage />);

    // Vérifiez que les emplacements favoris sont affichés
    expect(getByText('Paris, France')).toBeTruthy();
    expect(getByText('Près de la Tour Eiffel')).toBeTruthy();
    expect(getByText('Lyon, France')).toBeTruthy();
    expect(getByText('Proche du Vieux Lyon')).toBeTruthy();
  });

  it('doit naviguer vers les détails d\'un emplacement lorsqu\'un élément est cliqué', () => {
    mockViewModel.getEmplacementById.mockReturnValue({
      id_emplacement: '1',
      localisation: 'Paris, France',
      caracteristique: 'Près de la Tour Eiffel',
      photos: ['https://via.placeholder.com/150'],
    });

    const { getByText } = render(<FavoritesPage />);
    const item = getByText('Paris, France');

    // Simulez un clic sur l'élément
    fireEvent.press(item);

    // Vérifiez que `navigate` a été appelé avec les bons paramètres
    expect(mockNavigation.navigate).toHaveBeenCalledWith('EmplacementDetails', {
      marker: mockViewModel.getEmplacementById('1'),
    });
  });

  it('doit appeler `navigation.goBack` lorsqu\'on clique sur le bouton retour', () => {
    const { getByTestId } = render(<FavoritesPage />);
    const backButton = getByTestId('go-back-button');

    // Simulez un clic sur le bouton retour
    fireEvent.press(backButton);

    // Vérifiez que `goBack` a été appelé
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
