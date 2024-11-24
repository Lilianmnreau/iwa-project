import { createSelector } from 'reselect';
import { RootState } from '.';

const selectEmplacementState = (state: RootState) => state.emplacement;

export const selectEmplacement = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement
);

export const selectTarif = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement.tarif
);

export const selectCoordonnees = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement.coordonnees
);

export const selectCaracteristique = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement.caracteristique
);

export const selectEquipement = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement.equipement
);

export const selectPhotos = createSelector(
  [selectEmplacementState],
  (emplacement) => emplacement.photos
);