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
} from '../store/reservationSlice';

const useReservationViewModel = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state: RootState) => state.reservation.reservations);
  const loading = useSelector((state: RootState) => state.reservation.loading);
  const adding = useSelector((state: RootState) => state.reservation.adding);
  const updating = useSelector((state: RootState) => state.reservation.updating);
  const deleting = useSelector((state: RootState) => state.reservation.deleting);
  const error = useSelector((state: RootState) => state.reservation.error);
  const apiBaseUrl = process.env.REACT_APP_RESERVATION_API_BASE_URL;

  useEffect(() => {
    const fetchReservations = async () => {
      dispatch(fetchReservationsStart());
      try {
        const response = await fetch(`${apiBaseUrl}/reservations`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Reservation[] = await response.json();
        dispatch(fetchReservationsSuccess(data));
      } catch (error) {
        dispatch(fetchReservationsFailure((error as Error).message));
      }
    };

    fetchReservations();
  }, [dispatch, apiBaseUrl]);

  const addReservation = async (newReservation: Reservation) => {
    dispatch(addReservationStart());
    try {
      const response = await fetch(`${apiBaseUrl}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const addedReservation = await response.json();
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

  const updateReservation = async (id_reservation: string, updatedReservation: Partial<Reservation>) => {
    dispatch(updateReservationStart());
    try {
      const response = await fetch(`${apiBaseUrl}/reservations/${id_reservation}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReservation),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updated = await response.json();
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

  const deleteReservation = async (id_reservation: string) => {
    dispatch(deleteReservationStart());
    try {
      const response = await fetch(`${apiBaseUrl}/reservations/${id_reservation}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
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

  const getReservationsByUser = (id_user: string) => {
    return reservations.filter(reservation => reservation.id_user === id_user);
  };

  const getReservationById = (id_reservation: string) => {
    return reservations.find(reservation => reservation.id_reservation === id_reservation) || null;
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
