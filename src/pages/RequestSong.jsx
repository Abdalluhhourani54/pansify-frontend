import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMusic, FaUser, FaTag, FaArrowLeft,FaClock,FaTimesCircle,FaCheckCircle } from "react-icons/fa";
import "../styles/requestSong.css";

export default function RequestSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Lose Yourself",
      artist: "Eminem",
      genre: "Hip Hop",
      date: "2025-12-05",
      status: "Approved",
    },
    {
      id: 2,
      title: "Someone Like You",
      artist: "Adele",
      genre: "Pop",
      date: "2025-12-10",
      status: "Pending",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      title: title.trim(),
      artist: artist.trim(),
      genre: genre.trim(),
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
    };

    setRequests([newRequest, ...requests]);

    setTitle("");
    setArtist("");
    setGenre("");
  };

  return (
    <div className="rs-page">
      <div className="rs-container">
        <Link className="rs-back" to="/home">
            
                <FaArrowLeft />   Back to Songs
        </Link>

        {/* FORM CARD */}
        <div className="rs-card">
          <h1 className="rs-title">Request a Song</h1>
          <p className="rs-subtitle">
            Can't find a song you want to review? Request it here and our admin team
            will add it to the database.
          </p>

          <form className="rs-form" onSubmit={handleSubmit}>
            <div className="rs-field">
              <label className="rs-label">Song Title</label>
              <div className="rs-inputWrap">

                <span className="rs-icon">
                <FaMusic />
                </span>

                <input
                  className="rs-input"
                  placeholder="Enter song title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="rs-field">
              <label className="rs-label">Artist Name</label>
              <div className="rs-inputWrap">
                <span className="rs-icon">
                 <FaUser/>
                </span>

                <input
                  className="rs-input"
                  placeholder="Enter artist name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="rs-field">
              <label className="rs-label">Genre</label>
              <div className="rs-inputWrap">

                <span className="rs-icon">
                <FaTag />
                </span>

                <input
                  className="rs-input"
                  placeholder="e.g. Pop, Rock, Hip Hop"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="rs-btn" type="submit">
              Submit Request
            </button>
          </form>
        </div>

        {/* REQUESTS LIST */}
        <div className="rs-card rs-card--list">
          <h2 className="rs-sectionTitle">Your Requests</h2>

          <div className="rs-list">
            {requests.map((r) => (
              <div className="rs-item" key={r.id}>
                <div className="rs-itemLeft">
                  <h3 className="rs-itemTitle">{r.title}</h3>
                  <p className="rs-itemArtist">{r.artist}</p>

                  <div className="rs-itemMeta">
                    
                <FaTag />
   
                    <span className="rs-metaDot">•</span>
                    <span className="rs-metaDate">Requested on {r.date}</span>
                  </div>
                </div>

                <div className="rs-itemRight">
                  <span
                    className={
                      r.status === "Approved"
                        ? "rs-badge rs-badge--approved"
                        : r.status === "Rejected"
                        ? "rs-badge rs-badge--rejected"
                        : "rs-badge rs-badge--pending"
                    }
                  >
                    {r.status === "Approved" ? <FaCheckCircle /> : r.status === "Rejected" ? <FaTimesCircle />  : <FaClock /> }
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
