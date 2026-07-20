import { useState, useEffect } from "react";
import PostContext from "../context/PostContext";
import { supabase } from "../lib/supabase";

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

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
    setLoadingPosts(true);

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
      setLoadingPosts(false);
      return;
    }

    setPosts(data);
    setLoadingPosts(false);
  }

  return (
    <PostContext.Provider value={{ posts, getPosts, loadingPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
