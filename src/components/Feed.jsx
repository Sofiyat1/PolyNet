import "./Feed.css";
import PostCard from "./PostCard";

function Feed({ posts }) {
  return (
    <div className="feed-container">
      {posts.length === 0 ? (
        <p className="empty-feed">
          No posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            user={post.user}
            content={post.content}
            identity={post.identity}
            media={post.media}
          />
        ))
      )}
    </div>
  );
}

export default Feed;