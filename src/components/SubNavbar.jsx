import "./SubNavbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { HiOutlineBell, HiBell } from "react-icons/hi";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";


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
            isActive ? <HiHome size={32} /> : <HiOutlineHome size={30} />
          }
        </NavLink>

        <NavLink
          to="/connectionpage"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiUserGroup size={32} /> : <HiOutlineUserGroup size={30} />
          }
        </NavLink>
      </div>

      {/* Center search */}
      <div className="sub-navbar-center">
        <FiSearch size={22} />
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
            isActive ? <HiBell size={32} /> : <HiOutlineBell size={30} />
          }
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiUser size={32} /> : <HiOutlineUser size={30} />
          }
        </NavLink>
      </div>
    </div>
  );
}

export default SubNavbar;
