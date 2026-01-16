// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Navbars
import UserNavBar from "./components/UserNavbar";
import AdminNavBar from "./components/AdminNavbar";

// Pages
import Home from "./pages/Home";
import SongDetails from "./pages/SongDetails";
import RequestSong from "./pages/RequestSong";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import NotFound from "./pages/NotFound";

function Layout({ children, selectedGenre, setSelectedGenre }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // hide navbar on auth pages
  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && (
        isAdminRoute ? (
          <AdminNavBar />
        ) : (
          <UserNavBar
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        )
      )}

      <div className="app-content">{children}</div>
    </>
  );
}

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  return (
    <BrowserRouter>
      <Layout selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}>
        <Routes>
          {/* User */}
          <Route path="/" element={<Home selectedGenre={selectedGenre} />} />
          <Route path="/home" element={<Home selectedGenre={selectedGenre} />} />
          <Route path="/song/:id" element={<SongDetails />} />
          <Route path="/request-song" element={<RequestSong />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<AdminRequests />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
