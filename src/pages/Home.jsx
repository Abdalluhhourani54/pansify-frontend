import { useEffect, useState } from "react";
import axios from "axios";

import SongCard from "../components/SongCard";

import "../styles/home.css";

export default function Home({ selectedGenre }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/songs")
      .then((res) => {
        const mapped = res.data.map((song) => ({
        ...song,
        cover: song.cover_url ? `http://localhost:5000${song.cover_url}` : "",
}));

setSongs(mapped);


      })
      .catch((err) => {
        console.log(err);
      });
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

      <div className="home__grid">
        {filteredSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
