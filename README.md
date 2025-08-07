# YouTube-frontend

This is the **frontend** for a YouTube clone built using **React**, **Tailwind CSS**, and **React Router**. It communicates with a backend server (Node.js/Express) via REST APIs to handle video streaming, user authentication, subscribe, comments, likes, playlist management, and more.

## 🌐 Live Demo

👉 [https://miniyoutube459.netlify.app](https://miniyoutube459.netlify.app)

## 🧪 Demo Credentials (No Signup Required)

**Email:** `sumit@example.com`  
**Password:** `mySecurePassword321`

*Note: These credentials are for demo purposes only.*
---

## 📁 Project Structure

```bash
youtube-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/                # Static assets (images, icons, etc)
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Route-based pages
│   ├── services/              # API request handlers
│   ├── theme/                 # Theme context (dark/light)
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind CSS
├── .gitignore
├── package.json
└── README.md
```

---

## 🚦 Routing (React Router DOM)

All routes are defined inside `App.jsx` using `react-router-dom`.

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/video/:id" element={<VideoPage />} />
  <Route path="/search" element={<SearchResults />} />
  <Route path="/channel/:id" element={<ChannelPage />} />
  <Route path="/playlists" element={<PlaylistList />} />
  <Route path="/playlists/:id" element={<PlaylistVideoPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
</Routes>
```

All dynamic routes use `useParams()` to extract route variables (like video ID or playlist ID).

---

## 📦 Features

- 🎥 Video play
- 🔍 Video search with debounce
- 🧾 Playlist creation, update, delete
- 👤 User profile and channel page
- 👤 Like and comment on video 
- 📂 Modular components (VideoCard, PlaylistCard, etc)
- 🧠 Global state management using Context API

---

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router DOM**
- **Axios** for API calls
- **Lucide-react** for icons

---

## 🔌 API Services

API calls are centralized in the `services/` folder. All endpoints interact with the backend server via REST.

Example:
```js
// services/video.js
export const getAllVideos = async () => {
  const response = await api.get("/v1/videos");
  return response.data;
};
```

---

## 💻 Setup Instructions

```bash
git clone https://github.com/itsyoboysumit/YouTube-frontend.git
cd YouTube-frontend
npm install
npm run dev
```

Make sure to run the backend server (`backend_project`) on the appropriate port (usually `localhost:5000`) and configure any required environment variables or proxy settings.

---

## 🙋‍♂️ About Me

**Sumit Kumar**  
💼 Aspiring Full Stack Developer  
🔗 GitHub: [@itsyoboysumit](https://github.com/itsyoboysumit)  
📧 Email: [sumitkumar67670@gmail.com](mailto:sumitkumar67670@gmail.com)

---

> For full backend code, check: [https://github.com/itsyoboysumit/backend_project](https://github.com/itsyoboysumit/backend_project)
