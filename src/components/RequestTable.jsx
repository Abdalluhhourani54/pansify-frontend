import "../styles/adminDashboard.css";

export default function RequestsTable({ requests, onApprove, onReject }) {
  return (
    <div className="admin-requests">
      {requests.map((r) => {
        const statusLower = (r.status || "Pending").toLowerCase(); 

        return (
          <div className="request-card" key={r.id}>
            <div className="request-top">
              <div>
                <h3 className="request-title">{r.title}</h3>
                <p className="request-artist">{r.artist}</p>

                <p className="request-meta">
                  <span className="genre-pill">{r.genre}</span>
                  <span className="dot">•</span>
                  <span className="admin-muted">Requested by {r.email}</span>
                  <span className="dot">•</span>
                  <span className="admin-muted">{r.date}</span>
                </p>
              </div>

              <div className="request-right">
                <span className={`status-badge ${statusLower}`}>
                  {r.status}
                </span>

                {statusLower === "pending" && (
                  <div className="request-actions">
                    <button
                      className="approve-btn"
                      onClick={() => onApprove(r.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => onReject(r.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
