import { useEffect, useState } from "react";
import "./Notification.css";
import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";
function Notification() {
  const {
    notifications,
    markAllRead,
  } = useContext(NotificationContext);

  useEffect(() => {
    markAllRead();
  }, []);



  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.is_read ? "read" : "unread"
                }`}
            >
              <p className="notification-message">
                {notification.message}
              </p>

              <span className="notification-type">
                {notification.type}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;