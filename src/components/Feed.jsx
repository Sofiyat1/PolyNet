import PostCard from "./PostCard";
import "./Feed.css";

function Feed() {
  const samplePosts = [
    { user: "Alice", content: "Hello world!" },
    { user: "Bob", content: "Loving this mobile app!" },
    { user: "Charlie", content: "Check out my new post." },
  ];

  // Repeat the posts 10 times to simulate endless feed
  const posts = Array(10).fill(samplePosts).flat(); // flatten nested arrays into one

  return (
    <div className="feed-container">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          user={post.user}
          content={post.content}
          profilePic={null} // show default icon
        />
      ))}
    </div>
  );
}

export default Feed;
