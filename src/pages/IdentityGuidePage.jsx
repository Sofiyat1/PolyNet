import "./IdentityGuidePage.css";
import { FiShield, FiUsers, FiEye, FiLock } from "react-icons/fi";

import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function IdentityGuidePage() {
  const navigate = useNavigate();
  return (
    <div className="identity-guide-page">
      {/* HERO */}
      <section className="guide-hero">
        <h1>Identity & Visibility</h1>

        <p>
          PolyNet allows users control how different connections view their
          identity and content.
        </p>
      </section>

      {/* IDENTITIES */}
      <section className="guide-section">
        <h2>Identity Layers</h2>

        <div className="identity-grid">
          {/* STANDARD */}
          <div className="identity-card standard">
            <div className="card-icon standard">
              <MdVerifiedUser />
            </div>

            <h3>Standard Identity</h3>

            <p>
              Your standard identity is your normal public-facing profile shown
              to trusted standard connections.
            </p>

            <ul>
              <li>Standard profile visibility</li>
              <li>Standard posts visibility</li>
              <li>Used for trusted connections</li>
            </ul>
          </div>

          {/* DECOY */}
          <div className="identity-card decoy">
            <div className="card-icon decoy">
              <FiShield />
            </div>

            <h3>Protected Identity</h3>

            <p>
              {" "}
              Your protected identity allows selective visibility for specific
              connections while maintaining controlled exposure.
            </p>

            <ul>
              <li>Protected profile visibility</li>
              <li>Protected posts visibility</li>
              <li>Used for restricted connections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="guide-section">
        <h2>How Visibility Works</h2>

        <div className="flow-grid">
          <div className="flow-card">
            <FiUsers className="flow-icon" />
            <h3>Connection Request</h3>
            <p>
              Users send connection requests to interact within the network.
            </p>
          </div>

          <div className="flow-card">
            <FiLock className="flow-icon" />
            <h3>Access Selection</h3>
            <p>
              The account owner chooses which visibility level the connection
              receives.
            </p>
          </div>

          <div className="flow-card">
            <FiEye className="flow-icon" />
            <h3>Controlled Visibility</h3>
            <p>
              {" "}
              Connections only view the profile and posts permitted by their
              assigned access.
            </p>
          </div>
        </div>
      </section>

      {/* SIMULATION */}
      <section className="guide-section">
        <h2>Viewer Simulation</h2>

        <div className="simulation-card">
          <p>
            PolyNet includes a viewer simulation system used to test visibility
            behavior without requiring a fully deployed multi-user social
            network.
          </p>

          <p>
            This allows visibility rules to be verified by switching between
            access levels.
          </p>
        </div>

        <div className="enter-app">
          <button className="enter-app-btn" onClick={() => navigate("/signup")}>
            Enter App
          </button>
          <p className="enter-app-hint">Ready to continue?</p>
        </div>

      </section>
    </div>
  );
}

export default IdentityGuidePage;
