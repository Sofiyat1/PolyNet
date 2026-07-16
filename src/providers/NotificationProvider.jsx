import { useState, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { supabase } from "../lib/supabase";

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Load notifications
  useEffect(() => {
    fetchNotifications();

    let channel;

    const subscribe = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      channel = supabase
        .channel(`notifications-${user.id}-${Date.now()}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new, ...prev]);
          }
        )
        .subscribe();
    };

    subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("Notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
  };

  // Add notification
  const addNotification = async (notification) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("Notifications")
      .insert({
        user_id: user.id,
        sender_id: notification.sender_id || null,
        type: notification.type,
        message: notification.message,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((prev) => [data, ...prev]);
  };

  // Mark all notifications as read
  const markAllRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("Notifications")
      .update({ is_read: true })
      .eq("user_id", user.id);

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        is_read: true,
      }))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllRead,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;