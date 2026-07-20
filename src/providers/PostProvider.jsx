import { useState, useEffect } from "react";
import PostContext from "../context/PostContext";
import { supabase } from "../lib/supabase";

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getPosts();
      } else {
        setPosts([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getPosts() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setPosts([]);
      return;
    }
    const { data, error } = await supabase
      .from("Posts")
      .select(
        `
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
  `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
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
