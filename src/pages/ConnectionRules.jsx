import { FiGlobe, FiLock, FiUsers, FiSlash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./ConnectionRules.css";

function ConnectionRules() {
  return (
    <div className="rules-page">
      <div className="rules-header">
        <Link to="/settings" className="back-btn">
          <FiArrowLeft size={50} />
        </Link>

        <h2>Connection Rules</h2>
        <div></div>
      </div>

      <p className="rules-intro">
        PolyNet protects your privacy by allowing you to control what different
        connections can see. Every accepted connection is assigned an access
        level.
      </p>

      <div className="rule-card">
        <FiGlobe className="rule-icon standard" />

        <div>
          <h3>Standard Access</h3>

          <p>
            Standard connections can view your standard profile, standard posts,
            and the information you choose to share publicly.
          </p>
        </div>
      </div>

      <div className="rule-card">
        <FiLock className="rule-icon decoy" />

        <div>
          <h3>Decoy Access</h3>

          <p>
            Decoy connections can only view your decoy identity and posts
            assigned to that identity. Your primary profile remains hidden.
          </p>
        </div>
      </div>

      <div className="rule-card">
        <FiUsers className="rule-icon neutral" />

        <div>
          <h3>Changing Access</h3>

          <p>
            You may change a connection's access level at any time from your
            profile page. The changes take effect immediately.
          </p>
        </div>
      </div>

      <div className="rule-card">
        <FiSlash className="rule-icon danger" />

        <div>
          <h3>Blocking Users</h3>

          <p>
            Blocking removes the user from your connections and prevents future
            interaction until they are unblocked.
          </p>
        </div>
      </div>

      <div className="rules-note">
        <strong>Privacy First</strong>

        <p>
          Unlike traditional social networks, PolyNet allows different
          connections to see different versions of your profile while keeping
          your identity under your control.
        </p>
      </div>
    </div>
  );
}

export default ConnectionRules;