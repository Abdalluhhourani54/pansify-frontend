import SongCard from "../components/SongCard";
import { songs } from "../data/songs";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">Discover Music</h1>
        <p className="home__subtitle">Browse and review your favorite songs</p>
      </div>

      <div className="home__grid">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
