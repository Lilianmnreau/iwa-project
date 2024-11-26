import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EmplacementReservationDetails from "./emplacement_reservation_details_view";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Mock navigation et route
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

// Mock des icônes
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Ionicons: (props) => <View {...props} testID="Ionicons" />,
  };
});

// Mock Toast
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

describe("EmplacementReservationDetails", () => {
  const navigationMock = {
    goBack: jest.fn(),
  };

  const reservationMock = {
    date: "20/12/2024",
    statut: "Confirmée",
    message_voyageur: "Merci pour cette réservation!",
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigationMock);
    (useRoute as jest.Mock).mockReturnValue({
      params: { reservation: reservationMock },
    });
    jest.clearAllMocks();
  });

  it("affiche correctement les détails de la réservation", () => {
    const { getByText } = render(<EmplacementReservationDetails />);

    expect(getByText("Détails de la Réservation")).toBeTruthy();
    expect(getByText("Date:")).toBeTruthy();
    expect(getByText(reservationMock.date)).toBeTruthy();
    expect(getByText("Statut:")).toBeTruthy();
    expect(getByText(reservationMock.statut)).toBeTruthy();
    expect(getByText("Message:")).toBeTruthy();
    expect(getByText(reservationMock.message_voyageur)).toBeTruthy();
  });

  it("navigue en arrière lorsque le bouton retour est cliqué", () => {
    const { getByTestId } = render(<EmplacementReservationDetails />);

    const backButton = getByTestId("Ionicons");
    fireEvent.press(backButton);

    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it("affiche une alerte Toast si l'utilisateur tente de soumettre sans noter", () => {
    const { getByText } = render(<EmplacementReservationDetails />);

    const submitButton = getByText("Soumettre");
    fireEvent.press(submitButton);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Erreur",
      text2: "Veuillez sélectionner une note.",
    });
  });

  /*
  it("affiche une alerte Toast après soumission réussie", () => {
    const { getByTestId, getByText } = render(<EmplacementReservationDetails />);
    const rating = getByTestId("rating");
    const submitButton = getByTestId("submit-button");

    fireEvent.press(rating);
    fireEvent.press(submitButton);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Soumission réussie",
      text2: "Votre avis a été soumis avec la note de 0 étoiles.",
    });
  });
  */

  it("met à jour le commentaire lorsque l'utilisateur saisit du texte", () => {
    const { getByTestId } = render(<EmplacementReservationDetails />);
    const commentInput = getByTestId("comment-input");

    fireEvent.changeText(commentInput, "Super réservation!");
    expect(commentInput.props.value).toBe("Super réservation!");
  });

  it("limite le commentaire à 600 caractères", () => {
    const { getByTestId, getByText } = render(<EmplacementReservationDetails />);
    const commentInput = getByTestId("comment-input");
    const longComment = "a".repeat(700);

    fireEvent.changeText(commentInput, longComment);
    expect(commentInput.props.value).toBe("a".repeat(600));
    expect(getByText("600/600 caractères")).toBeTruthy();
  });
});
