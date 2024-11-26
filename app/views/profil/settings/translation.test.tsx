import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TranslationView from './translation_view';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

// Mock pour react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

// Mock pour react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: jest.fn(),
  })),
}));

describe('TranslationView', () => {
  const tMock = jest.fn((key) => key);
  const changeLanguageMock = jest.fn();
  const navigationMock = useNavigation();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: tMock,
      i18n: {
        language: 'en',
        changeLanguage: changeLanguageMock,
      },
    });
  });

  it('affiche correctement les options de langue', () => {
    const { getByText } = render(<TranslationView />);

    // Vérifier que le titre est affiché
    expect(getByText('choose_language')).toBeTruthy();

    // Vérifier que les langues sont affichées
    expect(getByText('Français')).toBeTruthy();
    expect(getByText('Anglais')).toBeTruthy();
  });

  it('change la langue lorsqu’une option est sélectionnée', () => {
    const { getByText } = render(<TranslationView />);

    // Appuyer sur l'option Français
    fireEvent.press(getByText('Français'));

    // Vérifier que la fonction changeLanguage est appelée avec le bon code
    expect(changeLanguageMock).toHaveBeenCalledWith('fr');
  });

  it('affiche une coche pour la langue sélectionnée', () => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: tMock,
      i18n: {
        language: 'fr',
        changeLanguage: changeLanguageMock,
      },
    });
  
    const { queryByTestId } = render(<TranslationView />);
  
    // Vérifier que l'option Français a une coche
    expect(queryByTestId('checkmark-icon-fr')).toBeTruthy();
  
    // Vérifier que l'option Anglais n'a pas de coche
    expect(queryByTestId('checkmark-icon-en')).toBeFalsy();
  });
  

  
  
});
