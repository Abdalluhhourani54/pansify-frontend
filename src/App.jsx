import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SongDetails from "./pages/SongDetails";
import RequestSong from "./pages/RequestSong";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import NotFound from "./pages/NotFound";

import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <UserNavbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="app-content">
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
        </div>
      </Layout>
    </BrowserRouter>
  );
}