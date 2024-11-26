import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArticleDetails from './article_details_view';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ArticleDetails', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const articleMock = {
    titre: 'Test Article',
    image: 'https://via.placeholder.com/150',
    date: '2024-11-23',
    description: 'This is a test description for the article.',
  };

  it('doit afficher les informations de l\'article', () => {
    const { getByText, getByTestId } = render(
      <ArticleDetails route={{ params: { article: articleMock } }} />
    );

    // Vérifie l'affichage du titre
    expect(getByText('Test Article')).toBeTruthy();

    // Vérifie l'affichage de la date
    expect(getByText(`Publié le ${articleMock.date}`)).toBeTruthy();

    // Vérifie l'affichage de la description
    expect(getByText('This is a test description for the article.')).toBeTruthy();
  });

  it('doit appeler navigation.goBack lors de l\'appui sur le bouton retour', () => {
    const { getByTestId } = render(
      <ArticleDetails route={{ params: { article: articleMock } }} />
    );

    // Simule un clic sur le bouton de retour
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);

    // Vérifie que `goBack` a été appelé
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
