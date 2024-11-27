import { Message } from "./message.model";

export type Conversation = {
  id: number; // Correspond à l'id du backend
  personOneId: number;
  personTwoId: number;
  messages: Message[];
  contactName?: string; // Optionnel, pour affichage
  contactFirstName?: string; // Optionnel, pour affichage
  contactAvatar?: string; // Optionnel, pour affichage
};
