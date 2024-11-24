import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddEmplacement from './add_emplacement_view';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message'; // Importer Toast correctement
import { useNavigation } from '@react-navigation/native';
import useEmplacementViewModel from '../../viewModels/emplacement_viewModel';

// Mocks
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../viewModels/emplacement_viewModel', () => jest.fn());

// Mettre à jour le mock de Toast
jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: {
    show: jest.fn(),
  },
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock des composants enfants
jest.mock('../../components/add_emplacement/add_emplacement_map', () => () => {
  return <></>;
});

jest.mock('../../components/add_emplacement/add_emplacement_facilities', () => () => {
  return <></>;
});

jest.mock('../../components/add_emplacement/add_emplacement_description', () => () => {
  return <></>;
});

jest.mock('../../components/add_emplacement/add_emplacement_price', () => () => {
  return <></>;
});

jest.mock('../../components/add_emplacement/add_emplacement_add_photo', () => () => {
  return <></>;
});

describe('AddEmplacement', () => {
  let navigationMock;
  let addEmplacementMock;
  let dispatchMock;

  beforeEach(() => {
    navigationMock = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    (useNavigation as jest.Mock).mockReturnValue(navigationMock);

    addEmplacementMock = jest.fn();
    (useEmplacementViewModel as jest.Mock).mockReturnValue({
      addEmplacement: addEmplacementMock,
    });

    dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('se rend correctement', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        emplacement: {
          emplacements: [
            {
              id_emplacement: '1',
              coordonnees: { latitude: 0, longitude: 0 },
              caracteristique: 'Caractéristique',
              tarif: 100,
              photos: [],
              equipement: [],
            },
          ],
        },
      })
    );

    const { getByText } = render(<AddEmplacement navigation={navigationMock} />);

    expect(getByText('Ajouter un emplacement')).toBeTruthy();
  });


  it('affiche une erreur si des champs obligatoires sont manquants', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        emplacement: {
          emplacements: [
            {
              id_emplacement: '1',
              coordonnees: null, // Champ manquant
              caracteristique: null, // Champ manquant
              tarif: null, // Champ manquant
              photos: [], // Champ manquant
              equipement: [],
            },
          ],
        },
      })
    );

    const { getByText } = render(<AddEmplacement navigation={navigationMock} />);

    const addButton = getByText("Ajouter l'emplacement");
    fireEvent.press(addButton);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Erreur',
      text2: 'Veuillez remplir tous les champs obligatoires.',
    });

    expect(addEmplacementMock).not.toHaveBeenCalled();
    expect(navigationMock.navigate).not.toHaveBeenCalled();
  });

  it('ajoute un emplacement correctement lorsque tous les champs sont remplis', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        emplacement: {
          emplacements: [
            {
              id_emplacement: '1',
              coordonnees: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              caracteristique: 'Caractéristique',
              tarif: 100,
              photos: ['photo1.jpg'],
              equipement: ['Wi-Fi'],
              disponible: true,
              moyenneAvis: 0,
            },
          ],
        },
      })
    );
  
    const { getByText } = render(<AddEmplacement navigation={navigationMock} />);
  
    const addButton = getByText("Ajouter l'emplacement");
    fireEvent.press(addButton);
  
    expect(addEmplacementMock).toHaveBeenCalledWith({
      id_user: '1',
      id_emplacement: '1',
      localisation: '',
      caracteristique: 'Caractéristique',
      equipement: ['Wi-Fi'],
      tarif: 100,
      disponible: true,
      moyenneAvis: 0,
      photos: ['photo1.jpg'],
      coordonnees: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Emplacement ajouté avec succès !',
    });
  
    expect(navigationMock.navigate).toHaveBeenCalledWith('Profile');
  });
});  