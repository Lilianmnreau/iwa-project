import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfilEmplacementDetails from "./profil_emplacement_details_view";
import { useNavigation } from "@react-navigation/native";

// Mock de useNavigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock spécifique des icônes utilisées
jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props) => <View {...props} />;
});

jest.mock("@expo/vector-icons/Ionicons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return (props) => <View {...props} />;
});

// Données mockées
const emplacementMock = {
  id_emplacement: "123",
  id_user: "456",
  localisation: "Paris",
  caracteristique: "Belle vue",
  equipement: ["Wi-Fi", "Douche"],
  tarif: 100,
  disponible: true,
  moyenneAvis: 4.5,
  photos: ["photo1.jpg", "photo2.jpg"],
  coordonnees: {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

const routeMock = {
  params: { emplacement: emplacementMock },
};

describe("ProfilEmplacementDetails", () => {
  const navigationMock = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigationMock);
    jest.clearAllMocks();
  });

  it("affiche les détails de l'emplacement correctement", () => {
    const { getByText, queryByText } = render(
      <ProfilEmplacementDetails route={routeMock} />
    );

    expect(getByText("Détails de l'Emplacement")).toBeTruthy();
    expect(getByText("Localisation: Paris")).toBeTruthy();
    expect(getByText("Caractéristiques: Belle vue")).toBeTruthy();
    expect(getByText("Équipement: Wi-Fi, Douche")).toBeTruthy();
    expect(getByText("Tarif: 100 €")).toBeTruthy();
    expect(getByText("Disponible: Oui")).toBeTruthy();
    expect(getByText("Moyenne d'Avis: 4.5")).toBeTruthy();
  });

  it("navigue en arrière lorsque le bouton retour est cliqué", () => {
    const { getByTestId } = render(
      <ProfilEmplacementDetails route={routeMock} />
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it("passe en mode édition et permet de sauvegarder les modifications", () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <ProfilEmplacementDetails route={routeMock} />
    );

    // Activer le mode édition
    const editButton = getByTestId("edit-button");
    fireEvent.press(editButton);

    // Modifier le champ "Localisation"
    const localisationInput = getByPlaceholderText("Localisation");
    fireEvent.changeText(localisationInput, "New York");

    // Sauvegarder
    const saveButton = getByText("Sauvegarder");
    fireEvent.press(saveButton);

    // Vérifier que la nouvelle localisation est affichée
    expect(getByText("Localisation: New York")).toBeTruthy();
  });
  

  it("affiche les avis correctement", () => {
    const { getByText } = render(
      <ProfilEmplacementDetails route={routeMock} />
    );

    expect(getByText("Avis")).toBeTruthy();
    expect(getByText("Super emplacement, calme et bien équipé.")).toBeTruthy();
  });

  it("affiche les réservations correctement", () => {
    const { getByText } = render(
      <ProfilEmplacementDetails route={routeMock} />
    );

    expect(getByText("Réservations")).toBeTruthy();
    expect(getByText("12/08/2024 - 15/08/2024")).toBeTruthy();
  });
});
