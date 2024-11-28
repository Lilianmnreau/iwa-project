import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Emplacement } from "../../models/emplacement_model";

interface Avis {
  idAvis: number;
  note: number;
  commentaire: string;
  date: string;
  idEmplacement: number;
}

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
  name: "emplacement",
  initialState,
  reducers: {
    // Fetch emplacements
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

    // Fetch avis
    fetchAvisStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAvisSuccess(state, action: PayloadAction<Avis[]>) {
      state.avis = action.payload;
      state.loading = false;
    },
    fetchAvisFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add emplacement
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

    // Update emplacement
    updateEmplacementStart(state) {
      state.updating = true;
      state.error = null;
    },
    updateEmplacementSuccess(
      state,
      action: PayloadAction<{ id: number; updatedEmplacement: Emplacement }>
    ) {
      const index = state.emplacements.findIndex(
        (emplacement) => emplacement.idEmplacement === action.payload.id
      );
      if (index !== -1) {
        state.emplacements[index] = {
          ...state.emplacements[index],
          ...action.payload.updatedEmplacement,
        };
      }
      state.updating = false;
    },
    updateEmplacementFailure(state, action: PayloadAction<string>) {
      state.updating = false;
      state.error = action.payload;
    },

    // Delete emplacement
    deleteEmplacementStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteEmplacementSuccess(state, action: PayloadAction<number>) {
      state.emplacements = state.emplacements.filter(
        (emplacement) => emplacement.idEmplacement !== action.payload
      );
      state.deleting = false;
    },
    deleteEmplacementFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },

    // Add avis
    addAvisStart(state) {
      state.adding = true;
      state.error = null;
    },
    addAvisSuccess(state, action: PayloadAction<Avis>) {
      state.avis.push(action.payload);
      state.adding = false;
    },
    addAvisFailure(state, action: PayloadAction<string>) {
      state.adding = false;
      state.error = action.payload;
    },

    // Update avis
    updateAvisStart(state) {
      state.updating = true;
      state.error = null;
    },
    updateAvisSuccess(state, action: PayloadAction<Avis>) {
      const index = state.avis.findIndex(
        (avis) => avis.idAvis === action.payload.idAvis
      );
      if (index !== -1) {
        state.avis[index] = action.payload;
      }
      state.updating = false;
    },
    updateAvisFailure(state, action: PayloadAction<string>) {
      state.updating = false;
      state.error = action.payload;
    },

    // Delete avis
    deleteAvisStart(state) {
      state.deleting = true;
      state.error = null;
    },
    deleteAvisSuccess(state, action: PayloadAction<number>) {
      state.avis = state.avis.filter((avis) => avis.idAvis !== action.payload);
      state.deleting = false;
    },
    deleteAvisFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },

    // Reset
    resetEmplacementState(state) {
      state.emplacements = [];
      state.avis = [];
      state.loading = false;
      state.error = null;
      state.adding = false;
      state.updating = false;
      state.deleting = false;
    },

    resetError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchEmplacementsStart,
  fetchEmplacementsSuccess,
  fetchEmplacementsFailure,
  fetchAvisStart,
  fetchAvisSuccess,
  fetchAvisFailure,
  addEmplacementStart,
  addEmplacementSuccess,
  addEmplacementFailure,
  updateEmplacementStart,
  updateEmplacementSuccess,
  updateEmplacementFailure,
  deleteEmplacementStart,
  deleteEmplacementSuccess,
  deleteEmplacementFailure,
  addAvisStart,
  addAvisSuccess,
  addAvisFailure,
  updateAvisStart,
  updateAvisSuccess,
  updateAvisFailure,
  deleteAvisStart,
  deleteAvisSuccess,
  deleteAvisFailure,
  resetEmplacementState,
  resetError,
} = emplacementSlice.actions;

export default emplacementSlice.reducer;
