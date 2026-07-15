import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
//import { useContext } from "react";

import "./ConnectionPage.css";

import "./ProfilePage.css";

import { FiShield } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";

import logo from "../assets/logo.png";

import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard";

//import { ViewerContext } from "../context/ViewerContext";
import { useLocation } from "react-router-dom";
function ProfilePage() {
  //const { viewer } = useContext(ViewerContext);

  //const isViewerMode = !!viewer;

  const location = useLocation();

  const [mode, setMode] = useState(
    location.state?.mode || sessionStorage.getItem("profileMode") || "standard",
  );
  const [animating, setAnimating] = useState(false);
  const [profile, setProfile] = useState(null);
  const { posts } = usePosts();

  // ==============================
  // CONNECTIONS
  // ==============================
  const [connections, setConnections] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  const [activeUser, setActiveUser] = useState(null);
  const [selectedAccess, setSelectedAccess] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  }

  const handleSwitch = () => {
    //if (isViewerMode) return;

    const newMode = mode === "standard" ? "decoy" : "standard";

    // Remember the user's last selected profile
    sessionStorage.setItem("profileMode", newMode);

    setAnimating(true);

    setTimeout(() => {
      setMode(newMode);
      setAnimating(false);
    }, 180);
  };

  // ==============================
  // CONNECTION ACTIONS
  // ==============================

  const toggleConnection = (id) => {
    setExpandedUser((prev) => (prev === id ? null : id));
  };

  const openAccessModal = (conn) => {
    setActiveUser(conn);
    setSelectedAccess(conn.access);
  };

  const confirmAccessChange = () => {
    // TODO:
    // Backend developer updates the connection access in Supabase

    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === activeUser.id ? { ...conn, access: selectedAccess } : conn,
      ),
    );

    setActiveUser(null);
    setSelectedAccess(null);
  };

  const handleBlock = (conn) => {
    // TODO:
    // Backend developer:
    // 1. Insert into BlockedUsers
    // 2. Remove from Connections

    console.log("Block user:", conn.name);
  };

  const activeMode = mode;

  const current =
    activeMode === "standard"
      ? {
          name: `${profile?.firstname || ""} ${profile?.lastname || ""}`,
          username: profile?.username ? `@${profile.username}` : "@username",
          bio: profile?.bio || "No bio yet.",
          badge: "Verified Identity",
        }
      : {
          name: profile?.decoy_name || "Anonymous",
          username: profile?.decoy_username
            ? `@${profile.decoy_username}`
            : "@anonymous",
          bio: profile?.decoy_bio || "Protected identity.",
          badge: "Protected Identity",
        }; // viewer-aware filtering
  /*const visiblePosts = isViewerMode
    ? posts.filter((post) => post.identity === viewer.access)
    : posts.filter((post) => post.identity === activeMode);*/
  const visiblePosts = posts.filter((post) => post.identity === activeMode);
  const visibleConnections = connections.filter(
  (conn) => conn.access === activeMode
);

  if (!profile) {
    return (
      <div className="profile-page">
        <p>Loading profile...</p>
      </div>
    );
  }
  return (
    <div className="profile-page">
      {/* TOGGLE (owner only) */}

      <div className="identity-toggle">
        <div className={`toggle-pill ${mode}`} onClick={handleSwitch}>
          <span className="label left">Decoy</span>

          <div className="toggle-center">
            <img src={logo} alt="Polynet logo" className="knob-logo" />
          </div>

          <span className="label right">Standard</span>
        </div>
      </div>

      {/* PROFILE CONTENT */}
      <div className={`profile-content ${animating ? "fade-out" : "fade-in"}`}>
        {/* HERO */}
        <div className={`profile-hero ${activeMode}`}>
          <div className="hero-avatar">
            {activeMode === "standard" ? (
              profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" />
              ) : (
                <span className="avatar-letter">
                  {(
                    (profile?.firstname?.charAt(0) || "") +
                    (profile?.lastname?.charAt(0) || "")
                  ).toUpperCase()}
                </span>
              )
            ) : profile?.decoy_avatar_url ? (
              <img src={profile.decoy_avatar_url} alt="Decoy Profile" />
            ) : (
              <span className="avatar-letter">
                {(profile?.decoy_name?.charAt(0) || "A").toUpperCase()}
              </span>
            )}
          </div>

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

        <div className="profile-insight-card">
          <p>
            {mode === "standard"
              ? "This is your public-facing identity shown to trusted connections."
              : "This is your protected identity shown only to selected connections."}
          </p>
        </div>

        {/* CONNECTIONS */}

        <div className="profile-connections">
          <div className="posts-header">
            <h3>Your Connections</h3>

            <span>
              {visibleConnections.length} connection
              {visibleConnections.length !== 1 ? "s" : ""}
            </span>
          </div>

          {visibleConnections.length === 0 ? (
            <div className="empty-profile-posts">
              <p>No connections yet.</p>
            </div>
          ) : (
            visibleConnections.map((conn) => (
              <div key={conn.id} className="connection-card">
                <div
                  className="connection-header-row"
                  onClick={() => toggleConnection(conn.id)}
                >
                  <div className="row">
                    <div className="avatar" />

                    <p className="name">{conn.name}</p>
                  </div>

                  <span>
                    {expandedUser === conn.id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>

                {expandedUser === conn.id && (
                  <div className="connection-details">
                    <p>
                      <strong>Current Access:</strong> {conn.access}
                    </p>

                    <div className="action-buttons">
                      <button onClick={() => openAccessModal(conn)}>
                        Change Access
                      </button>

                      <button
                        className="block-btn"
                        onClick={() => handleBlock(conn)}
                      >
                        Block User
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

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
                  avatar={post.avatar}
                  username={post.username}
                  identity={post.identity}
                />
              ))
          )}
        </div>
      </div>
      {/* CHANGE ACCESS MODAL */}

      {activeUser && (
        <div className="modal-overlay" onClick={() => setActiveUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Change Access</h3>

            <p>{activeUser.name}</p>

            <div className="btn-group">
              <button
                className={selectedAccess === "decoy" ? "active" : ""}
                onClick={() => setSelectedAccess("decoy")}
              >
                Decoy
              </button>

              <button
                className={selectedAccess === "standard" ? "active" : ""}
                onClick={() => setSelectedAccess("standard")}
              >
                Standard
              </button>
            </div>

            <button className="confirm-btn" onClick={confirmAccessChange}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
