import { useContext, useState } from "react";
import "./ProfilePage.css";

import { FiShield } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";

import logo from "../assets/logo.png";

import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard";

import { ViewerContext } from "../context/ViewerContext";

function ProfilePage() {
  const { viewer } = useContext(ViewerContext);

  const isViewerMode = !!viewer;

  const [mode, setMode] = useState("standard");
  const [animating, setAnimating] = useState(false);

  const { posts } = usePosts();

  const handleSwitch = () => {
    if (isViewerMode) return; // lock toggle in viewer mode

    setAnimating(true);
    setTimeout(() => {
      setMode((prev) => (prev === "standard" ? "decoy" : "standard"));
      setAnimating(false);
    }, 180);
  };

  const profileData = {
    standard: {
      name: "John Doe",
      username: "@johndoe",
      bio: "Building real connections.",
      badge: "Verified Identity",
    },
    decoy: {
      name: "Anonymous",
      username: "@shadow",
      bio: "Just passing through.",
      badge: "Protected Identity",
    },
  };

const activeMode = isViewerMode ? viewer.access : mode;

const current = profileData[activeMode];
  // viewer-aware filtering
  const visiblePosts = isViewerMode
    ? posts.filter((post) => post.identity === viewer.access)
    : posts.filter((post) => post.identity === activeMode);

  return (
    <div className="profile-page">
      {/* TOGGLE (owner only) */}
      {!isViewerMode && (
        <div className="identity-toggle">
          <div className={`toggle-pill ${mode}`} onClick={handleSwitch}>
            <span className="label left">Decoy</span>

            <div className="toggle-center">
              <img src={logo} alt="Polynet logo" className="knob-logo" />
            </div>

            <span className="label right">Standard</span>
          </div>
        </div>
      )}

      {/* PROFILE CONTENT */}
      <div className={`profile-content ${animating ? "fade-out" : "fade-in"}`}>
        {/* HERO */}
        <div className={`profile-hero ${activeMode}`}>
          <div className="hero-avatar" />

          <div className="hero-info">
            <div className="hero-name-row">
              <h2>{current.name}</h2>

              {activeMode === "standard" ? (
                <MdVerifiedUser className="hero-badge standard" />
              ) : (
                <FiShield className="hero-badge decoy" />
              )}
            </div>

            <p className="hero-username">{current.username}</p>

            <p className="hero-bio">{current.bio}</p>

            <div className={`identity-chip ${activeMode}`}>{current.badge}</div>
          </div>
        </div>

        {/* INSIGHT (owner only) */}
        {!isViewerMode && (
          <div className="profile-insight-card">
            <p>
              {mode === "standard"
                ? "This is your public-facing identity shown to trusted connections."
                : "This is your protected identity shown only to selected connections."}
            </p>
          </div>
        )}

        {/* POSTS */}
        <div className="profile-posts">
          <div className="posts-header">
            <h3>Posts</h3>
            <span>
              {visiblePosts.length} post
              {visiblePosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {visiblePosts.length === 0 ? (
            <div className="empty-profile-posts">
              <p>No posts yet.</p>
            </div>
          ) : (
            visiblePosts
              .slice()
              .reverse()
              .map((post) => (
                <PostCard
                  key={post.id}
                  user={post.user}
                  content={post.content}
                  media={post.media}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
