import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavorite,
  removeFavorite,
} from "../store/slices/favoritesSlice"; // Assurez-vous que le chemin est correct
import { RootState } from "../store";
import { Emplacement } from "../models/emplacement_model";
import API from "../utils/api";
import { useEffect } from "react";

export default function useEmplacementFavoriteViewModel() {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const userId = useSelector((state: RootState) => state.profil.userId);
  const loading = useSelector((state: RootState) => state.favorites.loading);
  const error = useSelector((state: RootState) => state.favorites.error);

  useEffect(() => {
    dispatch(fetchFavoritesStart())
    API.get(`/favoris/${userId}`).then((res) => {
        dispatch(fetchFavoritesSuccess(res.data))
    }).catch((err) => {
        dispatch(fetchFavoritesFailure())
        console.error("Erreur lors de la récupération des favoris")
    })
  },[])

  const addEmplacementFavorite = async (
    emplacement: Emplacement,
    userId: number
  ) => {
    try {
      dispatch(addFavorite(emplacement));
      // Optionnel: Appel API pour sauvegarder le favori côté backend
      await API.post(`/favoris`, {
        idUser: userId,
        idEmplacement: emplacement.idEmplacement,
      });
      console.log("Emplacement ajouté en favoris");
    } catch (err) {
      console.error("Erreur lors de l'ajout aux favoris :", err);
    }
  };
  const removeEmplacementFavorite = async (
    emplacement: Emplacement,
    userId: number
  ) => {
    try {
      dispatch(
        removeFavorite({
          id_user: userId,
          id_emplacement: emplacement.idEmplacement,
        })
      );
      // Optionnel: Appel API pour supprimer le favori côté backend
      await API.delete(
        `/favoris/${userId}/delete?idEmplacement=` + emplacement.idEmplacement,
      );
      console.log("Emplacement retiré des favoris");
    } catch (err) {
      console.error("Erreur lors de la suppression des favoris :", err);
    }
  };

  const getAllEmplacementFavorite = async (userId: string) => {
    try {
      dispatch(fetchFavoritesStart());
      const response = await API.get(`/favorites?userId=${userId}`);
      const favoriteData: Emplacement[] = response.data;
      dispatch(fetchFavoritesSuccess(favoriteData));
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Erreur lors de la récupération des favoris";
      dispatch(fetchFavoritesFailure(errorMessage));
      console.error(errorMessage);
    }
  };

  const isEmplacementFavorite = (emplacement: Emplacement, userId: number) => {
    return favorites.some(
      (favorite) =>
        favorite.idEmplacement === emplacement.idEmplacement &&
        favorite.idUser === userId
    );
  };

  return {
    addEmplacementFavorite,
    removeEmplacementFavorite,
    getAllEmplacementFavorite,
    isEmplacementFavorite,
    favorites,
    loading,
    error,
  };
}
