// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import profilReducer from './slices/profilSlice';
import messagesReducer from './slices/messagesSlice'
import emplacementReducer from './slices/emplacementSlice';
import articleReducer from './slices/articleSlice'
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
    reducer: {
        profil: profilReducer,
        messages : messagesReducer,
        emplacement: emplacementReducer,
        article: articleReducer,
        reservation: reservationReducer,
    },
});

// Déclaration du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;