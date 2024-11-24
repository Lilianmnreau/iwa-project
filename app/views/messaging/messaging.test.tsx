import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessagesView from './messaging_view';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useMessagesViewModel from '../../viewModels/message.viewModel';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../viewModels/message.viewModel', () => jest.fn());

describe('MessagesView', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockConversations = [
    {
      id_conversation: '1',
      contactFirstName: 'John',
      contactName: 'Doe',
      contactAvatar: { uri: 'https://via.placeholder.com/50' },
      messages: [
        {
          text: 'Hello!',
          isSentByUser: false,
          status: 'remis',
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id_conversation: '2',
      contactFirstName: 'Jane',
      contactName: 'Smith',
      contactAvatar: { uri: 'https://via.placeholder.com/50' },
      messages: [
        {
          text: 'Hi there!',
          isSentByUser: true,
          status: 'vu',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ];

  beforeEach(() => {
    (useMessagesViewModel as jest.Mock).mockReturnValue({
      conversations: mockConversations,
      loading: false,
      error: null,
    });
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('doit afficher les conversations', () => {
    const { getByText } = render(<MessagesView />);

    // Vérifie que les conversations sont affichées
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Hello!')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
    expect(getByText('Hi there!')).toBeTruthy();
  });

  it('doit naviguer vers MessagesDetail lorsqu\'une conversation est cliquée', () => {
    const { getByText } = render(<MessagesView />);

    // Simule un clic sur une conversation
    fireEvent.press(getByText('John Doe'));

    // Vérifie que la navigation est appelée avec les bons paramètres
    expect(mockNavigation.navigate).toHaveBeenCalledWith('MessagesDetail', {
      conversationId: '1',
    });
  });

  it('doit afficher un message de chargement si les données sont en cours de chargement', () => {
    (useMessagesViewModel as jest.Mock).mockReturnValue({
      conversations: [],
      loading: true,
      error: null,
    });

    const { getByText } = render(<MessagesView />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('doit afficher une erreur si une erreur se produit', () => {
    (useMessagesViewModel as jest.Mock).mockReturnValue({
      conversations: [],
      loading: false,
      error: 'Une erreur s\'est produite',
    });

    const { getByText } = render(<MessagesView />);
    expect(getByText('Error: Une erreur s\'est produite')).toBeTruthy();
  });

  it('doit filtrer les conversations en fonction de la recherche', () => {
    const { getByPlaceholderText, queryByText } = render(<MessagesView />);
    const searchInput = getByPlaceholderText('Rechercher...');

    // Simule la saisie de texte dans le champ de recherche
    fireEvent.changeText(searchInput, 'Jane');

    // Vérifie que seule la conversation correspondante est affichée
    expect(queryByText('Jane Smith')).toBeTruthy();
    expect(queryByText('John Doe')).toBeFalsy();
  });

  /*
  it('doit afficher une notification si un message non lu est présent', () => {
    const { getByText } = render(<MessagesView />);

    // Vérifie que la notification est affichée pour la conversation avec un message non lu
    expect(getByText('1')).toBeTruthy();
  });
  */

  it('doit afficher un message si aucune conversation n\'est trouvée après une recherche', () => {
    const { getByPlaceholderText, getByText } = render(<MessagesView />);
    const searchInput = getByPlaceholderText('Rechercher...');

    // Simule une recherche sans résultats
    fireEvent.changeText(searchInput, 'Inconnu');

    // Vérifie qu'un message d'absence de résultats est affiché
    expect(getByText('Aucune conversation trouvée')).toBeTruthy();
  });
});
