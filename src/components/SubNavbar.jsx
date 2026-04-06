import "./SubNavbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { HiOutlineBell, HiBell } from "react-icons/hi";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { FiHome, FiUsers, FiSearch } from "react-icons/fi";
import { FaHome, FaUsers, FaUser, FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";

function SubNavbar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="sub-navbar">
      {/* Left icons */}
      <div className="sub-navbar-left">
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiHome size={24} /> : <HiOutlineHome size={24} />
          }
        </NavLink>

        <NavLink
          to="/network"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiUserGroup size={24} /> : <HiOutlineUserGroup size={24} />
          }
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
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiBell size={24} /> : <HiOutlineBell size={24} />
          }
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiUser size={24} /> : <HiOutlineUser size={24} />
          }
        </NavLink>
      </div>
    </div>
  );
}

export default SubNavbar;
