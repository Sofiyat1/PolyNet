import {
  FiUser,
  FiShield,
  FiSlash,
  FiEye,
  FiUsers,
  FiLock,
  FiMoon,
  FiLogOut,
  FiEdit2,
  FiMinusCircle,
  FiEdit3,
} from "react-icons/fi";

import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
function Settings() {
  const navigate = useNavigate();
  // logout function

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (!confirmLogout) return;

    navigate("/", { replace: true });

    setTimeout(async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
      }
    }, 50);
  };

  // Temporary data
  // TODO: Replace with Supabase
  const blockedUsers = [];
  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      {/* ACCOUNT */}
      <section className="settings-section">
        <h3>Account</h3>

        <div className="settings-list">
          <Link to="/edit-profile" className="settings-link settings-item">
            <FiEdit3 />
            <span> Edit Standard Profile</span>
          </Link>

          <Link
            className="settings-item settings-link"
            to="/edit-decoy-profile"
          >
            <FiEdit2 />
            <span>Edit Decoy Profile</span>
          </Link>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="settings-section">
        <h3>Privacy</h3>

        <div className="settings-list">
          <div className="settings-item">
            <FiLock />
            <span>Connection Rules</span>
          </div>
        </div>
      </section>

      {/* CONNECTIONS */}
      <section className="settings-section">
        <h3>Connections</h3>

        <div className="settings-list">
          <Link to="/manage-connections" className="settings-item settings-link">
            <FiUsers />
            <span>Manage Connections</span>
          </Link>

          <Link to="/blocked-users" className="settings-item settings-link">
            <FiSlash />
            <span>Blocked Users ({blockedUsers.length})</span>
          </Link>
        </div>
      </section>

      {/* APPEARANCE */}
      <section className="settings-section">
        <h3>Appearance</h3>

        <div className="settings-list">
            <Link to="/theme" className="settings-item settings-link">
            <FiMoon />
            <span>Theme</span></Link>
          </div>
      </section>

      {/* SESSION */}
      <section className="settings-section danger">
        <div className="settings-item logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </div>
      </section>
    </div>
  );
}

export default Settings;
