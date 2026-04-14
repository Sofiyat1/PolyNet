import "./SubNavbar.css";
import { NavLink } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { HiOutlineBell, HiBell } from "react-icons/hi";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

function SubNavbar({ visible }) {

  return (
    <div className={`sub-navbar ${visible ? "" : "hide"}`}>
      <div className="sub-navbar-icons">
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiHome size={30} /> : <HiOutlineHome size={30} />
          }
        </NavLink>

        <NavLink
          to="/connectionpage"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <HiUserGroup size={30} />
            ) : (
              <HiOutlineUserGroup size={30} />
            )
          }
        </NavLink>

        <NavLink to="/addpostpage" className="post-btn">
          <FiPlus size={32} />
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiBell size={30} /> : <HiOutlineBell size={30} />
          }
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "sub-navbar-item active" : "sub-navbar-item"
          }
        >
          {({ isActive }) =>
            isActive ? <HiUser size={30} /> : <HiOutlineUser size={30} />
          }
        </NavLink>
      </div>
    </div>
  );
}

export default SubNavbar;
