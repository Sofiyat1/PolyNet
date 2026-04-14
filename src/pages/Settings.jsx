import {
  FiUser,
  FiShield,
  FiEye,
  FiUsers,
  FiLock,
  FiMoon,
  FiLogOut,
} from "react-icons/fi";

import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <h2 className="settings-title">Settings</h2>

      {/* ACCOUNT */}
      <section className="settings-section">
        <h3>Account</h3>

        <div className="settings-list">

          <div className="settings-item">
            <FiUser />
            <span>True Profile</span>
          </div>

          <div className="settings-item">
            <FiShield />
            <span>Decoy Profile</span>
          </div>

        </div>
      </section>

      {/* PRIVACY */}
      <section className="settings-section">
        <h3>Privacy</h3>

        <div className="settings-list">

          <div className="settings-item">
            <FiEye />
            <span>Default Post Mode</span>
          </div>

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

          <div className="settings-item">
            <FiUsers />
            <span>Manage Connections</span>
          </div>

          <div className="settings-item">
            <FiShield />
            <span>Blocked Users</span>
          </div>

        </div>
      </section>

      {/* APPEARANCE */}
      <section className="settings-section">
        <h3>Appearance</h3>

        <div className="settings-list">
          <div className="settings-item">
            <FiMoon />
            <span>Theme</span>
          </div>
        </div>
      </section>

      {/* SESSION */}
      <section className="settings-section danger">
        <div className="settings-item logout">
          <FiLogOut />
          <span>Logout</span>
        </div>
      </section>

    </div>
  );
}

export default Settings;