import { useContext } from "react";
import Feed from "../components/Feed";
import usePosts from "../hooks/usePosts";
import { ViewerContext } from "../context/ViewerContext";

function HomePage() {
  const { posts } = usePosts();
  const { viewer } = useContext(ViewerContext);

  // owner mode → sees everything
  if (!viewer) {
    return <Feed posts={posts} />;
  }

  const visiblePosts = posts.filter(
    (post) => post.identity === viewer.access
  );

  return <Feed posts={visiblePosts} />;
}

export default HomePage;