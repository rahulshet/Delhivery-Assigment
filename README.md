# AGV Warehouse Platform (Delhivery Assignment)

Full-stack app for warehouse AGV management using **Vite + React + Material UI** (frontend) and **Node.js + Express + MySQL** (backend).

## Features
- Login & Create User (stored in MySQL, JWT auth)
- Robots dashboard (status, location, battery; auto-refresh)
- Tasks list (state transitions; auto-assign an idle high-battery robot)
- Inventory CRUD (minimal create for demo)
- Clean, responsive MUI design with sticky AppBar & protected routes
- Seed data for demo

## Quick Start

### 1) MySQL
Create a database and load schema + seeds:

```sql
CREATE DATABASE warehouse_db;
USE warehouse_db;
SOURCE backend/schema.sql;
SOURCE backend/seed.sql;
```

### 2) Backend
```
cd backend
cp .env.example .env
# edit DB_* values in .env
npm install
npm run dev
```

### 3) Frontend
```
cd ../frontend
npm install
# set backend URL if needed
# echo VITE_API_URL=http://localhost:3026 > .env
npm run dev
```

Open http://localhost:5173

### Test Login
- Email: `admin@example.com`
- Password: `admin123`

## Notes for Interview Reviewers
- Auto-assignment logic: choose an **idle** robot with **battery > 30%**, prefer **highest battery**.
- Update task status (start/complete/fail) and robot state updates accordingly.
- Code organized by feature (routes/services on backend; pages on frontend).

## Scripts
- `backend/schema.sql` & `backend/seed.sql` for database setup
- `backend/.env.example` with required env vars

---
This project is trimmed for clarity and speed to run for your interview.
