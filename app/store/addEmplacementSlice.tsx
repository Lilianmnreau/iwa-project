import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Emplacement } from "../models/emplacement_model";

const initialState: Emplacement = {
    id_emplacement: null,
    id_user: null,
    localisation: null,
    caracteristique: null,
    equipement: [],
    tarif: null,
    disponible: null,
    moyenneAvis: null,
    photos: null,
    coordonnees: null,
};

const emplacementSlice = createSlice({
    name: 'emplacement',
    initialState,
    reducers: {
        setIdEmplacement(state, action: PayloadAction<string | null>) {
            state.id_emplacement = action.payload;
        },
        setIdUser(state, action: PayloadAction<string | null>) {
            state.id_user = action.payload;
        },
        setLocalisation(state, action: PayloadAction<string | null>) {
            state.localisation = action.payload;
        },
        setCaracteristique(state, action: PayloadAction<string | null>) {
            state.caracteristique = action.payload;
        },
        setEquipement(state, action: PayloadAction<string[] | null>) {
            state.equipement = action.payload;
        },
        setTarif(state, action: PayloadAction<number | null>) {
            state.tarif = action.payload;
        },
        setDisponible(state, action: PayloadAction<boolean | null>) {
            state.disponible = action.payload;
        },
        setMoyenneAvis(state, action: PayloadAction<number | null>) {
            state.moyenneAvis = action.payload;
        },
        setPhotos(state, action: PayloadAction<string[] | null>) {
            state.photos = action.payload;
        },
        setCoordonnees(state, action: PayloadAction<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number } | null>) {
            state.coordonnees = action.payload;
        },
        resetEmplacement(state) {
            return initialState;
        }
    }
});

export const {
    setIdEmplacement,
    setIdUser,
    setLocalisation,
    setCaracteristique,
    setEquipement,
    setTarif,
    setDisponible,
    setMoyenneAvis,
    setPhotos,
    setCoordonnees,
    resetEmplacement
} = emplacementSlice.actions;

export default emplacementSlice.reducer;