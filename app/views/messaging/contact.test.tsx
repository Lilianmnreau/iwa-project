import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactDetail from './contact_detail';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons', // Mock pour éviter les erreurs liées aux icônes
}));

describe('ContactDetail', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  const mockRoute = {
    params: {
      name: 'Doe',
      firstName: 'John',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('doit rendre correctement les détails du contact', () => {
    const { getByText } = render(
      <ContactDetail route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByText('First Name:')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();

    expect(getByText('Last Name:')).toBeTruthy();
    expect(getByText('Doe')).toBeTruthy();

    expect(getByText('Email:')).toBeTruthy();
    expect(getByText('john.doe@example.com')).toBeTruthy();

    expect(getByText('Phone Number:')).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
  });

  it('doit appeler navigation.goBack lors de l\'appui sur le bouton retour', () => {
    const { getByTestId } = render(
      <ContactDetail route={mockRoute} navigation={mockNavigation} />
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('doit afficher "N/A" pour les champs vides', () => {
    const emptyRoute = {
      params: {
        name: '',
        firstName: '',
        email: null,
        phoneNumber: undefined,
      },
    };
  
    const { getAllByText } = render(
      <ContactDetail route={emptyRoute} navigation={mockNavigation} />
    );
  
    const naElements = getAllByText('N/A');
    expect(naElements.length).toBe(2); // Vérifie que "N/A" est affiché deux fois
  });
  

  it('doit avoir des labels accessibles', () => {
    const { getByLabelText } = render(
      <ContactDetail route={mockRoute} navigation={mockNavigation} />
    );

    expect(getByLabelText('Retour')).toBeTruthy();
  });
});
