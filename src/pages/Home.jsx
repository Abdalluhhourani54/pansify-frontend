import SongCard from "../components/SongCard";
import { songs } from "../data/songs";
import "../styles/home.css";

export default function Home({ selectedGenre }) {
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
