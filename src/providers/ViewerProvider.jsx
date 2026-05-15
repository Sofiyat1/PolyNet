import { useState } from "react";
import { ViewerContext } from "../context/ViewerContext";

function ViewerProvider({ children }) {
  const [viewer, setViewer] = useState("bob");

  return (
    <ViewerContext.Provider value={{ viewer, setViewer }}>
      {children}
    </ViewerContext.Provider>
  );
}

export default ViewerProvider