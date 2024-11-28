// viewmodels/NotificationViewModel.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Notification } from "../models/notification.model";

export const useNotificationViewModel = (userId: number) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Charger les notifications pour l'utilisateur
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get<Notification[]>(
          `/api/notifications?userId=${userId}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des notifications :", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  // Marquer une notification comme lue
  const markAsRead = async (notificationId: number) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/mark-as-read`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la notification :", error);
    }
  };

  // Retourner les notifications et les actions
  return {
    notifications,
    markAsRead,
  };
};
