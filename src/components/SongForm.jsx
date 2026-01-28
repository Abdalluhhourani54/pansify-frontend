import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";

const GENRES = ["Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Country", "Classical"];

export default function SongForm({ onCancel, onSave, editingSong }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("Pop");
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (editingSong) {
      setTitle(editingSong.title || "");
      setArtist(editingSong.artist || "");
      setGenre(editingSong.genre || "Pop");
      setCoverFile(null);
    } else {
      setTitle("");
      setArtist("");
      setGenre("Pop");
      setCoverFile(null);
    }
  }, [editingSong]);

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!editingSong && !coverFile) {
      alert("Please upload a cover image");
      return;
    }

    onSave({
      title: title.trim(),
      artist: artist.trim(),
      genre: genre.trim(),
      coverFile, 
    });

    setTitle("");
    setArtist("");
    setGenre("Pop");
    setCoverFile(null);
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <h3 className="song-form-title">
        {editingSong ? "Edit Song" : "Add New Song to Home Page"}
      </h3>

      <div className="form-stack">
        <div className="form-item">
          <label>Song Title *</label>
          <input
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label>Artist Name *</label>
          <input
            placeholder="Enter artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="form-item">
          <label>Genre *</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-item">
          <label>Upload Cover Image {editingSong ? "(optional)" : "*"}</label>

          <div className="file-row">
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
          </div>

          <p className="help-text">
            {editingSong
              ? "Choose a new image only if you want to replace the old cover."
              : "Upload an image file (JPG, PNG, etc.)"}
          </p>
        </div>
      </div>

      <div className="form-actions form-actions-wide">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>

        <button
          type="submit"
          className={`primary-btn ${editingSong ? "primary-blue" : "primary-green"}`}
        >
          {editingSong ? "Save Changes" : "Add Song to Home Page"}
        </button>
      </div>
    </form>
  );
}
