import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AllEmplacementReservation from "./all_emplacement_reservations_view";
import { useNavigation } from "@react-navigation/native";

// Mock pour la navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock du composant EmplacementReservationCell
jest.mock("../../../components/reservation/emplacement_reservation_cell", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return function MockEmplacementReservationCell({ reservation }: { reservation: any }) {
    return (
      <View testID={`reservation-${reservation.id}`}>
        <Text>{reservation.date}</Text>
        <Text>{reservation.statut}</Text>
        <Text>{reservation.message_voyageur}</Text>
      </View>
    );
  };
});

describe("AllEmplacementReservation", () => {
  const navigationMock = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigationMock);
    jest.clearAllMocks();
  });

  it("affiche correctement toutes les réservations", () => {
    const { getByTestId } = render(<AllEmplacementReservation />);

    expect(getByTestId("reservation-1")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
    expect(getByTestId("reservation-3")).toBeTruthy();
  });

  it("navigue en arrière lorsque le bouton retour est cliqué", () => {
    const { getByTestId } = render(<AllEmplacementReservation />);
    const backButton = getByTestId("back-button");

    fireEvent.press(backButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it("applique le filtre des réservations les plus récentes", () => {
    const { getByTestId } = render(<AllEmplacementReservation />);
    const recentFilter = getByTestId("recent-filter");

    fireEvent.press(recentFilter);

    expect(getByTestId("reservation-1")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
    expect(getByTestId("reservation-3")).toBeTruthy();
  });

  it("applique le filtre des réservations les plus anciennes", () => {
    const { getByTestId } = render(<AllEmplacementReservation />);
    const oldestFilter = getByTestId("oldest-filter");

    fireEvent.press(oldestFilter);

    expect(getByTestId("reservation-3")).toBeTruthy();
    expect(getByTestId("reservation-1")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
  });
});
