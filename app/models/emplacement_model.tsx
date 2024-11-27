export interface Emplacement {
  idEmplacement: number; // Id de l'emplacement
  idUser: number; // Id de l'utilisateur propriétaire
  localisation: string; // Localisation de l'emplacement
  caracteristique: string; // Description de l'emplacement
  equipements: string[]; // Liste des équipements disponibles
  services: string[]; // Liste des services disponibles
  tarif: number; // Tarif en euros
  disponible: boolean; // Disponibilité de l'emplacement
  moyenneAvis: number; // Moyenne des avis
  photos: string[]; // Liste des URLs des photos
  coordonnees: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }; // Coordonnées géographiques
}
