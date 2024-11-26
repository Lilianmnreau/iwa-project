import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Register from './register_view';
import { Alert } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('Register Page', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doit afficher un message d\'erreur si des champs sont vides', async () => {
    const { getByText, getByPlaceholderText } = render(<Register navigation={mockNavigation} />);

    const registerButton = getByText("S'inscrire");

    // Ne remplis pas les champs et tente de s'inscrire
    await act(() => fireEvent.press(registerButton));

    expect(Alert.alert).toHaveBeenCalledWith('Erreur', 'Veuillez remplir tous les champs.');
  });

  it('doit afficher une erreur si les mots de passe ne correspondent pas', async () => {
    const { getByText, getByPlaceholderText } = render(<Register navigation={mockNavigation} />);

    const firstNameInput = getByPlaceholderText('Prénom');
    const lastNameInput = getByPlaceholderText('Nom');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Mot de passe');
    const confirmPasswordInput = getByPlaceholderText('Confirmer le mot de passe');
    const registerButton = getByText("S'inscrire");

    // Remplis les champs avec des mots de passe différents
    await act(() => {
      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.changeText(confirmPasswordInput, 'password321');
    });

    await act(() => fireEvent.press(registerButton));

    expect(Alert.alert).toHaveBeenCalledWith('Erreur', 'Les mots de passe ne correspondent pas.');
  });

  it('doit afficher un message de succès et rediriger vers la page de connexion après inscription', async () => {
    const { getByText, getByPlaceholderText } = render(<Register navigation={mockNavigation} />);

    const firstNameInput = getByPlaceholderText('Prénom');
    const lastNameInput = getByPlaceholderText('Nom');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Mot de passe');
    const confirmPasswordInput = getByPlaceholderText('Confirmer le mot de passe');
    const registerButton = getByText("S'inscrire");

    // Remplis correctement les champs
    await act(() => {
      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.changeText(confirmPasswordInput, 'password123');
    });

    await act(() => fireEvent.press(registerButton));

    expect(Alert.alert).toHaveBeenCalledWith('Inscription réussie', 'Bienvenue John');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('doit rediriger vers la page de connexion lorsqu\'on clique sur le lien "Déjà un compte ? Connectez-vous"', async () => {
    const { getByText } = render(<Register navigation={mockNavigation} />);

    const loginRedirectButton = getByText('Déjà un compte ? Connectez-vous');

    await act(() => fireEvent.press(loginRedirectButton));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});
