import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
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
} from '../store/emplacementSlice';
import { Emplacement } from '../models/emplacement_model';

const useEmplacementViewModel = () => {
  const dispatch = useDispatch();
  const emplacements = useSelector((state: RootState) => state.emplacement.emplacements);
  const loading = useSelector((state: RootState) => state.emplacement.loading);
  const error = useSelector((state: RootState) => state.emplacement.error);
  const apiBaseUrl = process.env.EMPLACEMENT_MICROSERVICE_URL;

  useEffect(() => {
    const fetchEmplacements = async () => {
      dispatch(fetchEmplacementsStart());
      try {
        const response = await fetch(`${apiBaseUrl}/emplacements`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Emplacement[] = await response.json();
        dispatch(fetchEmplacementsSuccess(data));
      } catch (error) {
        dispatch(fetchEmplacementsFailure((error as Error).message));
      }
    };

    fetchEmplacements();
  }, [dispatch, apiBaseUrl]);

  const getEmplacementById = (id_emplacement: string) => {
    return emplacements.find(emplacement => emplacement.id_emplacement === id_emplacement) || null;
  };

  const getEmplacementsByUserId = (id_user: string) => {
    return emplacements.filter(emplacement => emplacement.id_user === id_user);
  };

  const deleteEmplacement = async (id_emplacement: string) => {
    dispatch(deleteEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/emplacements/${id_emplacement}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteEmplacementSuccess(id_emplacement));
    } catch (error) {
      dispatch(deleteEmplacementFailure((error as Error).message));
    }
  };

  const addEmplacement = async (newEmplacement: Emplacement) => {
    dispatch(addEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/emplacements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmplacement),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedEmplacement = await response.json();
      dispatch(addEmplacementSuccess(addedEmplacement));
    } catch (error) {
      dispatch(addEmplacementFailure((error as Error).message));
    }
  };

  const updateEmplacement = async (id_emplacement: string, updatedEmplacement: Partial<Emplacement>) => {
    dispatch(updateEmplacementStart());
    try {
      const response = await fetch(`${apiBaseUrl}/emplacements/${id_emplacement}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmplacement),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updated = await response.json();
      dispatch(updateEmplacementSuccess({ id: id_emplacement, updatedEmplacement: updated }));
    } catch (error) {
      dispatch(updateEmplacementFailure((error as Error).message));
    }
  };

  return {
    emplacements,
    loading,
    error,
    getEmplacementById,
    getEmplacementsByUserId,
    deleteEmplacement,
    updateEmplacement,
    addEmplacement,
  };
};

export default useEmplacementViewModel;