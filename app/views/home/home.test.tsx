import React from 'react';
import { render } from '@testing-library/react-native';
import { useSelector } from 'react-redux';
import HomeView from './home_view';
import { FlatList } from 'react-native';

// Mock des composants enfants
jest.mock('../../components/homepage/homepage_banner', () => {
  const { Text } = require('react-native');
  return () => <Text>HomepageBanner</Text>;
});

jest.mock('../../components/homepage/homepage_search', () => {
  const { Text } = require('react-native');
  return () => <Text>HomepageSearch</Text>;
});

jest.mock('../../components/homepage/homepage_favorites', () => {
  const { Text } = require('react-native');
  return () => <Text>HomepageFavorites</Text>;
});

jest.mock('../../components/homepage/homepage_articles', () => {
  const { Text } = require('react-native');
  return () => <Text>HomepageArticles</Text>;
});

// Mock de react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// Test unitaire du composant HomeView
describe('HomeView', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(callback =>
      callback({ testState: 'testValue' })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Vérifier que le composant est rendu correctement
  it('doit rendre correctement le composant', () => {
    const { toJSON } = render(<HomeView />);
    expect(toJSON()).toMatchSnapshot();
  });

  // Vérifier que useSelector est appelé pour récupérer testState
  it('doit appeler useSelector pour récupérer testState', () => {
    render(<HomeView />);
    expect(useSelector).toHaveBeenCalled();
  });

  // Vérifier que tous les composants enfants sont affichés
  it('doit afficher tous les composants enfants', () => {
    const { getByText } = render(<HomeView />);
    expect(getByText('HomepageBanner')).toBeTruthy();
    expect(getByText('HomepageSearch')).toBeTruthy();
    expect(getByText('HomepageFavorites')).toBeTruthy();
    expect(getByText('HomepageArticles')).toBeTruthy();
  });

  // Vérifier que la FlatList rend le bon nombre d'éléments
  it('doit rendre le bon nombre d\'éléments dans la FlatList', () => {
    const { getByTestId } = render(<HomeView />);
    const flatList = getByTestId('home-flatlist');
    expect(flatList.props.data.length).toBe(4);
  });

  // Vérifier que le style du conteneur est correct
  it('doit avoir un conteneur avec un fond blanc', () => {
    const { getByTestId } = render(<HomeView />);
    const flatList = getByTestId('home-flatlist');
    expect(flatList.props.contentContainerStyle.backgroundColor).toBe('#fff');
  });

  // Vérifier le rendu de chaque élément via renderItem
  it('doit rendre chaque élément correctement via renderItem', () => {
    const { getAllByTestId } = render(<HomeView />);
    const items = getAllByTestId('home-item');
    expect(items.length).toBe(4);
  });

  // Vérifier le comportement en fonction de testState
  it('doit réagir correctement en fonction de testState', () => {
    (useSelector as jest.Mock).mockImplementation(callback =>
      callback({ testState: 'nouvelleValeur' })
    );
    render(<HomeView />);
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));
  });
});
