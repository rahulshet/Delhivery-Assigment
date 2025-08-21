#  Warehouse Automation Platform (Delhivery Assignment)

A **full-stack warehouse automation system** where Automated Guided Vehicles (AGVs) transport items between locations.  
Developed with **Vite + React + Material UI (frontend)** and **Node.js + Express + MySQL (backend)**.  

---

##  Features

-  **User Authentication**  
  - Register new users  
  - Login with JWT authentication  
  - Passwords hashed securely with bcrypt  

- **Robots Dashboard**  
  - Displays AGVs with ID, location, status (Idle, Busy, Charging)  
  - Battery level indicator (progress bar)  
  - Auto-refresh every 5 seconds  

-  **Task Management**  
  - Create tasks by assigning robots (AGV-1 … AGV-4)  
  - Task states: Pending → In Progress → Completed  
  - Auto-assigns an idle, high-battery robot if available  

-  **Inventory Management**  
  - View inventory items and locations  
  - Add new inventory items (minimal create for demo)  

-  **UI/UX**  
  - Clean, responsive Material UI design  
  - Sticky AppBar navigation  
  - Protected routes (only accessible after login)  

  **Database**  
  - MySQL schema & seed data included  
  - Preloaded users, robots, tasks, and inventory for demo  

---

##  Test Credentials

- **Email:** `admin@example.com`  
- **Password:** `admin123`  

##  Author

- **Rahul Shet**  
-  rahulushet@gmail.com  
 

