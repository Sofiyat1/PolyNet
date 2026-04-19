import { useState } from "react";
import "./ProfilePage.css";
import { FiShield } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";
import logo from "../assets/logo.png";

function ProfilePage() {
  const [mode, setMode] = useState("standard");
  const [animating, setAnimating] = useState(false);

  const handleSwitch = () => {
    setAnimating(true);

    setTimeout(() => {
      setMode((prev) => (prev === "standard" ? "decoy" : "standard"));
      setAnimating(false);
    }, 200);
  };

  const profileData = {
    standard: {
      name: "John Doe",
      bio: "Building real connections.",
    },
    decoy: {
      name: "Anonymous",
      bio: "Just passing through.",
    },
  };

  const current = profileData[mode];

  return (
    <div className="profile-page">
      {/* TOGGLE */}
      <div className="identity-toggle">
        <div className={`toggle-pill ${mode}`} onClick={handleSwitch}>
          <span className="label left">Decoy</span>
          <div className="toggle-center">
            <img src={logo} alt="Polynet logo" className="knob-logo" />
          </div>
          <span className="label right">Standard</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className={`profile-content ${animating ? "fade-out" : "fade-in"}`}>
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar" />

          <div className="profile-info">
            <div className="name-row">
              <h2>{current.name}</h2>

              {mode === "standard" ? (
                <MdVerifiedUser className="badge standard" />
              ) : (
                <FiShield className="badge decoy" />
              )}
            </div>

            <p className="bio">{current.bio}</p>
          </div>
        </div>

        {/* POSTS */}
        <div className="profile-posts">
          <h3>{mode === "standard" ? "Standard Posts" : "Decoy Posts"}</h3>

          <div className="post-card">Post 1...</div>
          <div className="post-card">Post 2...</div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
