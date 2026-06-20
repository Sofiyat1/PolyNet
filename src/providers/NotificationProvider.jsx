import { useState } from "react";
import { NotificationContext } from "../context/NotificationContext";

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: crypto.randomUUID(),
      type: "system",
      message: "Welcome to PolyNet",
      visibility: "all",
      read: false,
    },
  ]);

const addNotification = (notification) => {
  setNotifications((prev) => [
    {
      id: crypto.randomUUID(),
      type: notification.type,
      message: notification.message,
      visibility: notification.visibility || "all",
      read: false,
    },
    ...prev,
  ]);
};

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      })),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        addNotification,
        markAllRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;