import { supabase } from "./supabase";

/**
 * Get currently logged in user
 */
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
};

/**
 * Fetch incoming connection requests
 */
export const fetchRequests = async () => {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("Connections")
    .select(
      `
      id,
      sender_id,
      status,
      access_level
    `,
    )
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) throw error;

  const requests = await Promise.all(
    data.map(async (request) => {
      const { data: profile } = await supabase
        .from("Profiles")
        .select(
          `
          firstname,
          lastname,
          username,
          avatar_url
        `,
        )
        .eq("id", request.sender_id)
        .single();

      return {
        id: request.id,
        sender_id: request.sender_id,
        name: `${profile?.firstname ?? ""} ${profile?.lastname ?? ""}`.trim(),
        username: profile?.username,
        avatar: profile?.avatar_url,
      };
    }),
  );

  return requests;
};

/**
 * Fetch users available for connection
 */
export const fetchUsers = async () => {
  const user = await getCurrentUser();

  if (!user) return [];

  // existing connections

  const { data: connections } = await supabase
    .from("Connections")
    .select("sender_id,receiver_id");

  const excludedIds = new Set([user.id]);

  connections?.forEach((connection) => {
    if (connection.sender_id === user.id)
      excludedIds.add(connection.receiver_id);

    if (connection.receiver_id === user.id)
      excludedIds.add(connection.sender_id);
  });

  const { data: profiles, error } = await supabase.from("Profiles").select(`
      id,
      firstname,
      lastname,
      username,
      avatar_url
    `);

  if (error) throw error;

  return profiles
    .filter((profile) => !excludedIds.has(profile.id))
    .map((profile) => ({
      id: profile.id,
      name: `${profile.firstname ?? ""} ${profile.lastname ?? ""}`.trim(),
      username: profile.username,
      avatar: profile.avatar_url,
    }));
};

/**
 * Send connection request
 */
export const sendConnectionRequest = async (receiverId) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found.");

  // Get sender's profile
  const { data: profile, error: profileError } = await supabase
    .from("Profiles")
    .select("firstname, lastname")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  // Create connection request
  const { error } = await supabase.from("Connections").insert({
    sender_id: user.id,
    receiver_id: receiverId,
    status: "pending",
  });

  if (error) throw error;

  // Create notification for receiver
  const { error: notificationError } = await supabase
    .from("Notifications")
    .insert({
      user_id: receiverId,
      sender_id: user.id,
      type: "connection",
      message: `${profile.firstname} ${profile.lastname} sent you a connection request.`,
      is_read: false,
    });

  if (notificationError) throw notificationError;
};

/**
 * Accept request
 */
export const acceptRequest = async (requestId, accessLevel) => {
  const user = await getCurrentUser();

  // Get the connection request
  const { data: connection, error: connectionError } = await supabase
    .from("Connections")
    .select("*")
    .eq("id", requestId)
    .single();

  if (connectionError) throw connectionError;

  // Update request
  const { error } = await supabase
    .from("Connections")
    .update({
      status: "accepted",
      access_level: accessLevel,
    })
    .eq("id", requestId);

  if (error) throw error;

  // Get receiver's name
  const { data: profile } = await supabase
    .from("Profiles")
    .select("firstname, lastname")
    .eq("id", user.id)
    .single();

  // Notify sender
  const { error: notificationError } = await supabase
    .from("Notifications")
    .insert({
      user_id: connection.sender_id,
      sender_id: user.id,
      type: "connection",
      message: `${profile.firstname} ${profile.lastname} accepted your connection request.`,
      is_read: false,
    });

  if (notificationError) throw notificationError;
};

/**
 * Reject request
 */
export const rejectRequest = async (requestId) => {
  const user = await getCurrentUser();

  // Get request first
  const { data: connection, error: connectionError } = await supabase
    .from("Connections")
    .select("*")
    .eq("id", requestId)
    .single();

  if (connectionError) throw connectionError;

  // Delete request
  const { error } = await supabase
    .from("Connections")
    .delete()
    .eq("id", requestId);

  if (error) throw error;

  // Get receiver profile
  const { data: profile } = await supabase
    .from("Profiles")
    .select("firstname, lastname")
    .eq("id", user.id)
    .single();

  // Notify sender
  const { error: notificationError } = await supabase
    .from("Notifications")
    .insert({
      user_id: connection.sender_id,
      sender_id: user.id,
      type: "connection",
      message: `${profile.firstname} ${profile.lastname} declined your connection request.`,
      is_read: false,
    });

  if (notificationError) throw notificationError;
};
