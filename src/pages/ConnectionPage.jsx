import { useState, useEffect, useContext } from "react";
import { FiLock, FiGlobe, FiPlus, FiXCircle } from "react-icons/fi";
import "./ConnectionPage.css";

import { NotificationContext } from "../context/NotificationContext";

function ConnectionPage() {
  const { addNotification } = useContext(NotificationContext);

  // Incoming connection requests
  const [requests, setRequests] = useState([]);

  // Users available to connect with
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  // ============================
  // TODO: BACKEND
  // Fetch all pending requests
  // where receiver = current user
  // ============================
  const fetchRequests = async () => {
    // Backend developer will implement
  };

  // ============================
  // TODO: BACKEND
  // Fetch all users except:
  // - current user
  // - existing connections
  // - pending requests
  // ============================
  const fetchUsers = async () => {
    // Backend developer will implement
  };

  // SEND REQUEST
  const sendRequest = async (user) => {
    // TODO: Insert pending request into database

    addNotification({
      type: "connection",
      message: `Connection request sent to ${user.name}`,
      visibility: "owner",
    });

    // Remove immediately from Find Connections
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  // ACCEPT REQUEST
  const handleAccept = async (request, access) => {
    // TODO:
    // Update request to accepted
    // Save selected access (standard / decoy)

    addNotification({
      type: "connection",
      message: `${request.name} added as a ${access} connection`,
      visibility: "owner",
    });

    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  // REJECT REQUEST
  const handleReject = async (id) => {
    // TODO:
    // Delete request OR
    // Update status to rejected

    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="connection-page">
      <div className="connection-header">
        <h2>Connections</h2>
      </div>

      {/* Incoming Requests */}

      <section className="section">
        <h3>Incoming Requests ({requests.length})</h3>

        {requests.length === 0 ? (
          <p className="empty-text">No pending requests.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="row">
                <div className="avatar" />

                <div className="text-block">
                  <p className="name">{req.name}</p>
                  <p className="msg">Wants to connect with you.</p>
                </div>
              </div>

              <div className="btn-group">
                <button
                  className="btn-decoy"
                  onClick={() => handleAccept(req, "decoy")}
                >
                  <FiLock />
                  Decoy
                </button>

                <button
                  className="btn-standard"
                  onClick={() => handleAccept(req, "standard")}
                >
                  <FiGlobe />
                  Standard
                </button>

                <button className="reject" onClick={() => handleReject(req.id)}>
                  <FiXCircle />
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Find Connections */}

      <section className="section">
        <h3>Find Connections</h3>

        {users.length === 0 ? (
          <p className="empty-text">No users available to connect with.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="connection-row">
              <div className="row">
                <div className="avatar" />

                <div className="text-block">
                  <p className="name">{user.name}</p>

                  <p className="msg">
                    Connect and choose their access level when they are
                    accepted.
                  </p>
                </div>
              </div>

              <button className="add-btn" onClick={() => sendRequest(user)}>
                <FiPlus />
                Add
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default ConnectionPage;
