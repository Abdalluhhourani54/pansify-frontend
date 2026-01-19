import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

import NotFound from "./pages/NotFound";

function Layout({ children, selectedGenre, setSelectedGenre, user }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && user && (
        isAdminRoute ? (
          <AdminNavBar />
        ) : (
          <UserNavBar selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
        )
      )}

      <div className="app-content">{children}</div>
    </>
  );
}

function UserRoute({ user, children }) {
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AdminRoute({ user, children }) {
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/home" />;
  return children;
}

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // ✅ simple logout handler (optional but useful)
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} user={user}>
        <Routes>
          {/* Default */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          {/* User */}
          <Route
            path="/home"
            element={
              <UserRoute user={user}>
                <Home selectedGenre={selectedGenre} />
              </UserRoute>
            }
          />
          <Route
            path="/song/:id"
            element={
              <UserRoute user={user}>
                <SongDetails />
              </UserRoute>
            }
          />
          <Route
            path="/request-song"
            element={
              <UserRoute user={user}>
                <RequestSong />
              </UserRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute user={user}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute user={user}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
