export type Message = {
  id_message: string;
  id_conversation: string;
  id_sender: string;
  text: string;
  timestamp: string;
  isSentByUser: boolean;
  state: MessageState;
};

export enum MessageState {
  Envoye = "envoyé",
  Remis = "remis",
  Vu = "vu",
}



