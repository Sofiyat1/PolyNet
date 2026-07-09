import { useState, useEffect } from "react";
import PostContext from "../context/PostContext";
import { supabase } from "../lib/supabase";
function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, [])

  async function getPosts() {
    const { data, error } = await supabase
      .from("Posts")
      .select(`
    *,
    Profiles !Posts_user_id_fkey (
      firstname,
      lastname,
      username,
      avatar_url,
      decoy_name,
      decoy_username,
      decoy_avatar_url
    )
  `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error('Error',error);
      console.error('data',data);
      return;
    }

    setPosts(data);
  }

  return (
    <PostContext.Provider value={{ posts, getPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;