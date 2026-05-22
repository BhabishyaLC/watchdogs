# WatchDogs Dashboard

WatchDogs is a modern, dark-themed civic actions command center and monitoring web application. This is a platform that lets users to report problems of thier areas, manage the reports, view various reports posted by various users , and features an integrated AI-driven intelligence security assistant.

## 🌟 Core Features

- **Interactive Public Feed:** A community bulletin board where citizens can view, post, and track local problems (like broken roads, water leaks, or safety hazards) as they happen.
- **Saved Reports (Bookmarking):** Users can save/bookmark important reports to view later in a dedicated tab. It links reports directly to user profiles cleanly without slowing down the database.
- **CityWatch AI Assistant:** An intelligent chatbot built directly into the sidebar. Powered by Google Gemini AI, users or dispatchers can ask it questions like "Summarize today's active issues" or "What's the status of the report I filed?" and it will read the database to give an answer.
- **Secure Logins:** Protects the platform using secure login sessions (JWT tokens) to make sure only registered citizens and authorized dispatchers can view or manage private city data.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Zustand (State Management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **AI Engine:** Google Gemini AI SDK (`@google/genai`)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/BhabishyaLC/watchdogs.git](https://github.com/BhabishyaLC/watchdogs.git)
cd watchdogs
```
### 2. Install Dependencies & Start up Servers
For Backend:
```bash
cd backend
npm install
npm start
```
For Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 License
This project is licensed under the MIT License.
