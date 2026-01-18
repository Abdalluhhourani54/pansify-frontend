import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/songCard.css";

function renderStars(rating) {
  const full = Math.floor(rating || 0);
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
  const [rating, setRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/songs/${song.id}/reviews`)
      .then((res) => {
        if (res.data.length > 0) {
          const total = res.data.reduce((sum, r) => sum + r.rating, 0);
          setRating(total / res.data.length);
          setReviewsCount(res.data.length);
        } else {
          setRating(0);
          setReviewsCount(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [song.id]);

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
          <div className="song-card__stars">{renderStars(rating)}</div>
          <span className="song-card__reviews">({reviewsCount})</span>
        </div>

        <Link className="song-card__btn" to={`/song/${song.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
