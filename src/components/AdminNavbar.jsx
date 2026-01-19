import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/navbar.css";
import logo from "../assets/Pansify logo.png";

export default function AdminNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const closeAll = () => {
    setProfileOpen(false);
  };

  // ✅ REAL LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user"); // remove admin user
    closeAll();
    navigate("/login"); // redirect to login
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <img className="nav-logo" src={logo} alt="Pansify logo" />
        <div className="nav-brand">
          <Link className="nav-title" to="/admin" onClick={closeAll}>
            Pansify
          </Link>
        </div>
      </div>

      <div className="nav-right">
        {/* Profile Dropdown */}
        <div className="dd" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-outline dd-trigger"
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            Profile <FaUserCircle /> <span>▾</span>
          </button>

          {profileOpen && (
            <div className="dd-menu">
              <button className="dd-item" type="button" onClick={handleLogout}>
                Logout <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
