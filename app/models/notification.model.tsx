// models/Notification.ts
export interface Notification {
    id: number;
    userId: number; // ID de l'utilisateur associé à la notification
    title: string;
    message: string;
    read: boolean;
    createdAt: string; // Stocké comme une chaîne pour correspondre au format JSON
  }
  