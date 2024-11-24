import { useState, useEffect } from 'react';
import { Conversation } from '../models/conversation.model';
import { Message, MessageState } from '../models/message.model';

const useMessagesViewModel = () => {
  const [state, setState] = useState<{
    conversations: Conversation[],
    loading: boolean,
    error: string | null,
  }>({
    conversations: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Simulate fetching data
        const data: Conversation[] = [
          {
            id_conversation: "1",
            id_user1: "current_user",
            id_user2: "john_doe",
            contactName: "Doe",
            contactFirstName: "John",
            contactAvatar: require("../assets/avatar_placeholder.png"),
            messages: [
              {
                id_message: "m1",
                id_conversation: "1",
                id_sender: "john_doe",
                text: "Salut ! J'espère que tu es prêt pour notre trekking ce week-end !",
                timestamp: "2023-10-01 12:00",
                isSentByUser: false,
                state: MessageState.Vu,
              },
              {
                id_message: "m2",
                id_conversation: "1",
                id_sender: "current_user",
                text: "Oui, je suis super excité ! J'ai vérifié la météo et ça a l'air parfait.",
                timestamp: "2023-10-01 12:01",
                isSentByUser: true,
                state: MessageState.Vu,
              },
              {
                id_message: "m3",
                id_conversation: "1",
                id_sender: "john_doe",
                text: "N'oublie pas d'apporter des chaussures confortables.",
                timestamp: "2023-10-01 12:02",
                isSentByUser: false,
                state: MessageState.Vu,
              },
              {
                id_message: "m4",
                id_conversation: "1",
                id_sender: "current_user",
                text: "Pas de souci, je vais prendre mes meilleures chaussures.",
                timestamp: "2023-10-01 12:03",
                isSentByUser: true,
                state: MessageState.Vu,
              },
              {
                id_message: "m5",
                id_conversation: "1",
                id_sender: "john_doe",
                text: "Parfait ! On se retrouve à 9h au parking ?",
                timestamp: "2023-10-01 12:04",
                isSentByUser: false,
                state: MessageState.Vu,
              },
            ],
          },
          {
            id_conversation: "2",
            id_user1: "current_user",
            id_user2: "alice_smith",
            contactName: "Smith",
            contactFirstName: "Alice",
            contactAvatar: require("../assets/avatar_placeholder.png"),
            messages: [
              {
                id_message: "m1",
                id_conversation: "2",
                id_sender: "current_user",
                text: "Salut Alice, as-tu déjà réservé le terrain pour le trekking ?",
                timestamp: "2023-10-02 14:00",
                isSentByUser: true,
                state: MessageState.Vu,
              },
              {
                id_message: "m2",
                id_conversation: "2",
                id_sender: "alice_smith",
                text: "Oui, c'est fait ! Nous avons accès au terrain depuis vendredi.",
                timestamp: "2023-10-02 14:01",
                isSentByUser: false,
                state: MessageState.Remis,
              },
              {
                id_message: "m3",
                id_conversation: "2",
                id_sender: "current_user",
                text: "Super ! On peut y aller dès que possible alors.",
                timestamp: "2023-10-02 14:02",
                isSentByUser: true,
                state: MessageState.Remis,
              },
              {
                id_message: "m4",
                id_conversation: "2",
                id_sender: "alice_smith",
                text: "Absolument, j'ai hâte !",
                timestamp: "2023-10-02 14:03",
                isSentByUser: false,
                state: MessageState.Vu,
              },
            ],
          },
          {
            id_conversation: "3",
            id_user1: "current_user",
            id_user2: "charlie_brown",
            contactName: "Brown",
            contactFirstName: "Charlie",
            contactAvatar: require("../assets/avatar_placeholder.png"),
            messages: [
              {
                id_message: "m1",
                id_conversation: "3",
                id_sender: "current_user",
                text: "Bonjour Charlie ! Comment se passe la préparation pour le trek ?",
                timestamp: "2023-10-03 10:00",
                isSentByUser: true,
                state: MessageState.Vu,
              },
              {
                id_message: "m2",
                id_conversation: "3",
                id_sender: "charlie_brown",
                text: "Salut ! Tout est presque prêt. J'ai même acheté de nouveaux équipements.",
                timestamp: "2023-10-03 10:01",
                isSentByUser: false,
                state: MessageState.Remis,
              },
              {
                id_message: "m3",
                id_conversation: "3",
                id_sender: "current_user",
                text: "Super, tu devrais partager des photos des nouveaux équipements.",
                timestamp: "2023-10-03 10:02",
                isSentByUser: true,
                state: MessageState.Remis,
              },
              {
                id_message: "m4",
                id_conversation: "3",
                id_sender: "charlie_brown",
                text: "Bien sûr, je le ferai !",
                timestamp: "2023-10-03 10:03",
                isSentByUser: false,
                state: MessageState.Remis,
              },
              {
                id_message: "m5",
                id_conversation: "3",
                id_sender: "current_user",
                text: "Et n'oublie pas de vérifier le plan du chemin.",
                timestamp: "2023-10-03 10:04",
                isSentByUser: true,
                state: MessageState.Vu,
              },
              {
                id_message: "m6",
                id_conversation: "3",
                id_sender: "charlie_brown",
                text: "Oui, je vais m'assurer que tout est en ordre. Merci de le rappeler !",
                timestamp: "2023-10-03 10:05",
                isSentByUser: false,
                state: MessageState.Vu,
              },
            ],
          },
        ];
        setState(prevState => ({ ...prevState, conversations: data, loading: false }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: (error as Error).message, loading: false }));
      }
    };

    fetchConversations();
  }, []);

  const updateConversation = (conversationId: string, updateFn: (conv: Conversation) => Conversation) => {
    setState(prevState => ({
      ...prevState,
      conversations: prevState.conversations.map(conversation => 
        conversation.id_conversation === conversationId ? updateFn(conversation) : conversation
      ),
    }));
  };

  const addMessage = (conversationId: string, newMessage: Message) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: [...conversation.messages, newMessage],
    }));
  };

  const updateMessage = (conversationId: string, messageId: string, updatedMessage: Partial<Message>) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: conversation.messages.map(message =>
        message.id_message === messageId ? { ...message, ...updatedMessage } : message
      ),
    }));
  };

  const deleteMessage = (conversationId: string, messageId: string) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: conversation.messages.filter(message => message.id_message !== messageId),
    }));
  };

  const getConversationById = (conversationId: string) => {
    return state.conversations.find(conversation => conversation.id_conversation === conversationId) || null;
  };

  return {
    conversations: state.conversations,
    loading: state.loading,
    error: state.error,
    addMessage,
    updateMessage,
    deleteMessage,
    getConversationById,
  };
};

export default useMessagesViewModel;