import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { Emplacement } from '../../models/emplacement_model';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfilState {
  profil_notifications: number;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
  userId : number | null;
}

const initialState: ProfilState = {
  profil_notifications: 78,
  isLoggedIn: !!AsyncStorage.getItem("jwt"),
  loading: false,
  error: null,
  user: null,
  userId: null,
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
    loginSuccess(state,action: PayloadAction<{ userId: number;}> ) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
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
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.userId = action.payload.id;
      state.loading = false;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.user= action.payload;
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
    updateUserSuccess(state, action: PayloadAction<{ id: number; updatedUser: User }>) {
      state.user = action.payload.updatedUser;
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
      state.user = null
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
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
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