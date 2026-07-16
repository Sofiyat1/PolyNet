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

  const { error } = await supabase.from("Connections").insert({
    sender_id: user.id,
    receiver_id: receiverId,
    status: "pending",
  });

  if (error) throw error;
};

/**
 * Accept request
 */
export const acceptRequest = async (requestId, accessLevel) => {
  const { error } = await supabase
    .from("Connections")
    .update({
      status: "accepted",
      access_level: accessLevel,
    })
    .eq("id", requestId);

  if (error) throw error;
};

/**
 * Reject request
 */
export const rejectRequest = async (requestId) => {
  const { error } = await supabase
    .from("Connections")
    .delete()
    .eq("id", requestId);

  if (error) throw error;
};
