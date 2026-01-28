import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/adminDashboard.css";

const API_BASE = "http://localhost:5000";

function getCoverSrc(song) {
  const raw = song.cover || song.cover_url || song.cover_path || "";
  if (!raw) return "";

  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;


  if (!raw.includes("/")) return `${API_BASE}/uploads/${raw}`;


  if (raw.startsWith("/uploads")) return `${API_BASE}${raw}`;
  if (raw.startsWith("uploads")) return `${API_BASE}/${raw}`;

  
  return raw;
}

export default function SongsTable({ songs, onDelete, onEdit }) {
  return (
    <div className="admin-table-card">
      <div className="admin-table-header">
        <div>Cover</div>
        <div>Title</div>
        <div>Artist</div>
        <div>Genre</div>
        <div>Rating</div>
        <div>Reviews</div>
        <div>Actions</div>
      </div>

      {songs.map((song) => {
        const rating = Number(song.rating ?? 0);
        const reviews = Number(song.reviews ?? 0);
        const coverSrc = getCoverSrc(song);

        return (
          <div className="admin-table-row" key={song.id}>
            <div>
              {coverSrc ? (
                <img className="admin-cover" src={coverSrc} alt={song.title} />
              ) : (
                <div className="admin-cover" style={{ display: "grid", placeItems: "center" }}>
                  N/A
                </div>
              )}
            </div>

            <div className="cell-title">
              <p className="admin-song-title">{song.title}</p>
            </div>

            <div className="cell-artist">
              <p className="admin-muted">{song.artist}</p>
            </div>

            <div>
              <span className="genre-pill">{song.genre}</span>
            </div>

            <div className="admin-rating">{rating.toFixed(1)}</div>
            <div className="admin-muted">{reviews}</div>

            <div className="row-actions">
              <button className="icon-btn edit-btn" onClick={() => onEdit(song)}>
                <FaEdit />
              </button>
              <button className="icon-btn delete-btn" onClick={() => onDelete(song.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
