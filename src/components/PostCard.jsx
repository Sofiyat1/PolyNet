import "./PostCard.css";
import { FiUser } from "react-icons/fi";

function PostCard({
  user,
  content,
  profilePic,
  media = [],
  identity,
}) {
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

      {/* TEXT */}
      <div className="post-content">{content}</div>

      {/* MEDIA */}
      {media.length > 0 && (
        <div className="post-media">
          {media.map((item, index) => (
            <div key={index} className="post-media-item">
              {item.type.startsWith("image") ? (
                <img
                  src={item.preview}
                  alt="post media"
                  className="post-image"
                />
              ) : (
                <video
                  src={item.preview}
                  controls
                  className="post-video"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;