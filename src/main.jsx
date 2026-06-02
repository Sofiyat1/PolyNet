import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import PostProvider from "./providers/PostProvider.jsx";
import ViewerProvider from "./providers/ViewerProvider.jsx";
import ConnectionProvider from "./providers/ConnectionProvider.jsx";
import NotificationProvider from "./providers/NotificationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <ConnectionProvider>
        <ViewerProvider>
          <PostProvider>
            <BrowserRouter basename="/">
              <App />
            </BrowserRouter>
          </PostProvider>
        </ViewerProvider>
      </ConnectionProvider>
    </NotificationProvider>
  </StrictMode>,
);
