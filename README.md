🚀 Kanban Board – Optimistic UI Demo

A clean, minimal, and responsive Kanban Board built with React.js + Tailwind CSS, demonstrating advanced frontend concepts like Optimistic UI updates, state rollback, and mock API simulation with random failures.

Live Demo: (Add your deployed link here)
GitHub Repo: (Add your repo link here)

📌 Project Overview

This project simulates a real-world Kanban board application with:

Mock Authentication (No backend)

Drag & Drop Task Management

Simulated Backend API with latency

Optimistic UI updates

Automatic rollback on failure

Toast error notifications

The primary focus of this project is demonstrating how to handle asynchronous state safely using optimistic updates and rollback mechanisms.

🛠 Tech Stack

React.js (Vite)

Tailwind CSS

Zustand (State Management)

@dnd-kit (Drag & Drop)

JavaScript / TypeScript

LocalStorage (Mock Auth persistence)

✨ Features
1️⃣ Mock Authentication

Accepts any non-empty username/email

Login state stored in localStorage

User remains logged in after refresh

Logout functionality included

2️⃣ Kanban Board

Three Columns:

📝 To Do

🚧 In Progress

✅ Done

Each task includes:

Unique ID

Title

Status

Supported actions:

Add Task

Drag & Drop between columns

Delete Task

3️⃣ Mock API Simulation

Every action (Add, Move, Delete) simulates a backend call with:

⏳ 1–2 second delay

⚡ Instant UI update (Optimistic)

❌ 20% random failure rate

⚡ Optimistic UI Strategy
What is Optimistic UI?

Optimistic UI means updating the interface immediately before the server confirms the action. This makes the app feel instant and responsive.

How It Works in This Project

User performs an action (add/move/delete).

UI updates immediately.

Previous state is stored temporarily.

Mock API call is triggered.

If API succeeds → nothing changes.

If API fails → UI rolls back to previous state automatically.

🔁 Rollback Mechanism

To safely handle failures:

The previous board state is saved before making changes.

If the mock API returns an error:

Toast notification appears

State is restored to the saved version

Example:
If a task is moved from "In Progress" → "Done"
And API fails →
The task automatically returns to "In Progress".

📂 Folder Structure
src/
│
├── components/       # UI Components
├── pages/            # Landing & Board pages
├── store/            # Zustand state management
├── utils/            # mockApi logic
├── hooks/            # Custom hooks
├── types/            # Type definitions (if TS)

💻 How to Run Locally

Clone the repository

git clone https://github.com/your-username/kanban-board.git


Navigate into project

cd kanban-board


Install dependencies

npm install


Start development server

npm run dev


Open in browser

http://localhost:5173

🚀 Deployment

This project is optimized for:

Vercel

Netlify

GitHub Pages

For Vercel:

Push repo to GitHub

Import project in Vercel

Click Deploy

No additional configuration required.

🎯 Design Decisions & Trade-offs
Why Zustand?

Chosen for:

Simplicity

Minimal boilerplate

Easy rollback handling

Lightweight compared to Redux

Why Optimistic Updates?

Better UX

Zero-latency feel

Real-world SaaS pattern

Trade-offs

Mock API uses setTimeout instead of real backend

No database persistence

Drag library kept lightweight to avoid heavy UI frameworks

📱 Responsiveness

Fully responsive layout

Works on desktop and mobile

Clean minimal UI using Tailwind

🧠 What This Project Demonstrates

Advanced state management

Handling async operations safely

Error handling patterns

Production-style folder structure

Real-world frontend architecture

📌 Future Improvements

Real backend integration

User accounts

Task editing

Due dates & labels

Animations refinement

Dark mode toggle

👨‍💻 Author

Chitranjan Singh
Frontend Developer | React Enthusiast