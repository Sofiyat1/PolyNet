import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Homepage";
import ConnectionPage from "./pages/ConnectionPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notification from "./pages/Notification";

import AppLayout from "./layouts/AppLayout";
import "./App.css";
import Login from "./pages/Login";
import AddPostPage from "./pages/AddPostPage";

function App() {
  return (
    <Routes>
      {/* Onboarding / Landing */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* App pages */}
      <Route element={<AppLayout />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/connectionpage" element={<ConnectionPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/addpostpage" element={<AddPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
