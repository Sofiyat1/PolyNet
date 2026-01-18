import "./Navbar.css";
import logo from "../assets/polynetLogo.jpg"; 
import { FiSettings } from "react-icons/fi"; 
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-name">PolyNet</span>
      </div>
      <div className="navbar-right">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "navbar-item active" : "navbar-item"
          }
        >
          <FiSettings size={24} />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
