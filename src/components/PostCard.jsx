import './PostCard.css';
import { FiUser } from 'react-icons/fi';

function PostCard({ user, content, profilePic }) {
  return (
    <div className="post-card">
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
        <span className="post-user">{user}</span>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
}

export default PostCard;
