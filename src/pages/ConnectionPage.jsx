import { useState } from "react";
import "./ConnectionPage.css";

function ConnectionPage() {
  const [requests, setRequests] = useState([
    { id: 1, name: "Alice", message: "Let’s connect" },
    { id: 2, name: "Bob", message: "Hi there" },
  ]);

  const [connections, setConnections] = useState([
    { id: 3, name: "Charlie", access: "standard" },
    { id: 4, name: "David", access: "decoy" },
  ]);

  // modal state
  const [activeChangeUser, setActiveChangeUser] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  // accept request
  const handleAccept = (request, accessLevel) => {
    const newConnection = {
      id: request.id,
      name: request.name,
      access: accessLevel,
    };

    setConnections((prev) => [...prev, newConnection]);
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  // reject request
  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // open modal
  const openChangeModal = (connection) => {
    setActiveChangeUser(connection);
    setSelectedAccess(connection.access);
  };

  // confirm change
  const confirmChange = () => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === activeChangeUser.id
          ? { ...c, access: selectedAccess }
          : c
      )
    );

    setActiveChangeUser(null);
    setSelectedAccess(null);
  };

  return (
    <div className="connection-page">

      {/* REQUESTS */}
      <h2>Incoming Requests</h2>

      {requests.map((req) => (
        <div key={req.id} className="request-card">
          <p><b>{req.name}</b></p>
          <p>{req.message}</p>

          <div className="btn-group">
            <button onClick={() => handleAccept(req, "decoy")}>
              Accept as Decoy
            </button>

            <button onClick={() => handleAccept(req, "standard")}>
              Accept as Standard
            </button>

            <button onClick={() => handleReject(req.id)}>
              Reject
            </button>
          </div>
        </div>
      ))}

      {/* CONNECTIONS */}
      <h2 style={{ marginTop: "30px" }}>Connections</h2>

      {connections.map((conn) => (
        <div key={conn.id} className="connection-card">
          <p><b>{conn.name}</b></p>

          <p>
            Access:{" "}
            <span className={conn.access}>
              {conn.access.toUpperCase()}
            </span>
          </p>

          {/* subtle action */}
          <button
            className="link-btn"
            onClick={() => openChangeModal(conn)}
          >
            Change access
          </button>
        </div>
      ))}

      {/* MODAL */}
      {activeChangeUser && (
        <div className="modal-overlay">
          <div className="modal">

            <h3>Change Access</h3>
            <p>{activeChangeUser.name}</p>

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

            <div className="modal-actions">
              <button onClick={() => setActiveChangeUser(null)}>
                Cancel
              </button>

              <button onClick={confirmChange}>
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ConnectionPage;