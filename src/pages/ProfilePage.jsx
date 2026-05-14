import { useState } from "react";

import "./ProfilePage.css";

import { FiShield } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";

import logo from "../assets/logo.png";

import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard";

function ProfilePage() {
  const [mode, setMode] = useState("standard");
  const [animating, setAnimating] = useState(false);

  const { posts } = usePosts();

  const handleSwitch = () => {
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

  const current = profileData[mode];

  const filteredPosts = posts.filter(
    (post) => post.identity === mode,
  );

  return (
    <div className="profile-page">
      {/* TOGGLE */}
      <div className="identity-toggle">
        <div className={`toggle-pill ${mode}`} onClick={handleSwitch}>
          <span className="label left">Decoy</span>

          <div className="toggle-center">
            <img
              src={logo}
              alt="Polynet logo"
              className="knob-logo"
            />
          </div>

          <span className="label right">Standard</span>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div
        className={`profile-content ${
          animating ? "fade-out" : "fade-in"
        }`}
      >
        {/* HERO CARD */}
        <div className={`profile-hero ${mode}`}>
          <div className="hero-avatar" />

          <div className="hero-info">
            <div className="hero-name-row">
              <h2>{current.name}</h2>

              {mode === "standard" ? (
                <MdVerifiedUser className="hero-badge standard" />
              ) : (
                <FiShield className="hero-badge decoy" />
              )}
            </div>

            <p className="hero-username">
              {current.username}
            </p>

            <p className="hero-bio">
              {current.bio}
            </p>

            <div className={`identity-chip ${mode}`}>
              {current.badge}
            </div>
          </div>
        </div>

        {/* PROFILE INSIGHT */}
        <div className="profile-insight-card">
          <p>
            {mode === "standard"
              ? "This is your public-facing identity shown to trusted standard connections."
              : "This is your protected decoy identity shown only to decoy connections."}
          </p>
        </div>

        {/* POSTS */}
        <div className="profile-posts">
          <div className="posts-header">
            <h3>
              {mode === "standard"
                ? "Standard Posts"
                : "Decoy Posts"}
            </h3>

            <span>
              {filteredPosts.length} post
              {filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="empty-profile-posts">
              <p>
                No {mode} posts yet.
              </p>
            </div>
          ) : (
            filteredPosts
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