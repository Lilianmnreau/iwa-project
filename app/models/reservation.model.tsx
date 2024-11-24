import { Emplacement } from "./emplacement_model";

export type Reservation = {
    id_reservation: string;
    id_user: string;
    date_debut: string;
    date_fin: string;
    statut: string;
    message_voyageur: string;
    emplacement: Emplacement;
  };