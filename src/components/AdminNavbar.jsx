import { Link } from "react-router-dom";
import { useState } from "react";
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
        {/* Genre Dropdown */}
        <div className="dd">
          <button
            className="btn dd-trigger"
            type="button"
            onClick={() => { setGenreOpen(!genreOpen); setProfileOpen(false); }}
          >
            {selectedGenre} <span>▾</span>
          </button>

          {genreOpen && (
            <div className="dd-menu genres">
              {GENRES.map((g) => (
                <button key={g} className="dd-item" type="button" onClick={() => handlePickGenre(g)}>
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown (Admin Dashboard + Logout) */}
        <div className="dd">
          <button
            className="btn btn-outline dd-trigger"
            type="button"
            onClick={() => { setProfileOpen(!profileOpen); setGenreOpen(false); }}
          >
            Profile <span>▾</span>
          </button>

          {profileOpen && (
            <div className="dd-menu">
              <Link className="nav-link" to="/admin" onClick={closeAll}>
                <div className="dd-item">Admin Dashboard</div>
              </Link>

              <div className="dd-sep" />

              <button className="dd-item" type="button" onClick={() => { alert("Logout UI only"); closeAll(); }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
