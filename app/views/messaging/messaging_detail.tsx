import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useMessageViewModel from "../../viewModels/message.viewModel";
import { sendMessage, markMessagesAsSeen } from "../../store/messagesSlice";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch } from "react-redux";
import { Message, MessageState } from "../../models/message.model";
import { Conversation } from "../../models/conversation.model";

export default function MessagesDetail({ route }: any) {
  const { conversationId } = route.params;
  const {
    conversations,
    addMessage,
    getConversationById,
  } = useMessageViewModel();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  // Récupérer la conversation en utilisant le hook
  const conversation: Conversation | null = getConversationById(conversationId);

  const handleSendMessage = () => {
    if (message.trim() && conversation) {
      const newMessage: Message = {
        id_message: String(Date.now()), // Générer un ID unique pour le nouveau message
        id_conversation: conversationId,
        id_sender: conversation.id_user1, // Utiliser l'ID de l'utilisateur
        text: message,
        timestamp: new Date().toISOString(),
        isSentByUser: true,
        state: MessageState.Envoye,
      };

      addMessage(conversationId, newMessage);
      setMessage(""); // Réinitialiser le champ de saisie après l'envoi du message
    }
  };

  useEffect(() => {
    dispatch(markMessagesAsSeen(conversationId));
  }, [dispatch, conversationId]);

  // Vérifiez si la conversation est chargée
  if (!conversation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00796B" />
        <Text>Chargement de la conversation...</Text>
      </View>
    );
  }

  const renderStatusIcon = (status: MessageState) => {
    switch (status) {
      case MessageState.Envoye:
        return <MaterialCommunityIcons name="send-clock-outline" size={16} color="#00796B" />;
      case MessageState.Remis:
        return <MaterialCommunityIcons name="send-check-outline" size={16} color="#00796B" />;
      case MessageState.Vu:
        return <Ionicons name="eye" size={16} color="#00796B" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactInfo}
            onPress={() =>
              navigation.navigate("ContactDetail", {
                name: conversation.contactName,
                avatar: conversation.contactAvatar,
              })
            }
          >
            <Image source={ conversation.contactAvatar } style={styles.avatar} />
            <Text style={styles.contactName}>
              {`${conversation.contactFirstName} ${conversation.contactName}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList<Message>
        data={conversation.messages}
        keyExtractor={(item) => item.id_message}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.isSentByUser ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <View style={styles.messageMeta}>
              {item.isSentByUser && (
                <View style={styles.statusContainer}>
                  <Text style={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <View style={styles.iconSpacing}>
                    {renderStatusIcon(item.state)}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ecrire un message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#00796B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  messageBubble: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 1,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d4f5d4",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e7e7e7",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: "flex-end",
    color: "#888",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  sendButton: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});