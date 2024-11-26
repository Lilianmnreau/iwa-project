import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { RootState } from '../store';
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
} from '../store/messagesSlice';

const useMessagesViewModel = () => {
  const dispatch = useDispatch();

  const conversations = useSelector((state: RootState) => state.messages.conversations);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const error = useSelector((state: RootState) => state.messages.error);
  const apiBaseUrl = process.env.REACT_APP_MESSAGES_API_BASE_URL;

  // Fetch conversations when the component mounts
  useEffect(() => {
    const fetchConversations = async () => {
      dispatch(fetchConversationsStart());
      try {
        const response = await fetch(`${apiBaseUrl}/conversations`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(fetchConversationsSuccess(data));
      } catch (error) {
        dispatch(fetchConversationsFailure((error as Error).message));
        Toast.show({
          type: 'error',
          text1: 'Erreur de chargement',
          text2: 'Impossible de récupérer les conversations.',
        });
      }
    };

    fetchConversations();
  }, [dispatch, apiBaseUrl]);

  const sendMessageToConversation = async (
    conversationId: string,
    text: string,
    timestamp: string
  ) => {
    dispatch(sendMessageStart());
    try {
      const response = await fetch(`${apiBaseUrl}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, timestamp, isSentByUser: true }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const message = await response.json();
      dispatch(sendMessageSuccess({ conversationId, message }));
    } catch (error) {
      dispatch(sendMessageFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de l\'envoi',
        text2: 'Impossible d\'envoyer le message.',
      });
    }
  };

  const deleteMessageFromConversation = async (conversationId: string, messageId: string) => {
    dispatch(deleteMessageStart());
    try {
      const response = await fetch(
        `${apiBaseUrl}/conversations/${conversationId}/messages/${messageId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      dispatch(deleteMessageSuccess({ conversationId, messageId }));
    } catch (error) {
      dispatch(deleteMessageFailure((error as Error).message));
      Toast.show({
        type: 'error',
        text1: 'Échec de la suppression',
        text2: 'Impossible de supprimer le message.',
      });
    }
  };

  const markAllMessagesAsSeen = (conversationId: string) => {
    dispatch(markMessagesAsSeen(conversationId));
    // Optionally sync with backend
  };

  const getConversationById = (conversationId: string) => {
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
  };
};

export default useMessagesViewModel;
