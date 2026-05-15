// ConnectionProvider.jsx
import { useState } from "react";
import { ConnectionContext } from "../context/ConnectionContext";

export default function ConnectionProvider({ children }) {
  const [viewer, setViewer] = useState(null);

  const [connections, setConnections] = useState([
    { id: 3, name: "Charlie", access: "standard" },
    { id: 4, name: "David", access: "decoy" },
  ]);

  const [requests, setRequests] = useState([
    { id: 1, name: "Alice", message: "Let’s connect" },
    { id: 2, name: "Bob", message: "Hi there" },
  ]);

  return (
    <ConnectionContext.Provider
      value={{
        viewer,
        setViewer,
        connections,
        setConnections,
        requests,
        setRequests,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}