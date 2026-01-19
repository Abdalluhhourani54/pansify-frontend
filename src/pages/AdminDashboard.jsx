import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminDashboard.css";

import SongsTable from "../components/SongsTable";
import RequestsTable from "../components/RequestTable";
import SongForm from "../components/SongForm";

import { adminSongs } from "../data/adminSongs";
// ✅ remove adminRequests import because now we load from backend

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("songs"); // "songs" | "requests"
  const [songs, setSongs] = useState(adminSongs);

  // ✅ requests now come from backend
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState(null);

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

  // ✅ songs logic stays same (UI only)
  const saveSong = (song) => {
    setSongs((prev) => {
      const exists = prev.some((s) => s.id === song.id);
      if (exists) return prev.map((s) => (s.id === song.id ? song : s));
      return [song, ...prev];
    });

    closeForm();
  };

  // ✅ songs logic stays same (UI only)
  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
  };

  // -----------------------------
  // ✅ Requests (Backend Connected)
  // -----------------------------

  const adminHeaders = { "x-role": "admin" };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests", {
        headers: adminHeaders,
      });

      // map created_at to date for your UI
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
        `http://localhost:5000/api/requests/${id}/approve`,
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
        `http://localhost:5000/api/requests/${id}/reject`,
        {},
        { headers: adminHeaders }
      );
      fetchRequests();
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Failed to reject request");
    }
  };

  // ✅ load requests ONLY when switching to requests tab
  useEffect(() => {
    if (activeTab === "requests") {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
