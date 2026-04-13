import "./Navbar.css";
import logo from "../assets/logo.png";
import { FiSettings, FiMenu } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar({ variant = "app" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) && // menu itself
        navRef.current &&
        !navRef.current.contains(event.target) // navbar container
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef}
      className={`navbar ${variant === "landing" ? "navbar-transparent" : "app"}`}
    >
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-name">PolyNet</span>
      </div>
      <div className="navbar-right">
        {variant === "landing" ? (
          <FiMenu
            size={24}
            onClick={() => setOpen(!open)}
            className="hamburger-icon"
          />
        ) : (
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "navbar-item active" : "navbar-item"
            }
          >
            <FiSettings size={24} />
          </NavLink>
        )}
      </div>

      {variant === "landing" && open && (
        <div ref={menuRef}  className={`hamburger-menu ${open ? "show" : ""}`}>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setOpen(false)}>
            Sign Up
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/privacy" onClick={() => setOpen(false)}>
            Privacy Policy
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
