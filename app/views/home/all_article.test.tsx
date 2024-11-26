import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArticlesPage from './all_article_view';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

import { Text } from 'react-native';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: jest.fn().mockImplementation(({ name }) => `Mocked ${name} icon`),
  }));
  

describe('ArticlesPage', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const mockArticles = [
    {
      id_article: '1',
      titre: 'Article 1',
      extrait_description: "Ceci est un extrait de l'article 1",
      image: 'https://via.placeholder.com/100',
    },
    {
      id_article: '2',
      titre: 'Article 2',
      extrait_description: "Ceci est un extrait de l'article 2",
      image: 'https://via.placeholder.com/100',
    },
  ];

  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue(mockArticles);
    jest.clearAllMocks();
  });

  it('doit afficher les composants principaux', () => {
    const { getByText, getByTestId } = render(
      <ArticlesPage navigation={mockNavigation} />
    );

    // Vérifie que le titre et le bouton retour sont présents
    expect(getByText('Tous les Articles')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('doit afficher les articles depuis le store', () => {
    const { getByText } = render(<ArticlesPage navigation={mockNavigation} />);

    // Vérifie que les articles sont affichés
    expect(getByText('Article 1')).toBeTruthy();
    expect(getByText("Ceci est un extrait de l'article 1")).toBeTruthy();
    expect(getByText('Article 2')).toBeTruthy();
    expect(getByText("Ceci est un extrait de l'article 2")).toBeTruthy();
  });

  it("doit naviguer vers ArticleDetails lorsqu'un article est cliqué", () => {
    const { getByText } = render(<ArticlesPage navigation={mockNavigation} />);

    // Simule un clic sur le premier article
    fireEvent.press(getByText('Article 1'));

    // Vérifie que la navigation a été appelée avec les bons paramètres
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ArticleDetails', {
      article: mockArticles[0],
    });
  });

  it("doit revenir à la page précédente lorsqu'on clique sur le bouton retour", () => {
    const { getByTestId } = render(<ArticlesPage navigation={mockNavigation} />);

    // Simule un clic sur le bouton retour
    fireEvent.press(getByTestId('back-button'));

    // Vérifie que goBack a été appelé
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
