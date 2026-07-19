import { useContext, useEffect } from "react";
import "./Notification.css";
import { NotificationContext } from "../context/NotificationContext";

function Notification() {
  const { notifications, markAllRead } =
    useContext(NotificationContext);

  useEffect(() => {
    markAllRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          notifications.map((notification, index) => (
            <div
              key={notification.id || index}
              className={`notification-card ${
                notification.is_read ? "read" : "unread"
              }`}
            >
              <p className="notification-message">
                {typeof notification.message === "string"
                  ? notification.message
                  : JSON.stringify(notification.message)}
              </p>

              <span className="notification-type">
                {typeof notification.type === "string"
                  ? notification.type
                  : "system"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;