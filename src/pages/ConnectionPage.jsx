import { useState, useEffect, useContext } from "react";
import "./ConnectionPage.css";
import toast from "react-hot-toast";

import { NotificationContext } from "../context/NotificationContext";

import RequestCard from "../components/RequestCard";
import UserCard from "../components/UserCard";

import {
  fetchRequests,
  fetchUsers,
  sendConnectionRequest,
  acceptRequest,
  rejectRequest,
} from "../lib/ConnectionService";

function ConnectionPage() {
  const { addNotification } = useContext(NotificationContext);

  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    loadRequests();
    loadUsers();
  }, []);

  // ===========================
  // Load incoming requests
  // ===========================

  const loadRequests = async () => {
    try {
      setLoadingRequests(true);

      const data = await fetchRequests();

      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  // ===========================
  // Load users
  // ===========================

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);

      const data = await fetchUsers();

      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  // ===========================
  // Send Connection Request
  // ===========================

  const handleSendRequest = async (user) => {
    try {
      await sendConnectionRequest(user.id);

      toast.success("Connection request sent.");

      setUsers((prev) =>
        prev.filter((u) => u.id !== user.id)
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // ===========================
  // Accept Request
  // ===========================

  const handleAccept = async (request, access) => {
    try {
      await acceptRequest(request.id, access);


      toast.success("Connection accepted.");

      setRequests((prev) =>
        prev.filter((r) => r.id !== request.id)
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // ===========================
  // Reject Request
  // ===========================

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      toast.success("Connection rejected.");

      setRequests((prev) =>
        prev.filter((r) => r.id !== id)
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="connection-page">

      <div className="connection-header">
        <h2>Connections</h2>
      </div>

      {/* Incoming Requests */}

      <section className="section">

        <h3>
          Incoming Requests ({requests.length})
        </h3>

        {loadingRequests ? (

          <p className="empty-text">
            Loading requests...
          </p>

        ) : requests.length === 0 ? (

          <p className="empty-text">
            No pending requests.
          </p>

        ) : (

          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))

        )}

      </section>

      {/* Find Connections */}

      <section className="section">

        <h3>Find Connections</h3>

        {loadingUsers ? (

          <p className="empty-text">
            Loading users...
          </p>

        ) : users.length === 0 ? (

          <p className="empty-text">
            No users available.
          </p>

        ) : (

          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onAdd={handleSendRequest}
            />
          ))

        )}

      </section>

    </div>
  );
}

export default ConnectionPage;