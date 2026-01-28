import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaMusic,
  FaUser,
  FaTag,
  FaArrowLeft,
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/requestSong.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function RequestSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

  const [requests, setRequests] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const userEmail = user?.email || "";

  const loadMyRequests = async () => {
    if (!userEmail) return;
    setLoadingList(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/requests?email=${encodeURIComponent(userEmail)}`
      );

      const mapped = (Array.isArray(res.data) ? res.data : []).map((r) => ({
        ...r,
        date: r.date || (r.created_at ? String(r.created_at).slice(0, 10) : ""),
      }));

      setRequests(mapped);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to load your requests");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadMyRequests();
    
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("Please login first");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API_BASE}/api/requests`, {
        title: title.trim(),
        artist: artist.trim(),
        genre: genre.trim(),
        requester_email: userEmail,
      });

      alert("Request submitted ✅");

      setTitle("");
      setArtist("");
      setGenre("");

      await loadMyRequests();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rs-page">
      <div className="rs-container">
        <Link className="rs-back" to="/home">
          <FaArrowLeft /> Back to Songs
        </Link>

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
                  <FaUser />
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

            <button className="rs-btn" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>

        <div className="rs-card rs-card--list">
          <h2 className="rs-sectionTitle">Your Requests</h2>

          {loadingList ? (
            <p style={{ padding: "10px" }}>Loading your requests...</p>
          ) : (
            <div className="rs-list">
              {requests.length === 0 ? (
                <p style={{ padding: "10px" }}>No requests yet.</p>
              ) : (
                requests.map((r) => (
                  <div className="rs-item" key={r.id}>
                    <div className="rs-itemLeft">
                      <h3 className="rs-itemTitle">{r.title}</h3>
                      <p className="rs-itemArtist">{r.artist}</p>

                      <div className="rs-itemMeta">
                        <FaTag />
                        <span className="rs-metaDot">•</span>
                        <span className="rs-metaDate">
                          Requested on {r.date || ""}
                        </span>
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
                        {r.status === "Approved" ? (
                          <FaCheckCircle />
                        ) : r.status === "Rejected" ? (
                          <FaTimesCircle />
                        ) : (
                          <FaClock />
                        )}
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
