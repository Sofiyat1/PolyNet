import "./Navbar.css";
import logo from "../assets/logo.png";

import { FiSettings, FiMenu, FiShield } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";

import { ViewerContext } from "../context/ViewerContext";
import { ConnectionContext } from "../context/ConnectionContext";

function Navbar({ variant = "app", scrollRef }) {
  const [open, setOpen] = useState(false);
  const [showSimMenu, setShowSimMenu] = useState(false);
  const [visible, setVisible] = useState(true);

  const menuRef = useRef(null);
  const simRef = useRef(null);
  const navRef = useRef(null);

  const { viewer, setViewer } = useContext(ViewerContext);
  const { connections } = useContext(ConnectionContext);

  // CLOSE ON OUTSIDE CLICK (FIXED)
  useEffect(() => {
    function handleClickOutside(e) {
      const clickedSim = simRef.current?.contains(e.target);
      const clickedMenu = menuRef.current?.contains(e.target);

      if (!clickedSim) setShowSimMenu(false);
      if (!clickedMenu) setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // VIEWER MODE
  const setViewerMode = (conn) => {
    setViewer(conn);
    setShowSimMenu(false);
  };

  const exitViewer = () => {
    setViewer(null);
    setShowSimMenu(false);
  };

  // SCROLL HIDE/SHOW
  useEffect(() => {
    const el = scrollRef?.current;
    if (!el) return;

    let last = 0;

    const handleScroll = () => {
      const current = el.scrollTop;

      if (current > last + 5) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      last = current;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <nav
      ref={navRef}
      className={`navbar ${visible ? "show" : "hide"} ${
        variant === "landing" ? "navbar-transparent" : "app"
      }`}
    >
      {/* LEFT */}
      <NavLink to="/" className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-name">PolyNet</span>
      </NavLink>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* SIMULATION TOOL */}
        {variant !== "landing" && (
          <div className="sim-wrapper" ref={simRef}>
            <FiShield
              size={20}
              className="sim-icon"
              onClick={() => setShowSimMenu((p) => !p)}
            />

            {showSimMenu && (
              <div className="sim-menu">
                <div className="sim-title">
                  {viewer
                    ? `Viewing as ${viewer.name} (${viewer.access})`
                    : "Owner Mode"}
                </div>

                {connections?.filter((c) => c.id !== viewer?.id)?.length ? (
                  connections
                    .filter((c) => c.id !== viewer?.id)
                    .map((conn) => (
                      <button key={conn.id} onClick={() => setViewerMode(conn)}>
                        {conn.name} ({conn.access})
                      </button>
                    ))
                ) : (
                  <div className="empty-state">No other connections</div>
                )}

                {viewer && (
                  <button className="exit-btn" onClick={exitViewer}>
                    Exit Viewer Mode
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS / MENU */}
        {variant === "landing" ? (
          <FiMenu
            size={24}
            onClick={() => setOpen((p) => !p)}
            className="hamburger-icon"
          />
        ) : (
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            {({ isActive }) =>
              isActive ? <FaCog size={25} /> : <FiSettings size={25} />
            }
          </NavLink>
        )}
      </div>

      {/* LANDING MENU */}
      {variant === "landing" && open && (
        <div ref={menuRef} className={`hamburger-menu ${open ? "show" : ""}`}>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)}>
            Sign Up
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/privacypolicy" onClick={() => setOpen(false)}>
            Privacy Policy
          </Link>
          <Link to="/identityguide" onClick={() => setOpen(false)}>
            Identity & Visibility
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
