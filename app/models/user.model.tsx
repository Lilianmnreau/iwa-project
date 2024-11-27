import { Emplacement } from "./emplacement_model";
import { Reservation } from "./reservation.model";

export type User = {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    password: string;
    photo?: string;
    emplacements?: Emplacement[];
    reservations?: Reservation[];
    emplacementsFavoris?: Emplacement[];
  };