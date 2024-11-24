import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import LocationMapView from './map_view';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Mocks
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('LocationMapView', () => {
  const mockDispatch = jest.fn();
  const mockEmplacements = [
    // Your mock data
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        emplacement: {
          emplacements: mockEmplacements,
          loading: false,
          error: null,
        },
      })
    );
  });
  it('doit demander les permissions de localisation lors du montage', async () => {
    // Mock implementations as before
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 43.6, longitude: 3.8833 },
    });
  
    render(<LocationMapView />);
  
    await waitFor(() => {
      expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
      expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
    });
  });
  

  it('doit afficher une alerte si la permission de localisation est refusée', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    render(<LocationMapView />);
    await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Permission to access location was denied');
      });
      
  });

  it('doit afficher les emplacements sur la carte', async () => {
    const { getByTestId } = render(<LocationMapView />);

    const mapView = getByTestId('map-view');
    expect(mapView).toBeTruthy();
  });
  it('doit centrer la carte sur l\'utilisateur lorsque le bouton est cliqué', async () => {
    // Mock the permissions to be granted
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
  
    // Mock the location response
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 43.6, longitude: 3.8833 },
    });
  
    const { getByTestId } = render(<LocationMapView />);
  
    // Wait for the initial location fetch to complete
    await waitFor(() => {
      expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(1);
    });
  
    // Reset the mock call counts to focus on the button press
    (Location.getCurrentPositionAsync as jest.Mock).mockClear();
  
    const locationButton = getByTestId('location-button');
    fireEvent.press(locationButton);
  
    // Wait for the location fetch triggered by the button press
    await waitFor(() => {
      expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(1);
    });
  });
  
});
