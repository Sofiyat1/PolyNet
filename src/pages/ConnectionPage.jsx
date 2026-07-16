import { useState, useEffect, useContext } from "react";
import { FiLock, FiGlobe, FiPlus, FiXCircle } from "react-icons/fi";
import "./ConnectionPage.css";
import "./FindConnection.css";

import toast from "react-hot-toast";

import { NotificationContext } from "../context/NotificationContext";

import {
  fetchRequests as fetchRequestsFromDB,
  fetchUsers as fetchUsersFromDB,
  sendConnectionRequest,
  acceptRequest,
  rejectRequest,
} from "../lib/ConnectionService";

function ConnectionPage() {
  const { addNotification } = useContext(NotificationContext);

  // Incoming connection requests
  const [requests, setRequests] = useState([]);

  // Users available to connect with
  const [users, setUsers] = useState([]);

  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);

      const data = await fetchRequestsFromDB();

      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await fetchUsersFromDB();

      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  // SEND REQUEST
  const sendRequest = async (user) => {
    try {
      await sendConnectionRequest(user.id);

      toast.success("Connection request sent.");

      addNotification({
        type: "connection",
        message: `Connection request sent to ${user.name}`,
        visibility: "owner",
      });

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // ACCEPT REQUEST
  const handleAccept = async (request, access) => {
    try {
      await acceptRequest(request.id, access);

      toast.success("Connection accepted.");

      addNotification({
        type: "connection",
        message: `${request.name} added as a ${access} connection`,
        visibility: "owner",
      });

      setRequests((prev) => prev.filter((r) => r.id !== request.id));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // REJECT REQUEST
  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      toast.success("Connection rejected.");

      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  //Different Avatar colors
  const avatarColors = [
    "#179c65",
    "#2563eb",
    "#9333ea",
    "#f59e0b",
    "#ef4444",
    "#0891b2",
    "#7c3aed",
  ];

  const getAvatarColor = (name = "") => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div className="connection-page">
      <div className="connection-header">
        <h2>Connections</h2>
      </div>

      {/* Incoming Requests */}

      <section className="section">
        <h3>Incoming Requests ({requests.length})</h3>

        {loadingRequests ? (
          <p className="empty-text">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="empty-text">No pending requests.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="row">
                <div
                  className="avatar"
                  style={
                    !req.avatar ? { background: getAvatarColor(req.name) } : {}
                  }
                >
                  {req.avatar ? (
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="avatar-img"
                    />
                  ) : (
                    req.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}
                </div>
                <div className="text-block">
                  <p className="name">{req.name}</p>
                  <p className="username">@{req.username}</p>
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

        {loadingUsers ? (
          <p className="empty-text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="empty-text">No users available to connect with.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="connection-row">
              <div className="row">
                <div
                  className="avatar"
                  style={
                    !user.avatar
                      ? { background: getAvatarColor(user.name) }
                      : {}
                  }
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar-img"
                    />
                  ) : (
                    user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}
                </div>
                <div className="text-block">
                  <p className="name">{user.name}</p>
                  <p className="username">@{user.username}</p>
                  <p className="msg">
                    Connect and choose their access level when accepted.
                  </p>
                </div>
              </div>

              <button className="add-btn" onClick={() => sendRequest(user)}>
                <FiPlus fontSize={20} />
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
