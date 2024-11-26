import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from './login_view';
import ProgressBarAndroid from '@react-native-community/progress-bar-android';
import Clipboard from '@react-native-clipboard/clipboard';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { ViewPropTypes, ColorPropType, EdgeInsetsPropType } from 'deprecated-react-native-prop-types';


jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name }) => `Mocked ${name} icon`,
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

describe('Login Page', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doit afficher tous les composants principaux', () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);

    expect(getByText('Connexion')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mot de passe')).toBeTruthy();
    expect(getByText('Se connecter')).toBeTruthy();
    expect(getByText('Mot de passe oublié ?')).toBeTruthy();
    expect(getByText('Pas encore de compte ? Inscrivez-vous')).toBeTruthy();
  });

  it('doit afficher une alerte si les champs sont vides lors de la connexion', async () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    const loginButton = getByText('Se connecter');
    await act(() => fireEvent.press(loginButton));

    expect(Alert.alert).toHaveBeenCalledWith('Erreur', 'Veuillez remplir tous les champs.');
  });

  it('doit afficher une alerte avec le message de bienvenue lorsque la connexion est réussie', async () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Mot de passe');
    const loginButton = getByText('Se connecter');

    await act(() => fireEvent.changeText(emailInput, 'test@example.com'));
    await act(() => fireEvent.changeText(passwordInput, 'password123'));
    await act(() => fireEvent.press(loginButton));

    expect(Alert.alert).toHaveBeenCalledWith('Connexion réussie', 'Bienvenue test@example.com');
  });

  it('doit afficher une alerte pour mot de passe oublié lorsqu\'on clique sur le lien', async () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    const forgotPasswordButton = getByText('Mot de passe oublié ?');
    await act(() => fireEvent.press(forgotPasswordButton));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Mot de passe oublié',
      'Redirection vers la page de réinitialisation...'
    );
  });

  it('doit naviguer vers la page d\'inscription lorsqu\'on clique sur le bouton "Inscrivez-vous"', async () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);

    const registerButton = getByText('Pas encore de compte ? Inscrivez-vous');
    await act(() => fireEvent.press(registerButton));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });
});
