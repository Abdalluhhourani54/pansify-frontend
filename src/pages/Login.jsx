import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "../styles/auth.css";

import logo from "../assets/Pansify logo.png";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img className="auth-logo" src={logo} alt="Pansify" />
        </div>

        <h1 className="auth-title">Welcome Back</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <div className="auth-input">
              <span className="auth-icon">
                <MdEmail />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input">
              <span className="auth-icon">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link className="auth-link" to="/register">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
