import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AllEmplacementReservation from "./AllEmplacementReservation";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../../components/reservation/emplacement_reservation_cell", () => {
  return ({ reservation }: { reservation: any }) => {
    const { id, date, statut, message_voyageur } = reservation;
    return (
      <View testID={`reservation-${id}`}>
        <Text>{date}</Text>
        <Text>{statut}</Text>
        <Text>{message_voyageur}</Text>
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
    const { getByText, getByTestId } = render(<AllEmplacementReservation />);

    expect(getByText("Toutes les réservations")).toBeTruthy();
    expect(getByTestId("reservation-1")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
    expect(getByTestId("reservation-3")).toBeTruthy();
  });

  it("navigue en arrière lorsque le bouton retour est cliqué", () => {
    const { getByRole } = render(<AllEmplacementReservation />);
    const backButton = getByRole("button");

    fireEvent.press(backButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it("applique le filtre des réservations les plus récentes", () => {
    const { getByText, getByTestId } = render(<AllEmplacementReservation />);
    const recentButton = getByText("Les plus récentes");

    fireEvent.press(recentButton);

    // Vérifie que la réservation la plus récente est affichée en premier
    expect(getByTestId("reservation-1")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
    expect(getByTestId("reservation-3")).toBeTruthy();
  });

  it("applique le filtre des réservations les plus anciennes", () => {
    const { getByText, getByTestId } = render(<AllEmplacementReservation />);
    const oldestButton = getByText("Les plus anciennes");

    fireEvent.press(oldestButton);

    // Vérifie que la réservation la plus ancienne est affichée en premier
    expect(getByTestId("reservation-3")).toBeTruthy();
    expect(getByTestId("reservation-2")).toBeTruthy();
    expect(getByTestId("reservation-1")).toBeTruthy();
  });
});
