import { Emplacement } from "./emplacement_model";
import { Reservation } from "./reservation.model";

export type User = {
    id: string;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    mot_de_passe: string;
    photo?: string;
    emplacements?: Emplacement[];
    reservations?: Reservation[];
    emplacementsFavoris?: Emplacement[];
  };