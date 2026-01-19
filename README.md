🎵 **Pansify Frontend (React)**

This is the **frontend** of **Pansify**, a modern music review web application built using **React + Vite** as part of a university full-stack project.

---

## 🎯 Description

Pansify allows users to **discover, review, and request music**, while admins can **manage songs and song requests**.
The frontend is fully implemented with a clean, dark modern UI and communicates with a backend API (Node.js + Express) for data persistence.

The project follows **SPA (Single Page Application)** principles using **React Router**.

---

## 👤 User Features

Regular users can:

* Browse a list of songs
* View song details (artist, cover, average rating, reviews)
* Add a review with a star rating and comment
* Receive a confirmation email after rating a song (using EmailJS)
* Request new songs
* View the status of their song requests (Pending / Approved / Rejected)

---

## 🛠️ Admin Features

Admin users can:

* View all songs in an admin dashboard
* Add new songs
* Edit existing songs
* Delete songs
* View user song requests
* Approve or reject song requests

Admins use a **separate admin navbar** and dashboard UI for clarity.

---

## 🧑‍💻 User Requirements

* Login and Register pages (UI-only authentication)
* Role-based navigation (User / Admin)
* Users and admins see different navigation bars
* Smooth page navigation using React Router
* Responsive and consistent dark UI
* No page reloads (SPA behavior)

---

## 🛠️ Technologies Used

* **React 18**
* **Vite**
* **React Router DOM**
* **EmailJS** (third-party API for sending emails after rating)
* **React Icons**
* **Custom CSS** (no inline styles, no Tailwind)
* **Local static data** (until backend connection)

---

## 🚀 Getting Started

Clone the repository and run the frontend locally:

```bash
cd pansify-frontend
npm install
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 📁 Project Structure (Frontend)

```
src/
├── assets/        # Images and logo
├── components/    # Reusable components (Navbar, SongCard, Stars, etc.)
├── pages/         # Page components (Home, Login, AdminDashboard, etc.)
├── styles/        # CSS files
├── data/          # Static data (songs, requests)
├── App.jsx        # App routes and layout
└── main.jsx       # React root
```

---

## 🧠 Notes


* Backend API is developed in a **separate repository** (`pansify-backend`).



---



✅ Frontend is complete and ready to be connected to the backend API.
