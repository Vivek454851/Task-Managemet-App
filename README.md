<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express.js-4-green?style=for-the-badge&logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MUI-9-007FFF?style=for-the-badge&logo=mui" alt="MUI" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zustand-5-orange?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-purple?style=for-the-badge&logo=framer" alt="Framer Motion" />
</p>

# ✅ TaskFlow — Modern Task Management App

A modern, production-ready, full-stack **Task Management** SaaS application built with **Next.js 16**, **Express.js**, and **Material UI 9**. Features a stunning dashboard with animated statistics, advanced filtering, full CRUD operations, and responsive design.

---

## ✨ Features

- 📊 **Dashboard Analytics** — Real-time stat cards with animated counters (Total, Pending, In Progress, Completed, High Priority)
- ➕ **Full CRUD** — Create, Read, Update, and Delete tasks with form validation
- 🔍 **Smart Search** — Debounced search across task titles and descriptions
- 🏷️ **Advanced Filters** — Filter by status (Pending/In Progress/Completed) and priority (Low/Medium/High)
- 📐 **Sort Controls** — Sort by date created, due date, or priority (asc/desc)
- 📱 **Responsive Design** — DataGrid table on desktop, card layout on mobile
- 🎨 **Premium UI** — Glassmorphism, gradient backgrounds, smooth Framer Motion animations
- ⚡ **Skeleton Loaders** — Layout-matched loading states for all views
- 🔔 **Toast Notifications** — Success/error snackbars on all operations
- 📭 **Empty States** — Contextual empty state with animated floating icon
- 🎯 **Overdue Detection** — Visual indicators for overdue tasks
- ✅ **Validation** — Client-side (react-hook-form) + server-side validation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, React 19 |
| **UI Library** | Material UI 9, MUI X DataGrid |
| **Styling** | Emotion, Bootstrap 5, Custom CSS |
| **Animations** | Framer Motion 12 |
| **State** | Zustand 5 |
| **Forms** | React Hook Form 7 |
| **HTTP Client** | Axios |
| **Backend** | Express.js 4, Node.js |
| **Data Store** | JSON file-based storage |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
Task Management App/
├── backend/
│   ├── controllers/
│   │   └── taskController.js      # Route handlers
│   ├── data/
│   │   └── tasks.json             # JSON data store
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handler
│   │   └── validateTask.js        # Input validation
│   ├── models/
│   │   └── taskModel.js           # Task schema & helpers
│   ├── routes/
│   │   └── taskRoutes.js          # API route definitions
│   ├── services/
│   │   └── taskService.js         # Business logic layer
│   ├── utils/
│   │   └── fileHelper.js          # File I/O utilities
│   ├── server.js                  # Express server entry
│   ├── package.json
│   └── render.yaml                # Render deployment config
│
├── frontend/
│   ├── app/
│   │   ├── globals.css            # Global styles & utilities
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── page.tsx               # Main dashboard page
│   ├── components/
│   │   ├── AnimatedCounter.tsx    # Animated number counter
│   │   ├── DashboardStats.tsx     # 5 stat cards
│   │   ├── DeleteConfirmationDialog.tsx
│   │   ├── EmptyState.tsx         # No tasks view
│   │   ├── FilterPanel.tsx        # Status/priority filters
│   │   ├── Loader.tsx             # Skeleton loaders
│   │   ├── Navbar.tsx             # App bar
│   │   ├── SearchBar.tsx          # Debounced search
│   │   ├── SnackbarProvider.tsx   # Toast notifications
│   │   ├── TaskCard.tsx           # Mobile task card
│   │   ├── TaskModal.tsx          # Create/Edit dialog
│   │   ├── TaskTable.tsx          # Desktop DataGrid
│   │   └── ThemeRegistry.tsx      # MUI theme provider
│   ├── hooks/
│   │   └── useTasks.ts            # Task hook with memoization
│   ├── services/
│   │   └── taskService.ts         # Axios API client
│   ├── store/
│   │   └── taskStore.ts           # Zustand global state
│   ├── styles/
│   │   └── theme.ts               # MUI theme configuration
│   ├── types/
│   │   └── task.ts                # TypeScript type definitions
│   ├── utils/
│   │   └── helpers.ts             # Utility functions
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── vercel.json                # Vercel deployment config
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** installed
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running Locally

1. **Start the backend** (Port 5000)
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend** (Port 3000) — in a new terminal
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📡 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `GET` | `/api/tasks/:id` | Get a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `GET` | `/api/health` | Server health check |

### Request Body (POST / PUT)

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "High",
  "status": "In Progress",
  "dueDate": "2026-06-25"
}
```

### Response Format

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "uuid-v4",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "High",
    "status": "In Progress",
    "dueDate": "2026-06-25",
    "createdAt": "2026-06-20T12:00:00.000Z"
  }
}
```

### Validation Rules

| Field | Rule |
|-------|------|
| `title` | Required, string, max 200 characters |
| `description` | Required, string, max 2000 characters |
| `dueDate` | Required, valid date format |
| `priority` | Optional, one of: `Low`, `Medium`, `High` (default: `Medium`) |
| `status` | Optional, one of: `Pending`, `In Progress`, `Completed` (default: `Pending`) |

---

## 🌍 Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |

---

## 🚢 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render backend URL
5. Deploy

### Backend → Render

1. Push your code to GitHub
2. Create a new **Web Service** in [Render](https://render.com)
3. Set **Root Directory** to `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `node server.js`
6. Add environment variables: `FRONTEND_URL` = your Vercel frontend URL
7. Deploy

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
