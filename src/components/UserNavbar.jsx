import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";
import logo from "../assets/Pansify logo.png";

const GENRES = ["All", "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Country", "Classical"];

export default function UserNavbar() {
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
    <header className="navbar" onClick={() => { /* click outside handled by stopping propagation below */ }}>
      <div className="nav-left">
        {/* Put your logo later in assets; for now we can keep text only */}
         <img className="nav-logo" src={logo} alt="Pansify logo" />
        <div className="nav-brand">
          <Link className="nav-title" to="/home">Pansify</Link>
        </div>
      </div>

      <div className="nav-right">
        {/* Genre Dropdown */}
        <div className="dd" onClick={(e) => e.stopPropagation()}>
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

        {/* Request Song Button */}
        <Link className="nav-link" to="/request-song">
          <button className="btn btn-primary" type="button" onClick={closeAll}>
            Request Song
          </button>
        </Link>

        {/* Profile Dropdown */}
        <div className="dd" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-outline dd-trigger"
            type="button"
            onClick={() => { setProfileOpen(!profileOpen); setGenreOpen(false); }}
          >
            Profile <span>▾</span>
          </button>

          {profileOpen && (
            <div className="dd-menu">
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
