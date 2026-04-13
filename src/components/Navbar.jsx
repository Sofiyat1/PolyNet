import "./Navbar.css";
import logo from "../assets/logo.png";
import { FiSettings, FiMenu } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar({ variant = "app", scrollRef }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
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

  //Scroll-aware effect
  useEffect(() => {
    const scrollEl = scrollRef?.current;

    if (!scrollEl) return;

    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = scrollEl.scrollTop;

      if (currentScrollY > lastScrollY + 5) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    scrollEl.addEventListener("scroll", handleScroll);

    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <nav
      ref={navRef}
      className={`navbar ${visible ? "show" : "hide"} ${variant === "landing" ? "navbar-transparent" : "app"}`}
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
            {({ isActive }) =>
              isActive ? <FaCog size={32} /> : <FiSettings size={30} />
            }
          </NavLink>
        )}
      </div>

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
          <Link to="/privacy" onClick={() => setOpen(false)}>
            Privacy Policy
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
