// src/store/index.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import profilReducer from './slices/profilSlice';
import messagesReducer from './slices/messagesSlice'
import emplacementReducer from './slices/emplacementSlice';
import articleReducer from './slices/articleSlice'
import {thunk}  from "redux-thunk";
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    profil: profilReducer,
    messages: messagesReducer,
    emplacement: emplacementReducer,
    article: articleReducer,
    reservation: reservationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Déclaration du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Définir AppThunk pour typer les fonctions asynchrones
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;