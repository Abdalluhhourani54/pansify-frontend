import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SongDetails from "./pages/SongDetails";
import RequestSong from "./pages/RequestSong";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import NotFound from "./pages/NotFound";

import "./styles/routerNav.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Temporary nav فقط للتجربة — later we replace it with User/Admin Navbars */}
      
      <nav className="router-nav">
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/request-song">Request Song</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/requests">Admin Requests</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/song/:id" element={<SongDetails />} />
        <Route path="/request-song" element={<RequestSong />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
