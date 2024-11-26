import { createSelector } from 'reselect';
import { RootState } from '.';
import { Emplacement } from '../models/emplacement_model';

const selectEmplacementState = (state: RootState): Emplacement => state.emplacement;

export const selectEmplacement = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement || {} as Emplacement
);

export const selectTarif = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement?.tarif ?? 0 // Par défaut, retourne 0 si tarif est null ou undefined
);

export const selectCoordonnees = createSelector(
  [selectEmplacementState],
  (emplacement) =>
    emplacement?.coordonnees || {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    } // Par défaut, retourne des coordonnées valides
);

export const selectCaracteristique = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement?.caracteristique || '' // Par défaut, retourne une chaîne vide
);

export const selectEquipement = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement?.equipement || [] // Par défaut, retourne un tableau vide
);

export const selectPhotos = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement?.photos || [] // Par défaut, retourne un tableau vide
);
