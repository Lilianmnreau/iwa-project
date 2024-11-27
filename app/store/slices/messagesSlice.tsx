import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../models/conversation.model";
import { Message, MessageState } from "../../models/message.model";

// Interface pour l'état des messages
interface MessagesState {
  conversations: Conversation[];
  messaging_notifications: number; // Notifications non lues
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  conversations: [], // Liste des conversations
  messaging_notifications: 0, // Nombre de messages non lus
  loading: false, // Indicateur de chargement
  sending: false, // Indicateur d'envoi de message
  deleting: false, // Indicateur de suppression de message
  error: null, // Gestion des erreurs
};

// Slice pour gérer les messages et conversations
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Début du chargement des conversations
    fetchConversationsStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Chargement réussi des conversations
    fetchConversationsSuccess(state, action: PayloadAction<{conversations: Conversation[]; userId: number}>) {
      state.conversations = action.payload.conversations;
      state.messaging_notifications = action.payload.conversations.reduce(
        (count, conversation) =>
          count +
          conversation.messages.filter(
            (msg) =>
              msg.senderId !== action.payload.userId &&
              msg.status !== MessageState.OPENED
          ).length,
        0
      );
      state.loading = false;
    },

    // Échec du chargement des conversations
    fetchConversationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Début de l'envoi d'un message
    sendMessageStart(state) {
      state.sending = true;
      state.error = null;
    },

    // Envoi réussi d'un message
    sendMessageSuccess(
      state,
      action: PayloadAction<{ conversationId: number; message: Message }>
    ) {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.messages.push(message);
      }
      state.sending = false;
    },

    // Échec de l'envoi d'un message
    sendMessageFailure(state, action: PayloadAction<string>) {
      state.sending = false;
      state.error = action.payload;
    },

    // Début de la suppression d'un message
    deleteMessageStart(state) {
      state.deleting = true;
      state.error = null;
    },

    // Suppression réussie d'un message
    deleteMessageSuccess(
      state,
      action: PayloadAction<{ conversationId: number; messageId: number }>
    ) {
      const { conversationId, messageId } = action.payload;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.messages = conversation.messages.filter(
          (msg) => msg.id !== messageId
        );
      }
      state.deleting = false;
    },

    // Échec de la suppression d'un message
    deleteMessageFailure(state, action: PayloadAction<string>) {
      state.deleting = false;
      state.error = action.payload;
    },

    // Marquer les messages d'une conversation comme vus
    markMessagesAsSeen(state, action: PayloadAction<{conversationId: number, userId : number}>) {
      const conversationId = action.payload.conversationId;
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.messages.forEach((msg) => {
          if (
            msg.senderId !== action.payload.userId &&
            msg.status !== MessageState.OPENED
          ) {
            msg.status = MessageState.OPENED;
          }
        });
        state.messaging_notifications = state.conversations.reduce(
          (count, conv) =>
            count +
            conv.messages.filter(
              (msg) =>
                msg.senderId !== conv.personOneId &&
                msg.status !== MessageState.OPENED
            ).length,
          0
        );
      }
    },

    // Réinitialiser les erreurs
    resetError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchConversationsStart,
  fetchConversationsSuccess,
  fetchConversationsFailure,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  deleteMessageStart,
  deleteMessageSuccess,
  deleteMessageFailure,
  markMessagesAsSeen,
  resetError,
} = messagesSlice.actions;

export default messagesSlice.reducer;
