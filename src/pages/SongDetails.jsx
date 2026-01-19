import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

import Stars from "../components/Stars";
import "../styles/songDetails.css";

emailjs.init("0C8pGxXGQJfclzwjf");

export default function SongDetails() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/songs/${id}`)
      .then((res) => {
        const s = res.data;
        const mappedSong = {
          ...s,
          cover: s.cover_url ? `http://localhost:5000${s.cover_url}` : "",
        };
        setSong(mappedSong);
      })
      .catch((err) => {
        console.log(err);
        setSong(null);
      });
  }, [id]);

  const fetchReviews = () => {
    axios
      .get(`http://localhost:5000/api/songs/${id}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
        setReviews([]);
      });
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length
      : 0;

      
  const sendThankYouEmail = () => {
    emailjs
      .send("service_rhf3lv7", "template_6b8ps9s", {
        user_email: "abdullahhourani475@gmail.com",
        song_title: song?.title || "",
        rating: userRating,
        comment: userComment || "No comment provided",
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  const submitReview = () => {
    axios
      .post(`http://localhost:5000/api/songs/${id}/reviews`, {
        reviewer_name: "Guest",
        reviewer_email: "guest@pansify.com",
        rating: userRating,
        comment: userComment,
      })
      .then(() => {
        alert("Thank you for rating this song!");
        sendThankYouEmail();
        setUserRating(0);
        setUserComment("");
        fetchReviews();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to submit review");
      });
  };

  if (!song) {
    return (
      <div className="song-details">
        <h1 className="sd-title">Song not found</h1>
        <Link className="sd-back" to="/home">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="song-details">
      <Link className="sd-back" to="/home">
        ← Back
      </Link>

      {/* TOP CARD */}
      <div className="sd-topCard">
        <div className="sd-coverWrap">
          <img className="sd-cover" src={song.cover} alt={song.title} />
        </div>

        <div className="sd-info">
          <h1 className="sd-title">{song.title}</h1>
          <p className="sd-artist">{song.artist}</p>

          <div className="sd-avgCard">
            <p className="sd-avgLabel">Average Rating</p>

            <div className="sd-avgRow">
              <Stars value={avgRating} />
              <span className="sd-avgNumber">{avgRating.toFixed(1)}</span>
              <span className="sd-avgMeta">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADD REVIEW */}
      <div className="sd-card">
        <h2 className="sd-cardTitle">Add Your Review</h2>

        <div className="sd-field">
          <label className="sd-label">Your Rating</label>

          <div className="sd-starInput">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= userRating ? "sd-star sd-star--filled" : "sd-star"}
                onClick={() => setUserRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="sd-field">
          <label className="sd-label">Your Comment</label>
          <textarea
            className="sd-textarea"
            placeholder="Share your thoughts about this song..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
        </div>

        <button
          className="sd-btn"
          type="button"
          disabled={userRating === 0}
          onClick={submitReview}
        >
          Submit Review
        </button>
      </div>

      {/* REVIEWS LIST */}
      <div className="sd-card">
        <h2 className="sd-cardTitle">Reviews ({reviews.length})</h2>

        <div className="sd-reviews">
          {reviews.map((r) => (
            <div key={r.id} className="sd-review">
              <div className="sd-reviewLeft">
                <div className="sd-avatar">👤</div>
              </div>

              <div className="sd-reviewBody">
                <div className="sd-reviewTop">
                  <div>
                    <div className="sd-reviewName">{r.reviewer_name}</div>
                    <Stars value={Number(r.rating || 0)} big />
                  </div>

                  <div className="sd-reviewDate">
                    {r.created_at ? String(r.created_at).slice(0, 10) : ""}
                  </div>
                </div>

                <p className="sd-reviewText">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
