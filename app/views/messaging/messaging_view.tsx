import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import useMessagesViewModel from "../../viewModels/message.viewModel";

export default function MessagesView() {
  const { conversations, loading, error } = useMessagesViewModel();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [notifications, setNotifications] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    checkForNotifications();
  }, [conversations]);

  const checkForNotifications = () => {
    const newNotifications: { [key: string]: number } = {};
    conversations.forEach((conversation: any) => {
      let count = 0;
      conversation.messages.forEach((message: any) => {
        if (!message.isSentByUser && message.status === "remis") {
          count++;
        }
      });
      if (count > 0) {
        newNotifications[conversation.id] = count;
      }
    });
    setNotifications(newNotifications);
  };

  const filteredConversations = conversations.filter((conversation: any) =>
    `${conversation.contactFirstName} ${conversation.contactName}`
      .toLowerCase()
      .startsWith(searchText.toLowerCase())
  );

  // Gérer le chargement et les erreurs
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderConversation = ({ item }: any) => {
    const lastMessage = item.messages[item.messages.length - 1];
    const notificationCount = notifications[item.id] || 0;
    const lastMessageTime = new Date(lastMessage.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("MessagesDetail", { conversationId: item.id_conversation })
        }
      >
        <View style={styles.conversationItem}>
          <Image
            source={item.contactAvatar}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.contactName}>
              {`${item.contactFirstName} ${item.contactName}`}
            </Text>
            <Text
              style={styles.lastMessage}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMessage.text}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.lastMessageTime, notificationCount > 0 && styles.lastMessageTimeWithNotif]}>
              {lastMessageTime}
            </Text>
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id_conversation}
          renderItem={renderConversation}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Aucune conversation trouvée</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  conversationContainer: {
    margin: 10,
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00796B",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  lastMessageTime: {
    fontSize: 12,
    color: "#888",
  },
  lastMessageTimeWithNotif: {
    color: "#00796B",
  },
  notificationBadge: {
    backgroundColor: "#00796B",
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "#888",
  },
});