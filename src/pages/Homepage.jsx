import { useContext } from "react";

import Feed from "../components/Feed";
import usePosts from "../hooks/usePosts";

import { ViewerContext } from "../context/ViewerContext";

function HomePage() {
  const { posts } = usePosts();
  const { viewer } = useContext(ViewerContext);

  // normal owner mode
  if (!viewer) {
    return <Feed posts={posts} />;
  }

  // simulated connection access
  const access =
    viewer === "bob" ? "decoy" : "standard";

  const visiblePosts = posts.filter(
    (post) => post.identity === access
  );

  return <Feed posts={visiblePosts} />;
}

export default HomePage;