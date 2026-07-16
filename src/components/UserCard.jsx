import { FiPlus } from "react-icons/fi";
import "./UserCard.css";

const UserCard = ({ user, onAdd }) => {
  return (
    <div className="connection-row">
      <div className="row">
        <div className="avatar">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="avatar-image"
            />
          ) : (
            <div className="avatar-placeholder">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="text-block">
          <p className="name">{user.name}</p>

          {user.username && (
            <p className="username">@{user.username}</p>
          )}

          <p className="msg">
            Connect and choose their identity access when accepted.
          </p>
        </div>
      </div>

      <button
        className="add-btn"
        onClick={() => onAdd(user)}
      >
        <FiPlus />
        Add
      </button>
    </div>
  );
};

export default UserCard;