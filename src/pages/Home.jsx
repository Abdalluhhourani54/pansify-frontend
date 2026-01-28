import { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";
import "../styles/home.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Home({ selectedGenre }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/songs`)
      .then((res) => {
        const mapped = res.data.map((song) => ({
          ...song,
          cover: song.cover_url ? `${API_BASE}${song.cover_url}` : "",
        }));
        setSongs(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredSongs =
    selectedGenre === "All"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Discover Music</h1>
        <p className="home__subtitle">Browse and review your favorite songs</p>
      </div>

      <div className="home__grid row g-3">
        {filteredSongs.map((song) => (
          <div key={song.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
}
