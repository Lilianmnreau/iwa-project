import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { Emplacement } from "../models/emplacement_model";
import { Avis, fetchAvisStart } from "../store/slices/emplacementSlice"; // Modèle Avis défini dans le slice
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

  // Sélection des données depuis le store
  const emplacements = useSelector(
    (state: RootState) => state.emplacement.emplacements
  );
  const loading = useSelector((state: RootState) => state.emplacement.loading);
  const error = useSelector((state: RootState) => state.emplacement.error);

  // Chargement des emplacements et des avis associés
  useEffect(() => {
    const fetchEmplacementsWithAvis = async () => {
      dispatch(fetchEmplacementsStart());
      try {
        // Récupérer les emplacements
        const response = await API.get("/emplacements");
        const emplacementsData: Emplacement[] = response.data;

        dispatch(fetchAvisStart());
        // Ajouter les avis à chaque emplacement
        const emplacementsWithAvis = await Promise.all(
          emplacementsData.map(async (emplacement) => {
            try {
              const avisResponse = await API.get(
                `/avis/emplacement/${emplacement.idEmplacement}`
              );
              console.log({ avisResponse: avisResponse });
              const avis: Avis[] = avisResponse.data;
              emplacement.avis = avis;
              return { ...emplacement };
              // Associer les avis à l'emplacement
            } catch (avisError) {
              console.error(
                `Erreur lors de la récupération des avis pour l'emplacement ${emplacement.idEmplacement}:`,
                avisError
              );
              return { ...emplacement }; // Pas d'avis en cas d'erreur
            }
          })
        );
        dispatch(fetchEmplacementsSuccess(emplacementsWithAvis));
      } catch (err) {
        const errorMessage =
          (err as Error).message || "Une erreur s'est produite";
        dispatch(fetchEmplacementsFailure(errorMessage));
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: errorMessage,
        });
      }
    };

    fetchEmplacementsWithAvis();
  }, [dispatch]);

  // Ajout d'un nouvel emplacement
  const addEmplacement = async (newEmplacement: Emplacement) => {
    dispatch(addEmplacementStart());
    try {
      const response = await API.post("/emplacements", newEmplacement);
      dispatch(addEmplacementSuccess(response.data));
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Emplacement ajouté avec succès",
      });
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Une erreur s'est produite";
      dispatch(addEmplacementFailure(errorMessage));
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: errorMessage,
      });
    }
  };

  // Recherche d'un emplacement spécifique dans le state
  const getEmplacementById = (
    idEmplacement: number
  ): Emplacement | undefined => {
    const emplacement = emplacements.find(
      (e) => e.idEmplacement === idEmplacement
    );
    if (!emplacement) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: `Emplacement avec l'ID ${idEmplacement} non trouvé.`,
      });
    }
    return emplacement;
  };

  // Mise à jour d'un emplacement
  const updateEmplacement = async (
    idEmplacement: number,
    updatedFields: Partial<Emplacement>
  ) => {
    dispatch(updateEmplacementStart());
    try {
      const response = await API.put(
        `/emplacements/${idEmplacement}`,
        updatedFields
      );
      dispatch(
        updateEmplacementSuccess({
          id: idEmplacement,
          updatedEmplacement: response.data,
        })
      );
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Emplacement mis à jour",
      });
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Une erreur s'est produite";
      dispatch(updateEmplacementFailure(errorMessage));
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: errorMessage,
      });
    }
  };

  // Suppression d'un emplacement
  const deleteEmplacement = async (idEmplacement: number) => {
    dispatch(deleteEmplacementStart());
    try {
      await API.delete(`/emplacements/${idEmplacement}`);
      dispatch(deleteEmplacementSuccess(idEmplacement));
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Emplacement supprimé",
      });
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Une erreur s'est produite";
      dispatch(deleteEmplacementFailure(errorMessage));
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: errorMessage,
      });
    }
  };

  return {
    emplacements,
    loading,
    error,
    addEmplacement,
    updateEmplacement,
    deleteEmplacement,
    getEmplacementById, 
  };
};

export default useEmplacementViewModel;
