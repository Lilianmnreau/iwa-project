// reservationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reservation } from '../models/reservation.model';

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: ReservationState = {
  reservations: [],
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
} = reservationSlice.actions;

export default reservationSlice.reducer;
