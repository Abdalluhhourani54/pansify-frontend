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

function Layout({ children, selectedGenre, setSelectedGenre }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideNavbarRoutes = ["/login", "/register"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar &&
        (isAdminRoute ? (
          <AdminNavBar />
        ) : (
          <UserNavBar selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
        ))}

      <div className="app-content">{children}</div>
    </>
  );
}

// ✅ guards
function RequireUser({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  // ✅ keep app stable on refresh (optional but clean)
  useEffect(() => {
    // just reading localStorage makes routes stable
    localStorage.getItem("user");
  }, []);

  return (
    <BrowserRouter>
      <Layout selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User (protected) */}
          <Route
            path="/"
            element={
              <RequireUser>
                <Home selectedGenre={selectedGenre} />
              </RequireUser>
            }
          />
          <Route
            path="/home"
            element={
              <RequireUser>
                <Home selectedGenre={selectedGenre} />
              </RequireUser>
            }
          />
          <Route
            path="/song/:id"
            element={
              <RequireUser>
                <SongDetails />
              </RequireUser>
            }
          />
          <Route
            path="/request-song"
            element={
              <RequireUser>
                <RequestSong />
              </RequireUser>
            }
          />

          {/* Admin (protected) */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
