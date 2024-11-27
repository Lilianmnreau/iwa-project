// components/NotificationList.tsx
import React from "react";
import { Notification } from "../../models/notification.model";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  return (
    <ul className="notification-list">
      {notifications.map((notif) => (
        <li
          key={notif.id}
          className={`notification-item ${notif.read ? "read" : "unread"}`}
        >
          <h4>{notif.title}</h4>
          <p>{notif.message}</p>
          <small>{new Date(notif.createdAt).toLocaleString()}</small>
          {!notif.read && (
            <button onClick={() => onMarkAsRead(notif.id)}>Marquer comme lu</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
