import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Emplacement } from '../models/emplacement_model';

interface FavoritesState {
  favorites: Emplacement[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess(state, action: PayloadAction<Emplacement[]>) {
      state.favorites = action.payload;
      state.loading = false;
    },
    fetchFavoritesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addFavorite(state, action: PayloadAction<Emplacement>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<{ id_user: string; id_emplacement: string }>) {
      state.favorites = state.favorites.filter(
        favorite => !(favorite.id_user === action.payload.id_user && favorite.id_emplacement === action.payload.id_emplacement)
      );
    },
    resetFavorites(state) {
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavorite,
  removeFavorite,
  resetFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;