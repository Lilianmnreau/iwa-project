import { Message } from "./message.model";

export type Conversation ={
  id_conversation: string;
  id_user1: string;
  id_user2: string;
  contactName: string;
  contactFirstName: string;
  contactAvatar: string;
  messages: Message[];
}