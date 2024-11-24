// messagesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition de l'énumération pour les statuts de message
export enum MessageStatus {
  Envoye = "envoyé",
  Remis = "remis",
  Vu = "vu",
}

// Mise à jour de l'interface Message pour utiliser l'énumération
interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSentByUser: boolean;
  status: MessageStatus;
}

interface Conversation {
  id: string;
  contactName: string;
  contactFirstName: string;
  contactAvatar: string;
  messages: Message[];
}

interface MessagesState {
  conversations: Conversation[];
  messaging_notifications : number;
}

const initialState: MessagesState = {
  conversations: [
    {
      id: "1",
      contactName: "Doe",
      contactFirstName: "John",
      contactAvatar: require("../assets/avatar_placeholder.png"), // Utilisation de l'avatar par défaut
      messages: [
        {
          id: "m1",
          text: "Salut ! J'espère que tu es prêt pour notre trekking ce week-end !",
          timestamp: "2023-10-01 12:00",
          isSentByUser: false,
          status: MessageStatus.Vu,
        },
        {
          id: "m2",
          text: "Oui, je suis super excité ! J'ai vérifié la météo et ça a l'air parfait.",
          timestamp: "2023-10-01 12:01",
          isSentByUser: true,
          status: MessageStatus.Vu,
        },
        {
          id: "m3",
          text: "N'oublie pas d'apporter des chaussures confortables.",
          timestamp: "2023-10-01 12:02",
          isSentByUser: false,
          status: MessageStatus.Vu,
        },
        {
          id: "m4",
          text: "Pas de souci, je vais prendre mes meilleures chaussures.",
          timestamp: "2023-10-01 12:03",
          isSentByUser: true,
          status: MessageStatus.Vu,
        },
        {
          id: "m5",
          text: "Parfait ! On se retrouve à 9h au parking ?",
          timestamp: "2023-10-01 12:04",
          isSentByUser: false,
          status: MessageStatus.Vu,
        },
      ],
    },
    {
      id: "2",
      contactName: "Smith",
      contactFirstName: "Alice",
      contactAvatar: require("../assets/avatar_placeholder.png"), // Utilisation de l'avatar par défaut
      messages: [
        {
          id: "m1",
          text: "Salut Alice, as-tu déjà réservé le terrain pour le trekking ?",
          timestamp: "2023-10-02 14:00",
          isSentByUser: true,
          status: MessageStatus.Vu,
        },
        {
          id: "m2",
          text: "Oui, c'est fait ! Nous avons accès au terrain depuis vendredi.",
          timestamp: "2023-10-02 14:01",
          isSentByUser: false,
          status: MessageStatus.Remis,
        },
        {
          id: "m3",
          text: "Super ! On peut y aller dès que possible alors.",
          timestamp: "2023-10-02 14:02",
          isSentByUser: true,
          status: MessageStatus.Remis,
        },
        {
          id: "m4",
          text: "Absolument, j'ai hâte !",
          timestamp: "2023-10-02 14:03",
          isSentByUser: false,
          status: MessageStatus.Vu,
        },
      ],
    },
    {
      id: "3",
      contactName: "Brown",
      contactFirstName: "Charlie",
      contactAvatar: require("../assets/avatar_placeholder.png"), // Utilisation de l'avatar par défaut
      messages: [
        {
          id: "m1",
          text: "Bonjour Charlie ! Comment se passe la préparation pour le trek ?",
          timestamp: "2023-10-03 10:00",
          isSentByUser: true,
          status: MessageStatus.Vu,
        },
        {
          id: "m2",
          text: "Salut ! Tout est presque prêt. J'ai même acheté de nouveaux équipements.",
          timestamp: "2023-10-03 10:01",
          isSentByUser: false,
          status: MessageStatus.Remis,
        },
        {
          id: "m3",
          text: "Super, tu devrais partager des photos des nouveaux équipements.",
          timestamp: "2023-10-03 10:02",
          isSentByUser: true,
          status: MessageStatus.Remis,
        },
        {
          id: "m4",
          text: "Bien sûr, je le ferai !",
          timestamp: "2023-10-03 10:03",
          isSentByUser: false,
          status: MessageStatus.Remis,
        },
        {
          id: "m5",
          text: "Et n'oublie pas de vérifier le plan du chemin.",
          timestamp: "2023-10-03 10:04",
          isSentByUser: true,
          status: MessageStatus.Vu,
        },
        {
          id: "m6",
          text: "Oui, je vais m'assurer que tout est en ordre. Merci de le rappeler !",
          timestamp: "2023-10-03 10:05",
          isSentByUser: false,
          status: MessageStatus.Vu,
        },
      ],
    },
  ],
  messaging_notifications: 2,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage(
      state,
      action: PayloadAction<{
        conversationId: string;
        text: string;
        timestamp: string;r
      }>
    ) {
      const { conversationId, text, timestamp } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );

      if (conversation) {
        conversation.messages.push({
          id: Math.random().toString(),
          text,
          timestamp,
          isSentByUser: true,
          status: MessageStatus.Envoye,
        });
      }
    },
    markMessagesAsSeen: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.messages.forEach((message) => {
          if (!message.isSentByUser && message.status !== MessageStatus.Vu) {
            message.status = MessageStatus.Vu;
          }
        });
      }
    },
  },
});

export const { sendMessage,markMessagesAsSeen } = messagesSlice.actions;
export default messagesSlice.reducer;
