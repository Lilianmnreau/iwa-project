import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { Emplacement } from "../models/emplacement_model";
import { RootState } from "../store";
import API from "../utils/api";
import {
  fetchEmplacementsStart,
  fetchEmplacementsSuccess,
  fetchEmplacementsFailure,
  addEmplacementStart,
  addEmplacementSuccess,
  addEmplacementFailure,
  updateEmplacementStart,
  updateEmplacementSuccess,
  updateEmplacementFailure,
  deleteEmplacementStart,
  deleteEmplacementSuccess,
  deleteEmplacementFailure,
} from "../store/slices/emplacementSlice";

const useEmplacementViewModel = () => {
  const dispatch = useDispatch();
  const emplacements = useSelector((state: RootState) => state.emplacement.emplacements);
  const loading = useSelector((state: RootState) => state.emplacement.loading);
  const error = useSelector((state: RootState) => state.emplacement.error);

  useEffect(() => {
    dispatch(fetchEmplacementsStart());
    API.get(`/emplacements`)
      .then((response) => {
        dispatch(fetchEmplacementsSuccess(response.data));
      })
      .catch((error) => {
        console.error("Failed to fetch emplacements:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(fetchEmplacementsFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de la récupération des emplacements",
          text2: errorMessage,
        });
      });
  }, [dispatch]);

  const addEmplacement = async (newEmplacement: Emplacement) => {
    dispatch(addEmplacementStart());
    API.post(`/api/emplacements`, newEmplacement)
      .then((response) => {
        dispatch(addEmplacementSuccess(response.data));
        Toast.show({
          type: "success",
          text1: "Emplacement ajouté avec succès",
        });
      })
      .catch((error) => {
        console.error("Failed to add emplacement:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(addEmplacementFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de l'ajout de l'emplacement",
          text2: errorMessage,
        });
      });
  };

  const updateEmplacement = async (idEmplacement: string, updatedFields: Partial<Emplacement>) => {
    dispatch(updateEmplacementStart());
    API.put(`/api/emplacements/${idEmplacement}`, updatedFields)
      .then((response) => {
        dispatch(updateEmplacementSuccess({ id: idEmplacement, updatedEmplacement: response.data }));
        Toast.show({
          type: "success",
          text1: "Emplacement mis à jour avec succès",
        });
      })
      .catch((error) => {
        console.error("Failed to update emplacement:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(updateEmplacementFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de la mise à jour de l'emplacement",
          text2: errorMessage,
        });
      });
  };

  const deleteEmplacement = async (idEmplacement: string) => {
    dispatch(deleteEmplacementStart());
    API.delete(`/api/emplacements/${idEmplacement}`)
      .then(() => {
        dispatch(deleteEmplacementSuccess(idEmplacement));
        Toast.show({
          type: "success",
          text1: "Emplacement supprimé avec succès",
        });
      })
      .catch((error) => {
        console.error("Failed to delete emplacement:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        dispatch(deleteEmplacementFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Échec de la suppression de l'emplacement",
          text2: errorMessage,
        });
      });
  };

  return {
    emplacements,
    loading,
    error,
    addEmplacement,
    updateEmplacement,
    deleteEmplacement,
  };
};

export default useEmplacementViewModel;
