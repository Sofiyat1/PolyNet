import Navbar from "./components/navbar";
import SubNavbar from "./components/SubNavbar";
import Homepage from "./pages/Homepage";
import Network from "./pages/Network";
import Profile from "./Pages/Profile";
import Settings from "./pages/Settings";

import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/network" element={<Network />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
