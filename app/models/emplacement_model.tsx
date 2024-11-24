export interface Emplacement {
  id_emplacement: string | null;
  id_user: string | null;
  localisation: string | null;
  caracteristique: string | null;
  equipement: string[]; // Modifié pour être un tableau de chaînes
  tarif: number | null;
  disponible: boolean | null;
  moyenneAvis: number | null;
  photos: string[] | null;
  coordonnees: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null;
}