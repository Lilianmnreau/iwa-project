import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddArticleView from "./add_article_view";
import useArticleViewModel from "../../viewModels/article_viewModel";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
/*
jest.mock("../../viewModels/article_viewModel", () => jest.fn());
jest.mock("react-native-toast-message", () => ({
  Toast: {
    show: jest.fn(),
  },
}));
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock("react-native-uuid", () => ({
  v4: jest.fn(),
}));

describe("AddArticleView", () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const mockViewModel = {
    addNewArticle: jest.fn(),
  };

  beforeEach(() => {
    (useArticleViewModel as jest.Mock).mockReturnValue(mockViewModel);
    (uuid.v4 as jest.Mock).mockReturnValue("test-uuid");
    jest.clearAllMocks();
  });

  it("doit afficher les composants principaux", () => {
    const { getByPlaceholderText, getByText } = render(
      <AddArticleView navigation={mockNavigation} />
    );

    // Vérifie les champs principaux
    expect(getByPlaceholderText("Titre de l'article")).toBeTruthy();
    expect(getByPlaceholderText("Entrez la description ici...")).toBeTruthy();
    expect(getByText("Ajouter des Images")).toBeTruthy();
    expect(getByText("Soumettre")).toBeTruthy();
  });

  it("doit afficher un message d'erreur si les champs obligatoires sont vides", () => {
    const { getByText } = render(<AddArticleView navigation={mockNavigation} />);

    // Simule un clic sur "Soumettre"
    fireEvent.press(getByText("Soumettre"));

    // Vérifie que Toast affiche une erreur
    expect(Toast.show).toHaveBeenCalledWith({
      type: "error",
      text1: "Veuillez remplir les champs obligatoires",
      text2: "Le titre et la description sont obligatoires.",
    });
    expect(mockViewModel.addNewArticle).not.toHaveBeenCalled();
  });

  it("doit ajouter un article avec des champs valides", () => {
    const { getByPlaceholderText, getByText } = render(
      <AddArticleView navigation={mockNavigation} />
    );

    // Remplir les champs
    fireEvent.changeText(
      getByPlaceholderText("Titre de l'article"),
      "Test Titre"
    );
    fireEvent.changeText(
      getByPlaceholderText("Entrez la description ici..."),
      "Test Description"
    );

    // Simule un clic sur "Soumettre"
    fireEvent.press(getByText("Soumettre"));

    // Vérifie que l'article a été ajouté
    expect(mockViewModel.addNewArticle).toHaveBeenCalledWith({
      id_article: "test-uuid",
      titre: "Test Titre",
      description: "Test Description",
      date: expect.any(String),
      image: "test",
    });

    // Vérifie que Toast affiche un succès
    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Article bien ajouté !",
    });

    // Vérifie que la navigation a été appelée
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
  });

  it("doit ajouter des images via le sélecteur d'images", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "image-uri-1" }, { uri: "image-uri-2" }],
    });

    const { getByText, getByTestId } = render(
      <AddArticleView navigation={mockNavigation} />
    );

    // Simule un clic sur "Ajouter des Images"
    fireEvent.press(getByText("Ajouter des Images"));

    // Attendez que le sélecteur d'image soit traité
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Vérifiez que les images ont été ajoutées
    expect(getByTestId("image-0")).toBeTruthy();
    expect(getByTestId("image-1")).toBeTruthy();
  });

  it("doit permettre de supprimer une image", async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValueOnce({
      canceled: false,
      assets: [{ uri: "image-uri-1" }],
    });

    const { getByText, getByTestId, queryByTestId } = render(
      <AddArticleView navigation={mockNavigation} />
    );

    // Simule un clic sur "Ajouter des Images"
    fireEvent.press(getByText("Ajouter des Images"));

    // Attendez que le sélecteur d'image soit traité
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Vérifiez que l'image est ajoutée
    expect(getByTestId("image-0")).toBeTruthy();

    // Supprimez l'image
    fireEvent.press(getByTestId("remove-image-0"));

    // Vérifiez que l'image a été supprimée
    expect(queryByTestId("image-0")).toBeNull();
  });

  it("doit revenir à la page précédente lorsqu'on clique sur le bouton retour", () => {
    const { getByTestId } = render(<AddArticleView navigation={mockNavigation} />);
    const backButton = getByTestId("back-button");

    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
*/
