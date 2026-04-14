import { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
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

  const [activeUser, setActiveUser] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  const requestCount = requests.length;
  const networkCount = connections.length;

  const handleAccept = (req, access) => {
    setConnections((prev) => [...prev, { id: req.id, name: req.name, access }]);

    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const openModal = (conn) => {
    setActiveUser(conn);
    setSelectedAccess(conn.access);
  };

  const confirmChange = () => {
    setConnections((prev) =>
      prev.map((c) =>
        c.id === activeUser.id ? { ...c, access: selectedAccess } : c,
      ),
    );

    setActiveUser(null);
    setSelectedAccess(null);
  };

  return (
    <div className="connection-page">
      {/* HEADER */}
      <div className="connection-header">
        <h2>Connections</h2>
        {/*<FiSearch
          className="search-icon"
          onClick={() => console.log("open search")}
        />*/}
      </div>

      {/* REQUESTS */}
      <section className="section">
        <h3>Incoming Requests ({requestCount}) </h3>

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
                Decoy
              </button>

              <button
                className="btn-standard"
                onClick={() => handleAccept(req, "standard")}
              >
                Standard
              </button>

              <button className="reject" onClick={() => handleReject(req.id)}>
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
                <div className="name-wrapper">
                  <p className="name">{conn.name}</p>

                  <span className={`badge-sup ${conn.access}`}>
                    {conn.access === "decoy" ? "DE" : "ST"}
                  </span>
                </div>

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
            {/* FLOATING AVATAR */}
            <div className="modal-avatar">
              <div className="avatar" />
            </div>

            {/* TITLE */}
            <h3 className="modal-title">Change Access: {activeUser.name}</h3>

            {/* BUTTONS */}
            <div className="btn-group">
              <button
                className={selectedAccess === "decoy" ? "active" : ""}
                onClick={() => setSelectedAccess("decoy")}
              >
                Decoy Access
              </button>

              <button
                className={selectedAccess === "standard" ? "active" : ""}
                onClick={() => setSelectedAccess("standard")}
              >
                Standard Access
              </button>
            </div>

            {/* CONFIRM */}
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmChange}>
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
