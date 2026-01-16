import "../styles/stars.css";

export default function Stars({ value = 0, small = false }) {
  const full = Math.floor(value);

  return (
    <div className={small ? "stars stars--small" : "stars"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full ? "star star--filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}
