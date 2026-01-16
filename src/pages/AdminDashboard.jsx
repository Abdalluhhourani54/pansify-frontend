import { useState } from "react";
import "../styles/adminDashboard.css";

import SongsTable from "../components/SongsTable";
import RequestsTable from "../components/RequestTable";
import SongForm from "../components/SongForm";

import { adminSongs } from "../data/adminSongs";
import { adminRequests } from "../data/adminRequests";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("songs"); // "songs" | "requests"
  const [songs, setSongs] = useState(adminSongs);
  const [requests, setRequests] = useState(adminRequests);

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

  const saveSong = (song) => {
    setSongs((prev) => {
      const exists = prev.some((s) => s.id === song.id);
      if (exists) return prev.map((s) => (s.id === song.id ? song : s));
      return [song, ...prev];
    });

    closeForm();
  };

  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
  };

  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };

  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

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
            <SongForm onCancel={closeForm} onSave={saveSong} editingSong={editingSong} />
          )}

          <SongsTable songs={songs} onDelete={deleteSong} onEdit={openEditForm} />
        </>
      )}

      {activeTab === "requests" && (
        <RequestsTable
          requests={requests}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      )}
      </div>
    </div>
  );
}
