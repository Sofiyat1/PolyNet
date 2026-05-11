import Feed from "../components/Feed";
import usePosts from "../hooks/usePosts";

function HomePage() {
  const { posts } = usePosts();

  return <Feed posts={posts} />;
}

export default HomePage;