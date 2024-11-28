import { Emplacement } from "./emplacement_model";

export type Reservation = {
    idReservation?: number;
    idUser: number; 
    nomReservation : string;
    dateDebut: string; 
    dateFin: string; 
    statut: string;
    messageVoyageur: string;
    idEmplacement?: number;
  };