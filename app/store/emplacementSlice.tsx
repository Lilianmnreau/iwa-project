import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Emplacement } from '../models/emplacement_model';

interface EmplacementState {
  emplacements: Emplacement[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  updating: boolean;
  deleting: boolean;
}

const initialState: EmplacementState = {
  emplacements: [],
  loading: false,
  error: null,
  adding: false,
  updating: false,
  deleting: false,
};

const emplacementSlice = createSlice({
  name: 'emplacement',
  initialState,
  reducers: {
    fetchEmplacementsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEmplacementsSuccess(state, action: PayloadAction<Emplacement[]>) {
      state.emplacements = action.payload;
      state.loading = false;
    },
    fetchEmplacementsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addEmplacementStart(state) {
      state.adding = true;
      state.error = null;
    },
    addEmplacementSuccess(state, action: PayloadAction<Emplacement>) {
      state.emplacements.push(action.payload);
      state.adding = false;
    },
    addEmplacementFailure(state, action: PayloadAction<string>) {
      state.adding = false;
      state.error = action.payload;
    },
    updateEmplacementStart(state) {
      state.updating = true;
      state.error = null;
    },
    updateEmplacementSuccess(state, action: PayloadAction<{ id: string; updatedEmplacement: Emplacement }>) {
      const index = state.emplacements.findIndex(emplacement => emplacement.id_emplacement === action.payload.id);
      if (index !== -1) {
        state.emplacements[index] = action.payload.updatedEmplacement;
      }
      state.updating = false;
    },
    updateEmplacementFailure(state, action: PayloadAction<string>) {
      state.updating = false;
      state.error = action.payload;
    },
    deleteEmplacementStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteEmplacementSuccess(state, action: PayloadAction<string>) {
      state.emplacements = state.emplacements.filter(emplacement => emplacement.id_emplacement !== action.payload);
      state.deleting = false;
    },
    deleteEmplacementFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },
    resetEmplacement(state) {
      state.emplacements = [];
      state.loading = false;
      state.error = null;
      state.adding = false;
      state.updating = false;
      state.deleting = false;
    },
  },
});

export const {
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
  resetEmplacement,
} = emplacementSlice.actions;

export default emplacementSlice.reducer;