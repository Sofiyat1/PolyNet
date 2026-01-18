import './SubNavbar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiSearch } from 'react-icons/fi';
import { FaHome, FaUsers, FaUser, FaUserCircle } from 'react-icons/fa';

function SubNavbar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="sub-navbar">
      {/* Left icons */}
      <div className="sub-navbar-left">
        <NavLink to="/" className={({ isActive }) => isActive ? "sub-navbar-item active" : "sub-navbar-item"}>
          {({ isActive }) => isActive ? <FaHome size={24} /> : <FiHome size={24} />}
        </NavLink>

        <NavLink to="/network" className={({ isActive }) => isActive ? "sub-navbar-item active" : "sub-navbar-item"}>
          {({ isActive }) => isActive ? <FaUsers size={24} /> : <FiUsers size={24} />}
        </NavLink>
      </div>

      {/* Center search */}
      <div className="sub-navbar-center">
        <FiSearch size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Right user icon */}
      <div className="sub-navbar-right">
        <NavLink to="/profile" className={({ isActive }) => isActive ? "sub-navbar-item active" : "sub-navbar-item"}>
          {({ isActive }) => isActive ? <FaUser size={24} /> : <FaUserCircle size={24} />}
        </NavLink>
      </div>
    </div>
  );
}

export default SubNavbar;
