import "./Feed.css";
import PostCard from "./PostCard";
import usePosts from "../hooks/usePosts";

function Feed({ posts }) {
  const { loadingPosts } = usePosts();

  if (loadingPosts) {
  return (
    <div className="feed-container">
      <p className="loading-feed">Loading posts...</p>
    </div>
  );
}
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
            user={
              post.identity === "standard"
                ? `${post.Profiles?.firstname} ${post.Profiles?.lastname}`
                : post.Profiles?.decoy_name
            }
            profilePic={
              post.identity === "standard"
                ? post.Profiles?.avatar_url
                : post.Profiles?.decoy_avatar_url
            }
            content={post.content}
            identity={post.identity}
            mediaUrl={post.media_url}
            mediaType={post.media_type}
            createdAt={post.created_at}

          />
        ))
      )}
    </div>
  );
}

export default Feed;