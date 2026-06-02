import { useState, useContext } from "react";
import { FiLock, FiGlobe, FiXCircle } from "react-icons/fi";
import "./ConnectionPage.css";

import { ConnectionContext } from "../context/ConnectionContext";
import { NotificationContext } from "../context/NotificationContext";

function ConnectionPage() {
  const { connections, setConnections, requests, setRequests } =
    useContext(ConnectionContext);

  const [activeUser, setActiveUser] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  const { addNotification } = useContext(NotificationContext);

  const requestCount = requests.length;
  const networkCount = connections.length;

  // ACCEPT REQUEST
  const handleAccept = (req, access) => {
    setConnections((prev) => [
      ...prev,
      {
        id: req.id,
        name: req.name,
        access,
      },
    ]);

    setRequests((prev) => prev.filter((r) => r.id !== req.id));

    addNotification({
      type: "connection",
      message: `${req.name} was added as a ${access} connection`,
      visibility: "owner",
    });
  };

  // REJECT REQUEST
  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // OPEN MODAL
  const openModal = (conn) => {
    setActiveUser(conn);
    setSelectedAccess(conn.access);
  };

  // CONFIRM CHANGE
  const confirmChange = () => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === activeUser.id
          ? {
              ...c,
              access: selectedAccess,
            }
          : c,
      ),
    );

    addNotification({
      type: "access",
      message: `${activeUser.name} switched to ${selectedAccess} access`,
      visibility: "owner",
    });

    setActiveUser(null);
    setSelectedAccess(null);
  };

  return (
    <div className="connection-page">
      {/* HEADER */}
      <div className="connection-header">
        <h2>Connections</h2>
      </div>

      {/* REQUESTS */}
      <section className="section">
        <h3>Incoming Requests ({requestCount})</h3>

        {requests.map((req) => (
          <div key={req.id} className="request-card">
            <div className="row">
              <div className="avatar" />

              <div className="text-block">
                <p className="name">{req.name}</p>
                <p className="msg">{req.message}</p>
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
        ))}
      </section>

      {/* CONNECTIONS */}
      <section className="section">
        <h3>Your Network ({networkCount})</h3>

        {connections.map((conn) => (
          <div key={conn.id} className="connection-row">
            <div className="row">
              <div className="avatar" />

              <div className="text-block">
                <div className="name-row">
                  <p className="name">{conn.name}</p>

                  <span className={`badge ${conn.access}`}>{conn.access}</span>
                </div>

                <p className="access-info">
                  {conn.access === "decoy"
                    ? "Sees only decoy posts"
                    : "Sees only standard posts"}
                </p>

                <span className="change-link" onClick={() => openModal(conn)}>
                  Change access
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL */}
      {activeUser && (
        <div className="modal-overlay" onClick={() => setActiveUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Change Access: {activeUser.name}</h3>

            <div className="btn-group">
              <button
                className={selectedAccess === "decoy" ? "active" : ""}
                onClick={() => setSelectedAccess("decoy")}
              >
                Decoy
              </button>

              <button
                className={selectedAccess === "standard" ? "active" : ""}
                onClick={() => setSelectedAccess("standard")}
              >
                Standard
              </button>
            </div>

            <button className="confirm-btn" onClick={confirmChange}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectionPage;
