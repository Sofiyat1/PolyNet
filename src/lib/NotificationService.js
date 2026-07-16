import { supabase } from "./supabase";

export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from("Notifications")
    .select(
      `
      *,
      sender:Profiles!notifications_sender_fk(
        firstname,
        lastname,
        avatar_url
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createNotification({
  user_id,
  sender_id,
  message,
  type,
}) {
  const { error } = await supabase.from("Notifications").insert({
    user_id,
    sender_id,
    message,
    type,
  });

  if (error) throw error;
}

export async function markAsRead(id) {
  const { error } = await supabase
    .from("Notifications")
    .update({
      is_read: true,
    })
    .eq("id", id);

  if (error) throw error;
}
