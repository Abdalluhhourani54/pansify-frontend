import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/navbar.css";
import logo from "../assets/Pansify logo.png";


const GENRES = ["All", "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Country", "Classical"];

export default function AdminNavbar() {
  const [genreOpen, setGenreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const closeAll = () => {
    setGenreOpen(false);
    setProfileOpen(false);
  };

  const handlePickGenre = (g) => {
    setSelectedGenre(g);
    setGenreOpen(false);
  };

  return (
    <header className="navbar" onClick={closeAll}>
      <div className="nav-left" onClick={(e) => e.stopPropagation()}>
        <img className="nav-logo" src={logo} alt="Pansify logo" />
        <div className="nav-brand">
          <Link className="nav-title" to="/admin">Pansify</Link>
          
        </div>
      </div>

      <div className="nav-right" onClick={(e) => e.stopPropagation()}>
    
        {/* Profile Dropdown (Admin Dashboard + Logout) */}
        <div className="dd">
          <button
            className="btn btn-outline dd-trigger"
            type="button"
            onClick={() => { setProfileOpen(!profileOpen); setGenreOpen(false); }}
          >
            Profile <FaUserCircle />
               
                
                <span>▾</span>
          </button>

          {profileOpen && (
            <div className="dd-menu">
             

              <div className="dd-sep" />

              <button className="dd-item" type="button" onClick={() => { alert("Logout UI only"); closeAll(); }}>
                 Logout
                
                <FaSignOutAlt />
               
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
