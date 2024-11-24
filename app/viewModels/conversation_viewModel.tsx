import { useState, useEffect } from 'react';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

const useConversationViewModel = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // const response = await fetch('/api/conversations');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data: Conversation[] = await response.json();

        // Example data
        const data: Conversation[] = [
          {
            id_conversation: '1',
            id_messageState: '1',
            id_sender: 'user1',
            id_receiver: 'user2',
            messages: [
              {
                id_message: '1',
                id_conversation: '1',
                id_sender: 'user1',
                id_receiver: 'user2',
                text: 'Hello!',
                timestamp: '2023-10-01T10:00:00Z',
                isSentByUser: true,
              },
              {
                id_message: '2',
                id_conversation: '1',
                id_sender: 'user2',
                id_receiver: 'user1',
                text: 'Hi there!',
                timestamp: '2023-10-01T10:01:00Z',
                isSentByUser: false,
              },
            ],
          },
          {
            id_conversation: '2',
            id_messageState: '2',
            id_sender: 'user3',
            id_receiver: 'user4',
            messages: [
              {
                id_message: '1',
                id_conversation: '2',
                id_sender: 'user3',
                id_receiver: 'user4',
                text: 'Good morning!',
                timestamp: '2023-10-02T08:00:00Z',
                isSentByUser: true,
              },
              {
                id_message: '2',
                id_conversation: '2',
                id_sender: 'user4',
                id_receiver: 'user3',
                text: 'Good morning to you too!',
                timestamp: '2023-10-02T08:01:00Z',
                isSentByUser: false,
              },
            ],
          },
        ];

        setConversations(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const addMessageToConversation = (conversationId: string, newMessage: Message) => {
    setConversations(prevConversations =>
      prevConversations.map(conversation =>
        conversation.id_conversation === conversationId
          ? { ...conversation, messages: [...conversation.messages, newMessage] }
          : conversation
      )
    );
  };

  const updateMessageInConversation = (conversationId: string, messageId: string, updatedMessage: Partial<Message>) => {
    setConversations(prevConversations =>
      prevConversations.map(conversation =>
        conversation.id_conversation === conversationId
          ? {
              ...conversation,
              messages: conversation.messages.map(message =>
                message.id_message === messageId ? { ...message, ...updatedMessage } : message
              ),
            }
          : conversation
      )
    );
  };

  const deleteMessageFromConversation = (conversationId: string, messageId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(conversation =>
        conversation.id_conversation === conversationId
          ? {
              ...conversation,
              messages: conversation.messages.filter(message => message.id_message !== messageId),
            }
          : conversation
      )
    );
  };

  const getConversationById = (conversationId: string) => {
    return conversations.find(conversation => conversation.id_conversation === conversationId) || null;
  };

  return {
    conversations,
    loading,
    error,
    addMessageToConversation,
    updateMessageInConversation,
    deleteMessageFromConversation,
    getConversationById,
  };
};

export default useConversationViewModel;