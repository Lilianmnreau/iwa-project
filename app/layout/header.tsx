import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Notification } from '../models/notification.model';
import { MaterialIcons } from '@expo/vector-icons'; // Utilisation d'icônes sobres via MaterialIcons

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => Promise<void>; // Fonction pour marquer toutes les notifications comme lues
}

export default function Header({ notifications, onMarkAsRead }: NotificationListProps) {
  // Calculer le nombre de notifications non lues
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/header_logo.jpeg')} style={styles.logo} />

      <TouchableOpacity style={styles.notificationIcon} onPress={onMarkAsRead}>
        {/* Icône MaterialIcons */}
        <MaterialIcons name="notifications" size={28} color="#37474F" style={styles.bell} />
        {unreadCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: -40,
  },
  notificationIcon: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'flex-end', // Place l'icône en bas de la vue
    marginBottom: -40, // Descend la cloche encore plus bas
  },
  bell: {
    marginBottom: -5, // Ajustement supplémentaire pour une meilleure position
  },
  badgeContainer: {
    position: 'absolute',
    top: -10, // Ajustement pour le badge
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
