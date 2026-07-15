import { useContext, useEffect } from "react";
import "./Notification.css";
import { NotificationContext } from "../context/NotificationContext";

function Notification() {
  const { notifications, markAllRead } = useContext(NotificationContext);

useEffect(() => {
  markAllRead();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="empty-notifications">No notifications yet</div>
        ) : (
          notifications.map((n, index) => (
            <div key={n.id || index} className="notification-card">
              <p className="notification-message">
                {typeof n.message === "string"
                  ? n.message
                  : JSON.stringify(n.message)}
              </p>

              <span className="notification-type">
                {typeof n.type === "string" ? n.type : "system"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
