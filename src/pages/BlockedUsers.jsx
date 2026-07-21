import { useState, useEffect } from "react";
import { FiSlash, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  fetchBlockedUsers,
  unblockUser,
} from "../lib/ConnectionService";
import "./BlockedUsers.css";

function BlockedUsers() {
  // TEMPORARY DATA
  // TODO: Replace with Supabase
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  const loadBlockedUsers = async () => {
    try {
      const data = await fetchBlockedUsers();
      setBlockedUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);

const confirmUnblock = async () => {
  try {
    await unblockUser(selectedUser.id);

    setBlockedUsers((prev) =>
      prev.filter((user) => user.id !== selectedUser.id)
    );

    setSelectedUser(null);
  } catch (error) {
    console.error(error);
    alert("Unable to unblock user.");
  }
};

  return (
    <div className="blocked-page">

      <div className="blocked-header">

        <Link to="/settings" className="back-btn">
          <FiArrowLeft />
        </Link>

      </div>

      <p className="blocked-subtitle">
        People you've blocked won't be able to interact with you or send connection requests.
      </p>

      {blockedUsers.length === 0 ? (
        <div className="empty-blocked">

          <FiSlash className="empty-icon" />

          <h3>No Blocked Users</h3>

          <p>
            You haven't blocked anyone.
          </p>

        </div>
      ) : (
        blockedUsers.map((user) => (
          <div
            key={user.id}
            className="blocked-card"
          >
            <div className="blocked-info">

              <div className="blocked-avatar">
                {user.name.charAt(0)}
              </div>

              <div>

                <h4>{user.name}</h4>

                <p>{user.username}</p>

              </div>

            </div>

            <button
              className="unblock-btn"
              onClick={() => setSelectedUser(user)}
            >
              Unblock
            </button>

          </div>
        ))
      )}

      {/* Confirmation Modal */}

      {selectedUser && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>Unblock User</h3>

            <p>
              Are you sure you want to unblock{" "}
              <strong>{selectedUser.name}</strong>?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmUnblock}
              >
                Unblock
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default BlockedUsers;