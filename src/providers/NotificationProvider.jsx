import { useState, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { supabase } from "../lib/supabase";

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setNotifications([]);
        return;
      }

      const { data, error } = await supabase
        .from("Notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Load notifications + Realtime
  useEffect(() => {
    let channel;

    const initialize = async () => {
      await fetchNotifications();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      console.log("Creating notification channel...");
      channel = supabase
        .channel(`notifications-${user.id}`)
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

    initialize();

    return () => {
      console.log("Removing notification channel...");

      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Add notification
  const addNotification = async (notification) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("Notifications")
        .insert({
          user_id: user.id,
          sender_id: notification.sender_id || null,
          type: notification.type,
          message: notification.message,
          is_read: false,
        });

      if (error) throw error;

      // Don't update state here.
      // The realtime subscription will receive the new notification.
    } catch (error) {
      console.error("Failed to add notification:", error);
    }
  };

  // Mark all notifications as read
  const markAllRead = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("Notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
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