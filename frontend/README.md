#  Markdown Notes Application

A full-stack Markdown Notes App built with **React, Node.js (Express), and SQLite**.
Users can create, edit, delete, and preview notes in real-time with Markdown support.

---

##  Features

##  Core Features

* Create, edit, delete notes
* Live Markdown preview (split-screen)
* Persistent storage using SQLite
* Search notes (title + content)
* Debounced auto-save (performance optimized)

###  Authentication

* User registration & login (JWT-based)
* Secure routes (notes are user-specific)
* Logout functionality

###  UI/UX Enhancements

* Dark mode toggle
* Clean sidebar layout
* Selected note highlighting
* Responsive design (mobile-friendly)

---

##  Tech Stack

| Layer    | Technology       |
| -------- | ---------------- |
| Frontend | React.js         |
| Backend  | Node.js, Express |
| Database | SQLite           |
| Auth     | JWT, bcryptjs    |

---

##  Project Structure

```
project-root/
 ├── backend/
 │   ├── db.js
 │   ├── server.js
 │   ├── routes/
 │   │   ├── notes.js
 │   │   └── auth.js
 │   └── middleware/
 │       └── auth.js
 │
 └── frontend/
     ├── src/
     │   ├── components/
     │   │   ├── NotesList.js
     │   │   ├── Editor.js
     │   │   ├── Preview.js
     │   │   └── Login.js
     │   ├── App.js
     │   ├── api.js
     │   └── App.css
```

---

##  Setup Instructions

## 1. Clone the Repository

```bash
git clone <your-repo-link>
cd project-root
```

---

###  2. Backend Setup

```bash
cd backend
npm install
```

#### Install additional dependencies:

```bash
npm install express cors body-parser sqlite3 jsonwebtoken bcryptjs
```

#### Run backend:

```bash
node server.js
```

👉 Server runs on: **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

👉 App runs on: **http://localhost:3000**

---

## Authentication Flow

1. Register a new user
2. Login → JWT token stored in localStorage
3. Token attached to every API request
4. Backend verifies token before accessing notes

---

## API Endpoints

### Auth

* `POST /auth/register` → Register user
* `POST /auth/login` → Login user

### Notes

* `GET /notes` → Get all notes (user-specific)
* `POST /notes` → Create note
* `PUT /notes/:id` → Update note
* `DELETE /notes/:id` → Delete note

---

## Key Engineering Decisions

* Used **debouncing** to reduce API calls during typing
* Designed **user-based data isolation** using JWT
* Implemented **clean separation of concerns** (UI, API, DB)
* Used **SQLite** for lightweight and fast local storage

---

## Future Improvements

* Version history (restore old notes)
* Tags / categories
* Rich text editor toolbar
* Deployment (Vercel + Render)
* Pagination & performance optimization

---

## 📸 Demo

 (Add your demo video / screenshots here)

---

## 🌐 Live Deployment (Optional)

 (Add your deployed link here)

---


## Conclusion

This project demonstrates full-stack development skills including:

* API design
* Authentication
* State management
* UI/UX thinking
* Performance optimization

---
