import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomepageSearch from '../components/homepage/homepage_search';

test('renders correctly and navigates on focus', () => {
  const navigate = jest.fn();
  const { getByPlaceholderText } = render(<HomepageSearch navigation={{ navigate }} />);

  const input = getByPlaceholderText('Commencez vos recherches !');
  fireEvent.focus(input);

  expect(navigate).toHaveBeenCalledWith('Map_Stack', { screen: 'Map', params: { fromHomepageSearch: true } });
});