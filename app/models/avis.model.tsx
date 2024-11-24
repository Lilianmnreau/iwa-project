  export interface AvisUser{
    id_avis_user : string;
    id_sender : string;
    id_receiver: string;
    note : number;
  }

  export interface AvisEmplacement{
    id_avis_emplacement: string;
    note: number;
    commentaire : string;
    date_avis: Date;
    id_emplacement: string;
  }