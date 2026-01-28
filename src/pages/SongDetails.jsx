import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";

import Stars from "../components/Stars";
import "../styles/songDetails.css";

emailjs.init("0C8pGxXGQJfclzwjf");

const API_BASE = import.meta.env.VITE_API_URL;

export default function SongDetails() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const userEmail = (user?.email || "").trim().toLowerCase();
  const userName = (user?.full_name || user?.fullName || user?.name || "User").trim();

 
  const alreadyReviewed = useMemo(() => {
    if (!userEmail) return false;
    return reviews.some(
      (r) => String(r.reviewer_email || "").trim().toLowerCase() === userEmail
    );
  }, [reviews, userEmail]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/songs/${id}`)
      .then((res) => {
        const s = res.data;
        const mappedSong = {
          ...s,
          cover: s.cover_url ? `${API_BASE}${s.cover_url}` : "",
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
      .get(`${API_BASE}/api/songs/${id}/reviews`)
      .then((res) => {
        setReviews(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
        setReviews([]);
      });
  };

  useEffect(() => {
    fetchReviews();
   
  }, [id]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length
      : 0;

 
  const sendThankYouEmail = () => {
    if (!userEmail) return;

    emailjs
      .send("service_rhf3lv7", "template_6b8ps9s", {
        user_email: userEmail,
        user_name: userName,
        song_title: song?.title || "",
        rating: userRating,
        comment: userComment || "No comment provided",
      })
      .then(
        (result) => console.log("SUCCESS!", result.text),
        (error) => console.error("FAILED...", error.text)
      );
  };

  
  const submitReview = async () => {
    if (!userEmail) {
      alert("Please login first to submit a review.");
      return;
    }

    if (alreadyReviewed) {
      alert("You already reviewed this song. You can only rate once.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${API_BASE}/api/songs/${id}/reviews`, {
        reviewer_name: userName,
        reviewer_email: userEmail,
        rating: userRating,
        comment: userComment,
      });

      alert("Thank you for rating this song!");
      sendThankYouEmail();

      setUserRating(0);
      setUserComment("");
      fetchReviews();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
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

      <div className="sd-card">
        <h2 className="sd-cardTitle">Add Your Review</h2>

        {!userEmail ? (
          <p style={{ padding: "10px" }}>
            You must <Link to="/login">login</Link> to submit a review.
          </p>
        ) : alreadyReviewed ? (
          <p style={{ padding: "10px" }}>
            ✅ You already reviewed this song. You can only rate once.
          </p>
        ) : (
          <>
            <div className="sd-field">
              <label className="sd-label">Your Rating</label>

              <div className="sd-starInput">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= userRating ? "sd-star sd-star--filled" : "sd-star"
                    }
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
              disabled={userRating === 0 || submitting}
              onClick={submitReview}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </>
        )}
      </div>

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
