// reservationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reservation } from '../../models/reservation.model';

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: ReservationState = {
  reservations: [  {
    idReservation: 1,
    idUser: 3,
    dateDebut: "2024-12-01",
    dateFin: "2024-12-05",
    statut: "confirmée",
    messageVoyageur: "Tout est parfait, j'ai hâte d'y être !",
    idEmplacement: 101
  },
  {
    idReservation: 2,
    idUser: 5,
    dateDebut: "2024-12-10",
    dateFin: "2024-12-15",
    statut: "en attente",
    messageVoyageur: "Je suis impatient de découvrir cet endroit.",
    idEmplacement: 102
  },
  {
    idReservation: 3,
    idUser: 7,
    dateDebut: "2024-12-20",
    dateFin: "2024-12-25",
    statut: "confirmée",
    messageVoyageur: "Merci pour cette opportunité, j'espère que tout se passe bien.",
    idEmplacement: 103
  },
  {
    idReservation: 4,
    idUser: 9,
    dateDebut: "2024-11-30",
    dateFin: "2024-12-03",
    statut: "annulée",
    messageVoyageur: "Désolé, j'ai dû annuler pour des raisons personnelles.",
    idEmplacement: 104
  },
  {
    idReservation: 5,
    idUser: 2,
    dateDebut: "2024-12-05",
    dateFin: "2024-12-07",
    statut: "confirmée",
    messageVoyageur: "Je suis très enthousiaste, merci pour votre accueil.",
    idEmplacement: 105
  },
  {
    idReservation: 6,
    idUser: 4,
    dateDebut: "2024-12-12",
    dateFin: "2024-12-14",
    statut: "confirmée",
    messageVoyageur: "Tout est bien réservé, je vous contacte pour plus d'infos si besoin.",
    idEmplacement: 106
  },
  {
    idReservation: 7,
    idUser: 1,
    dateDebut: "2024-12-18",
    dateFin: "2024-12-22",
    statut: "en attente",
    messageVoyageur: "Cela semble être une excellente expérience, j'ai hâte d'y être !",
    idEmplacement: 107
  }],
  loading: false,
  error: null,
  adding: false,
  updating: false,
  deleting: false,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    fetchReservationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReservationsSuccess(state, action: PayloadAction<Reservation[]>) {
      state.reservations = action.payload;
      state.loading = false;
    },
    fetchReservationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addReservationStart(state) {
      state.adding = true;
      state.error = null;
    },
    addReservationSuccess(state, action: PayloadAction<Reservation>) {
      state.reservations.push(action.payload);
      state.adding = false;
    },
    addReservationFailure(state, action: PayloadAction<string>) {
      state.adding = false;
      state.error = action.payload;
    },
    updateReservationStart(state) {
      state.updating = true;
      state.error = null;
    },
    updateReservationSuccess(state, action: PayloadAction<{ id: string; updatedReservation: Reservation }>) {
      const index = state.reservations.findIndex(reservation => reservation.id_reservation === action.payload.id);
      if (index !== -1) {
        state.reservations[index] = action.payload.updatedReservation;
      }
      state.updating = false;
    },
    updateReservationFailure(state, action: PayloadAction<string>) {
      state.updating = false;
      state.error = action.payload;
    },
    deleteReservationStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteReservationSuccess(state, action: PayloadAction<string>) {
      state.reservations = state.reservations.filter(reservation => reservation.id_reservation !== action.payload);
      state.deleting = false;
    },
    deleteReservationFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },
    deleteReservation(state, action: PayloadAction<number>) {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.idReservation !== action.payload
      );
    },
    addReservation(state, action: PayloadAction<Reservation>) {
      state.reservations.push(action.payload);
    },
  },
});

export const {
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
  deleteReservation,
  addReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
