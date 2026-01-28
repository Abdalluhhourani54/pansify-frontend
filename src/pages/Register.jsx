import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import "../styles/auth.css";

import logo from "../assets/Pansify logo.png";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/api/auth/signup`, {
        full_name: fullName,
        email,
        password,
        role: "user", 
      });

      alert("Account created ✅ Please login now");
      navigate("/login");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Register failed");
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

        <h1 className="auth-title">Create Account</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Full Name</label>
            <div className="auth-input">
              <span className="auth-icon">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link className="auth-link" to="/login">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
