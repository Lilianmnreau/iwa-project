import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { Emplacement } from '../models/emplacement_model';

interface ProfilState {
  profil_notifications: number;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  users: User[];
}

const initialState: ProfilState = {
  profil_notifications: 78,
  isLoggedIn: true,
  loading: false,
  error: null,
  users: [],
};

const profilSlice = createSlice({
  name: 'profil',
  initialState,
  reducers: {
    fetchProfilStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProfilSuccess(state, action: PayloadAction<{ profil_notifications: number; isLoggedIn: boolean }>) {
      state.profil_notifications = action.payload.profil_notifications;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loading = false;
    },
    fetchProfilFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setProfilNotifications(state, action: PayloadAction<number>) {
      state.profil_notifications = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state) {
      state.isLoggedIn = true;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.loading = false;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.loading = false;
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<{ id: string; updatedUser: User }>) {
      const index = state.users.findIndex(user => user.id_user === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload.updatedUser;
      }
      state.loading = false;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.id_user !== action.payload);
      state.loading = false;
    },
    deleteUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProfilStart,
  fetchProfilSuccess,
  fetchProfilFailure,
  setProfilNotifications,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = profilSlice.actions;

export default profilSlice.reducer;