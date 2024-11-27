export type Message = {
  id: number;
  senderId: number;
  contenu: string; // Correspond au "content" du backend
  date: string; // Date au format ISO
  status: MessageState;
};

export enum MessageState {
  SENT = "SENT",
  RECEIVED = "RECEIVED",
  OPENED = "OPENED",
}
