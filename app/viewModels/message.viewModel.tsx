import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { RootState } from "../store";
import API from "../utils/api";

import {
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
} from "../store/slices/messagesSlice";
import { Conversation } from "../models/conversation.model";
import { MessageState } from "../models/message.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useMessagesViewModel = () => {
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state: RootState) => state.messages.conversations
  );
  const loading = useSelector((state: RootState) => state.messages.loading);
  const error = useSelector((state: RootState) => state.messages.error);
  let userId = useSelector((state: RootState) => state.profil.userId);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (userId) {
      fetchConversations(); // Récupération initiale
      intervalRef.current = setInterval(fetchConversations, 2500); // Actualisation toutes les 2,5 secondes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Nettoyage de l'intervalle lors du démontage
      }
    };
  }, [userId]);

  const fetchConversations = () => {
    dispatch(fetchConversationsStart());
    API.get(`/messaging/users/${userId}/conversations`) // Remplacer {userId} par l'ID utilisateur approprié
      .then((response) => {
        const conversationsRes = response.data;
        // Pour chaque conversation, effectuer un appel à l'API pour enrichir avec les détails utilisateur
        const enrichedConversationsPromises = conversationsRes.map(
          (conversation: Conversation) => {
            const contactId =
              conversation.personOneId === userId
                ? conversation.personTwoId
                : conversation.personOneId;
            return API.get(`/users/${contactId}/details`).then(
              (userResponse) => {
                // Ajouter les détails utilisateur à la conversation
                return {
                  ...conversation,
                  contactFirstName: userResponse.data.nom,
                  contactName: userResponse.data.prenom,
                  contactAvatar: userResponse.data.photo,
                };
              }
            );
          }
        );

        // Une fois toutes les requêtes terminées, dispatcher les conversations enrichies
        Promise.all(enrichedConversationsPromises)
          .then((enrichedConversations) => {
            dispatch(
              fetchConversationsSuccess({
                conversations: enrichedConversations,
                userId: userId,
              })
            );
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'enrichissement des conversations :",
              error
            );
            dispatch(
              fetchConversationsFailure(
                "Échec de l'enrichissement des conversations."
              )
            );
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          fetchConversationsFailure(
            error.message || "Erreur de chargement des conversations."
          )
        );
        Toast.show({
          type: "error",
          text1: "Erreur de chargement",
          text2: "Impossible de récupérer les conversations.",
        });
      });
  };

  const sendMessageToConversation = (
    conversationId: number,
    senderId: number,
    content: string
  ) => {
    dispatch(sendMessageStart());
    API.post("/messaging/messages", { conversationId, senderId, content })
      .then((response) => {
        const message = response.data;
        dispatch(sendMessageSuccess({ conversationId, message }));
      })
      .catch((error) => {
        dispatch(
          sendMessageFailure(
            error.message || "Erreur lors de l'envoi du message."
          )
        );
        Toast.show({
          type: "error",
          text1: "Échec de l'envoi",
          text2: "Impossible d'envoyer le message.",
        });
      });
  };

  const updateMessageStatus = (
    conversationId: number,
    messageId: number,
    newStatus: MessageState
  ) => {
    const conversation = conversations.find(
      (conv) => conv.id === conversationId
    );
    if (!conversation) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Conversation introuvable.",
      });
      return;
    }

    const message = conversation.messages.find(
      (msg) => msg.id === messageId && msg.senderId !== userId
    );

    if (!message) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Message introuvable ou vous ne pouvez pas modifier ce message.",
      });
      return;
    }

    // Appel API pour mettre à jour le statut
    API.patch(`/messaging/messages/${messageId}/status`, { newStatus })
      .then((response) => {
        const updatedMessage = response.data;

        // Met à jour le statut localement après le succès de l'API
        const updatedConversations = conversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, status: updatedMessage.status }
                  : msg
              ),
            };
          }
          return conv;
        });

        dispatch(
          fetchConversationsSuccess({
            conversations: updatedConversations,
            userId,
          })
        );

        Toast.show({
          type: "success",
          text1: "Statut mis à jour",
          text2: "Le statut du message a été mis à jour avec succès.",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Impossible de mettre à jour le statut du message.",
        });
        console.error("Erreur lors de la mise à jour du statut :", error);
      });
  };

  const deleteMessageFromConversation = (
    conversationId: number,
    messageId: number
  ) => {
    dispatch(deleteMessageStart());
    API.delete(
      `/messaging/conversations/${conversationId}/messages/${messageId}`
    )
      .then(() => {
        dispatch(deleteMessageSuccess({ conversationId, messageId }));
      })
      .catch((error) => {
        dispatch(
          deleteMessageFailure(
            error.message || "Erreur lors de la suppression du message."
          )
        );
        Toast.show({
          type: "error",
          text1: "Échec de la suppression",
          text2: "Impossible de supprimer le message.",
        });
      });
  };

  const markAllMessagesAsSeen = (conversationId: number) => {
    dispatch(markMessagesAsSeen(conversationId));
    // Optionnel : Appeler une route backend pour synchronisation
  };

  const getConversationById = (conversationId: number) => {
    return conversations.find((conv) => conv.id === conversationId) || null;
  };

  return {
    conversations,
    loading,
    error,
    sendMessageToConversation,
    deleteMessageFromConversation,
    markAllMessagesAsSeen,
    getConversationById,
    updateMessageStatus,
    fetchConversations,
  };
};

export default useMessagesViewModel;
