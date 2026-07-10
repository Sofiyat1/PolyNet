import "./PostCard.css";
import { useState } from "react";
import {
  FiUser,
  FiHeart,
  FiMessageCircle,
  FiRepeat,
  FiShare2,
  FiStar,
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";

function PostCard({ user, content, profilePic,
  mediaUrl,
  mediaType
  , identity }) {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reposted, setReposted] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="post-card">
      {/* HEADER */}
      <div className="post-header">
        {profilePic ? (
          <img
            src={profilePic}
            alt={`${user}'s profile`}
            className="post-profile-pic"
          />
        ) : (
          <div className="post-profile-icon">
            <FiUser size={36} />
          </div>
        )}

        <div className="post-user-info">
          <span className="post-user">{user}</span>

          <span className={`post-identity ${identity}`}>
            {identity === "decoy" ? "Decoy" : "Standard"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="post-content">{content}</div>

      {/* MEDIA */}
      {mediaUrl && (
        <div className="post-media">
          {mediaType?.startsWith("image") ? (
            <img
              src={mediaUrl}
              alt="Post"
              className="post-image"
            />
          ) : (
            <video
              src={mediaUrl}
              controls
              className="post-video"
            />
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div className="post-actions">
        {/* LIKE */}
        <button className="action-btn like-btn" onClick={toggleLike}>
          {liked ? <FaHeart className="liked" /> : <FiHeart />}

          <span>{likeCount}</span>
        </button>

        {/* COMMENT */}
        <button className="action-btn">
          <FiMessageCircle />
          <span>Comment</span>
        </button>

        {/* REPOST */}
        <button
          className={`action-btn repost-btn ${reposted ? "active-repost" : ""}`}
          onClick={() => setReposted((p) => !p)}
        >
          <span className="icon-wrapper">
            <FiRepeat />
            {reposted && <span className="repost-badge">✓</span>}
          </span>

          <span>Repost</span>
        </button>

        {/* SHARE */}
        <button className="action-btn">
          <FiShare2 />
          <span>Share</span>
        </button>

        {/* STAR */}
        <button
          className={`action-btn save-btn ${starred ? "active-save" : ""}`}
          onClick={() => setStarred((prev) => !prev)}
        >
          {starred ? <FaStar /> : <FiStar />}
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
