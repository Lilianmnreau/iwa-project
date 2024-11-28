import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Reservation } from '../models/reservation.model';
import { RootState } from '../store';
import {
  fetchReservationsStart,
  fetchReservationsSuccess,
  fetchReservationsFailure,
  addReservationStart,
  addReservationSuccess,
  addReservationFailure,
  updateReservationStart,
  updateReservationSuccess,
  updateReservationFailure,
  deleteReservationStart,
  deleteReservationSuccess,
  deleteReservationFailure,
} from '../store/slices/reservationSlice';
import API from '../utils/api';

const useReservationViewModel = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.reservations);
  const loading = useSelector((state: RootState) => state.reservation.loading);
  const adding = useSelector((state: RootState) => state.reservation.adding);
  const updating = useSelector((state: RootState) => state.reservation.updating);
  const deleting = useSelector((state: RootState) => state.reservation.deleting);
  const error = useSelector((state: RootState) => state.reservation.error);
  const apiBaseUrl = process.env.REACT_APP_RESERVATION_API_BASE_URL;

  // Fonction pour ajouter une réservation
  const addReservation = async (newReservation: Reservation) => {
    dispatch(addReservationStart());
    try {
      const response = await API.post("/reservations", newReservation);  // Utilisation d'API pour envoyer la requête
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const addedReservation = response.data;
      dispatch(addReservationSuccess(addedReservation));
    } catch (error) {
      console.error('Failed to add reservation:', error);
      dispatch(addReservationFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'ajout de la réservation',
        text2: (error as Error).message,
      });
    }
  };

  // Fonction pour mettre à jour une réservation
  const updateReservation = async (id_reservation: string, updatedReservation: Partial<Reservation>) => {
    dispatch(updateReservationStart());
    try {
      const response = await API.put(`/reservations/${id_reservation}`, updatedReservation);  // Utilisation d'API pour envoyer la requête
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const updated = response.data;
      dispatch(updateReservationSuccess({ id: id_reservation, updatedReservation: updated }));
    } catch (error) {
      console.error('Failed to update reservation:', error);
      dispatch(updateReservationFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la mise à jour de la réservation',
        text2: (error as Error).message,
      });
    }
  };

  // Fonction pour supprimer une réservation
  const deleteReservation = async (id_reservation: string) => {
    dispatch(deleteReservationStart());
    try {
      const response = await API.delete(`/reservations/${id_reservation}`);  // Utilisation d'API pour envoyer la requête
      if (!response) {
        throw new Error('Network response was not ok');
      }
      dispatch(deleteReservationSuccess(id_reservation));
    } catch (error) {
      console.error('Failed to delete reservation:', error);
      dispatch(deleteReservationFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression de la réservation',
        text2: (error as Error).message,
      });
    }
  };

  // Fonction pour récupérer les réservations d'un utilisateur
  const getReservationsByUser = async (idUser: number): Promise<Reservation[] | null> => {
    try {
      dispatch(fetchReservationsStart());
      const response = await API.get(`/reservations/user/${idUser}`);  // Utilisation d'API pour envoyer la requête
      const data: Reservation[] = response.data;
      console.log("idUser", idUser);
      dispatch(fetchReservationsSuccess(data));
      return data; // Retourner les données si la requête fonctionne
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      dispatch(fetchReservationsFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la récupération des réservations',
        text2: (error as Error).message,
      });
      return []; // Retourner une liste vide en cas d'erreur
    }
  };

  const getReservationById = async (id_reservation: number) => {
    dispatch(fetchReservationsStart());
    try {
      const response = await API.get(`/reservations/${id_reservation}`);
      if (response.status === 200) {
        const reservation = response.data;
        dispatch(fetchReservationsSuccess(reservation)); // Sauvegarder dans Redux
        return reservation;
      } else {
        throw new Error("La réservation n'a pas été trouvée.");
      }
    } catch (error) {
      console.error('Échec de la récupération de la réservation par ID:', error);
      dispatch(fetchReservationsFailure((error as Error).message)); // Gérer l'erreur dans Redux
      Toast.show({
        type: 'error',
        text1: 'Échec de la récupération de la réservation',
        text2: (error as Error).message,
      });
      return null;
    }
  };
  

  return {
    reservations,
    loading,
    adding,
    updating,
    deleting,
    error,
    addReservation,
    updateReservation,
    deleteReservation,
    getReservationsByUser,
    getReservationById,
  };
};

export default useReservationViewModel;
