import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/adminDashboard.css";

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

      {songs.map((song) => (
        <div className="admin-table-row" key={song.id}>
          <div>
            <img className="admin-cover" src={song.cover} alt={song.title} />
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

          <div className="admin-rating">{song.rating.toFixed(1)}</div>
          <div className="admin-muted">{song.reviews}</div>

          {/* ✅ changed class name here */}
          <div className="row-actions">
            <button className="icon-btn edit-btn" onClick={() => onEdit(song)}>
              <FaEdit />
            </button>
            <button className="icon-btn delete-btn" onClick={() => onDelete(song.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
