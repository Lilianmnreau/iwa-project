import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Emplacement } from "../../models/emplacement_model";

const initialState: Emplacement = {
  idEmplacement: 0,
  idUser: 0,
  localisation: "",
  caracteristique: "",
  equipements: [],
  services: [],
  tarif: 0,
  disponible: false,
  moyenneAvis: 0,
  photos: [],
  avis: [],
  coordonnees: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};

const emplacementSlice = createSlice({
  name: "emplacement",
  initialState,
  reducers: {
    setIdEmplacement(state, action: PayloadAction<number>) {
      state.idEmplacement = action.payload;
    },
    setIdUser(state, action: PayloadAction<number>) {
      state.idUser = action.payload;
    },
    setLocalisation(state, action: PayloadAction<string>) {
      state.localisation = action.payload;
    },
    setCaracteristique(state, action: PayloadAction<string>) {
      state.caracteristique = action.payload;
    },
    setEquipements(state, action: PayloadAction<string[]>) {
      state.equipements = action.payload;
    },
    setServices(state, action: PayloadAction<string[]>) {
      state.services = action.payload;
    },
    setTarif(state, action: PayloadAction<number>) {
      state.tarif = action.payload;
    },
    setDisponible(state, action: PayloadAction<boolean>) {
      state.disponible = action.payload;
    },
    setMoyenneAvis(state, action: PayloadAction<number>) {
      state.moyenneAvis = action.payload;
    },
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    setAvis(state, action: PayloadAction<Emplacement["avis"]>) {
      state.avis = action.payload;
    },
    setCoordonnees(
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }>
    ) {
      state.coordonnees = action.payload;
    },
    resetEmplacement() {
      return initialState;
    },
  },
});

export const {
  setIdEmplacement,
  setIdUser,
  setLocalisation,
  setCaracteristique,
  setEquipements,
  setServices,
  setTarif,
  setDisponible,
  setMoyenneAvis,
  setPhotos,
  setAvis,
  setCoordonnees,
  resetEmplacement,
} = emplacementSlice.actions;

export default emplacementSlice.reducer;
