import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminDashboard.css";

import SongsTable from "../components/SongsTable";
import RequestsTable from "../components/RequestTable";
import SongForm from "../components/SongForm";

const API_BASE = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("songs");
  const [songs, setSongs] = useState([]);

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState(null);

  const adminHeaders = { "x-role": "admin" };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/songs`);
      const mapped = (Array.isArray(res.data) ? res.data : []).map((s) => ({
        ...s,
        cover: s.cover || s.cover_url || s.cover_path || "",
        rating: Number(s.avg_rating ?? s.rating ?? 0),
        reviews: Number(s.reviews_count ?? s.reviews ?? 0),
      }));
      setSongs(mapped);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert("Failed to load songs");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const openAddForm = () => {
    setEditingSong(null);
    setShowForm(true);
  };

  const openEditForm = (song) => {
    setEditingSong(song);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingSong(null);
    setShowForm(false);
  };

  const saveSong = async (songData) => {
    try {
      const fd = new FormData();
      fd.append("title", songData.title);
      fd.append("artist", songData.artist);
      fd.append("genre", songData.genre || "");

      if (songData.coverFile) {
        fd.append("cover", songData.coverFile);
      }

      if (editingSong && !songData.coverFile) {
        fd.append("existing_cover", editingSong.cover || "");
      }

      if (!editingSong) {
        await axios.post(`${API_BASE}/api/songs`, fd, {
          headers: { ...adminHeaders, "Content-Type": "multipart/form-data" },
        });
        alert("Song added ✅");
      } else {
        await axios.put(`${API_BASE}/api/songs/${editingSong.id}`, fd, {
          headers: { ...adminHeaders, "Content-Type": "multipart/form-data" },
        });
        alert("Song updated ✅");
      }

      closeForm();
      fetchSongs();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to save song");
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/songs/${id}`, { headers: adminHeaders });
      fetchSongs();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to delete song");
    }
  };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await axios.get(`${API_BASE}/api/requests`, {
        headers: adminHeaders,
      });
      const mapped = (Array.isArray(res.data) ? res.data : []).map((r) => ({
        ...r,
        date: r.date || (r.created_at ? String(r.created_at).slice(0, 10) : ""),
      }));
      setRequests(mapped);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to load requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/api/requests/${id}/approve`,
        {},
        { headers: adminHeaders }
      );
      fetchRequests();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to approve request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/api/requests/${id}/reject`,
        {},
        { headers: adminHeaders }
      );
      fetchRequests();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to reject request");
    }
  };

  useEffect(() => {
    if (activeTab === "requests") fetchRequests();
  }, [activeTab]);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "songs" ? "active" : ""}`}
            onClick={() => setActiveTab("songs")}
          >
            Manage Songs
          </button>

          <button
            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Song Requests
          </button>
        </div>

        {activeTab === "songs" && (
          <>
            <button className="add-song-btn" onClick={openAddForm}>
              + Add New Song
            </button>

            {showForm && (
              <SongForm
                onCancel={closeForm}
                onSave={saveSong}
                editingSong={editingSong}
              />
            )}

            <SongsTable songs={songs} onDelete={deleteSong} onEdit={openEditForm} />
          </>
        )}

        {activeTab === "requests" && (
          <>
            {loadingRequests ? (
              <p style={{ padding: "10px" }}>Loading requests...</p>
            ) : (
              <RequestsTable
                requests={requests}
                onApprove={approveRequest}
                onReject={rejectRequest}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
