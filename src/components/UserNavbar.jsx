import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import "../styles/navbar.css";
import logo from "../assets/Pansify logo.png";

const GENRES = [
  "All",
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Country",
  "Classical",
];

export default function UserNavbar({ selectedGenre, onGenreChange }) {
  const [genreOpen, setGenreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const closeAll = () => {
    setGenreOpen(false);
    setProfileOpen(false);
  };

  const handlePickGenre = (g) => {
    onGenreChange(g);
    setGenreOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    closeAll();
    navigate("/login"); 
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <img className="nav-logo" src={logo} alt="Pansify logo" />
        <div className="nav-brand">
          <Link className="nav-title" to="/home" onClick={closeAll}>
            Pansify
          </Link>
        </div>
      </div>

      <div className="nav-right">
       
       <div className="dd" onClick={(e) => e.stopPropagation()}>
  <button
    className="pbtn dd-trigger"
    type="button"
    onClick={() => {
      setGenreOpen(!genreOpen);
      setProfileOpen(false);
    }}
  >
    {selectedGenre} <span>▾</span>
  </button>

  {genreOpen && (
    <div className="dd-menu genres">
      {GENRES.map((g) => (
        <button
          key={g}
          className="dd-item"
          type="button"
          onClick={() => handlePickGenre(g)}
        >
          {g}
        </button>
      ))}
    </div>
  )}
</div>


       
       <Link className="nav-link" to="/request-song" onClick={closeAll}>
  <button className="pbtn pbtn-primary" type="button">
    Request Song
  </button>
</Link>


       
  <div className="dd" onClick={(e) => e.stopPropagation()}>
  <button
   className="pbtn pbtn-outline dd-trigger"
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
