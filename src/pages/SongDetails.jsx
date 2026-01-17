import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
emailjs.init("0C8pGxXGQJfclzwjf");


import { songs } from "../data/songs";
import Stars from "../components/Stars";
import "../styles/songDetails.css";

export default function SongDetails() {
  const { id } = useParams();
  const songId = parseInt(id);
  const song = songs.find((s) => s.id === songId);

  if (!song) {
    return (
      <div className="song-details">
        <h1 className="sd-title">Song not found</h1>
        <Link className="sd-back" to="/home">Back to Home</Link>
      </div>
    );
  }

  // Static reviews (UI only)
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      date: "2025-12-10",
      rating: 5,
      text: "Absolutely amazing track! The production is incredible and it never gets old."
    },
    {
      id: 2,
      name: "Maria Garcia",
      date: "2025-12-09",
      rating: 4,
      text: "Great song overall. The vocals are strong and the beat is catchy."
    },
    {
      id: 3,
      name: "Ahmad",
      date: "2025-12-08",
      rating: 4,
      text: "Nice vibes. I enjoy it especially while driving."
    },
  ];

  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");


  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // ✅ EMAILJS FUNCTION
  const sendThankYouEmail = () => {
  emailjs
    .send(
      "service_rhf3lv7",
      "template_6b8ps9s",
      {
        user_email: "abdullahhourani475@gmail.com",
        song_title: song.title,
        rating: userRating,
        comment: userComment || "No comment provided",
      }
    )
    .then(
      (result) => {
        console.log("SUCCESS!", result.text);
        alert("Email sent successfully!");
      },
      (error) => {
        console.error("FAILED...", error.text);
        alert("Email failed to send");
      }
    );
};

  return (
    <div className="song-details">
      <Link className="sd-back" to="/home">← Back</Link>

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
                className={
                  star <= userRating
                    ? "sd-star sd-star--filled"
                    : "sd-star"
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
          disabled={userRating === 0}
          onClick={() => {
            alert("Thank you for rating this song!");
            sendThankYouEmail();
          }}
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
                    <div className="sd-reviewName">{r.name}</div>
                    <Stars value={r.rating} big />
                  </div>

                  <div className="sd-reviewDate">{r.date}</div>
                </div>

                <p className="sd-reviewText">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
