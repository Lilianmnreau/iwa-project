import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Notification } from '../models/notification.model';

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
        <Text style={styles.bell}>🔔</Text>
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
    justifyContent: 'flex-end', // Aligner le contenu en bas
    paddingLeft: 10, // Ajouter un padding à gauche
    paddingBottom: 10, // Ajouter un padding en bas
    flexDirection: 'row', // Ajouter flexDirection pour aligner logo et notifications côte à côte
    alignItems: 'center',
  },
  logo: {
    width: 120, // Ajustez la largeur selon vos besoins
    height: 120, // Ajustez la hauteur selon vos besoins
    resizeMode: 'contain', // Pour s'assurer que l'image est contenue dans les dimensions spécifiées
    marginBottom: -40, // Ajustez cette valeur pour descendre le logo
  },
  notificationIcon: {
    position: 'relative',
    marginLeft: 'auto', // Pousse l'icône à l'extrémité droite
    marginRight: 20, // Ajustez l'espacement à droite
  },
  bell: {
    fontSize: 28,
    color: '#000',
  },
  badgeContainer: {
    position: 'absolute',
    top: -5, // Positionnement du badge par rapport à la cloche
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
