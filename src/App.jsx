import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Network from "./pages/Network";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import AppLayout from "./layouts/AppLayout";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Onboarding / Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* App pages */}
      <Route element={<AppLayout />}>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/network" element={<Network />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
