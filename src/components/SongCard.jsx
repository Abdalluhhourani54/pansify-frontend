import { Link } from "react-router-dom";
import "../styles/songCard.css";

function renderStars(rating) {
  const full = Math.floor(rating); // 4.5 -> 4
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const filled = i <= full;
    stars.push(
      <span key={i} className={filled ? "star star--filled" : "star"}>
        ★
      </span>
    );
  }

  return stars;
}

export default function SongCard({ song }) {
  return (
    <div className="song-card">
      <div className="song-card__imageWrap">
        <img className="song-card__img" src={song.cover} alt={song.title} />
        <span className="song-card__genreBadge">{song.genre}</span>
      </div>

      <div className="song-card__body">
        <h3 className="song-card__title">{song.title}</h3>
        <p className="song-card__artist">{song.artist}</p>

        <div className="song-card__ratingRow">
          <div className="song-card__stars">{renderStars(song.rating)}</div>
          <span className="song-card__reviews">({song.reviews})</span>
        </div>

        <Link className="song-card__btn" to={`/song/${song.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
