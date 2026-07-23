# HireSetu — AI-Powered Resume Builder

> An intelligent, full-stack AI resume builder designed to craft ATS-friendly, professional resumes with real-time live preview and automated saving.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
- **Core**: React 19, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Routing & State**: React Router DOM v7, React Context API (`AuthContext`)

### **Backend (`/server`)**
- **Runtime & Framework**: Node.js (v24), Express.js
- **Database**: MySQL 8.0+ (`mysql2/promise` connection pool)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`)

---

## 📁 Repository Structure

```text
Resume Builder/
├── README.md               # Monorepo documentation & setup guide
├── schema.md               # Database architecture & JSON column rationale
├── .gitignore              # Monorepo gitignore (covers client & server)
├── .env.example            # Environment configuration template
│
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # UI Components & Builder forms
│   │   │   ├── builder/    # PersonalInfo, Education, Experience, Projects, Skills, ResumePreview
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/        # AuthContext (JWT management & session state)
│   │   ├── pages/          # Login, Register, Dashboard, Builder, NotFound
│   │   ├── App.jsx         # Router & Route declarations
│   │   └── main.jsx        # App entry point
│   ├── vite.config.js      # Vite configuration & dev proxy
│   └── package.json
│
└── server/                 # Express REST API Backend
    ├── schema.sql          # MySQL database DDL migration script
    ├── src/
    │   ├── config/         # Database connection pool (db.js)
    │   ├── middleware/     # JWT Authentication middleware (auth.js)
    │   ├── routes/         # auth.js & resumes.js API routes
    │   ├── testResumesApi.js # Integration test suite
    │   └── index.js        # Express server entry point
    └── package.json
```

---

## 🚀 How to Run Locally

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL Server](https://www.mysql.com/) (running locally on port `3306`)

---

### **1. Database Setup**

Execute the schema migration script against your local MySQL instance:

```bash
mysql -u root < server/schema.sql
```

This creates the database `resumeai_builder` and sets up `users`, `resumes`, and `resume_sections` tables with foreign keys and `ON DELETE CASCADE`.

---

### **2. Environment Setup**

Copy `.env.example` to `server/.env` and update credentials if necessary:

```bash
cp .env.example server/.env
```

---

### **3. Start Server (`/server`)**

```bash
cd server
npm install
npm run dev
```

The Express API server will start on `http://localhost:5001`.

#### Health Check
```bash
curl http://localhost:5001/api/health
# Response: {"status":"ok"}
```

---

### **4. Start Client (`/client`)**

In a new terminal window:

```bash
cd client
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📌 Sprint 1 Status Breakdown

### **Implemented in Sprint 1**
- ✅ **Monorepo Architecture**: Clean separation between React/Vite client and Express REST backend.
- ✅ **Relational MySQL Database**: `users`, `resumes`, and `resume_sections` tables with JSON content columns and cascade deletions.
- ✅ **Secure Authentication**: User registration, bcrypt password hashing, 7-day JWT issuance, and protected profile endpoint (`/api/auth/me`).
- ✅ **Protected Resume CRUD API**: User-isolated endpoints for creating, fetching, updating, and deleting resumes and sections with strict ownership verification.
- ✅ **Frontend Auth & Protected Routes**: `AuthContext` state management, `ProtectedRoute` wrapper, `Login`, `Register`, and `Dashboard` pages.
- ✅ **Builder Shell & Navigation**: Responsive two-panel layout (`/builder/:id`), vertical section tabs, and header status indicator.
- ✅ **Section Forms**: Full support for **Personal Info**, **Education**, **Work Experience**, **Projects**, and **Skills** with custom category tags and repeatable bullet lists.
- ✅ **Debounced Auto-Save Engine**: 1-second auto-saver pushing section edits to MySQL with real-time `Saving...`, `All changes saved`, and `Failed to save` status indicators.
- ✅ **Live Resume Preview Document**: Single-column, ATS-friendly document updated in real time.
- ✅ **Error Handling & 404**: React `ErrorBoundary` and dedicated `NotFound` page.

### **Deferred to Sprint 2 & 3**
- ⏳ **AI Resume Suggestions & Tailoring**: Gemini API integration for bullet point rewriting and ATS optimization.
- ⏳ **Export to PDF & Word**: Client-side / server-side document rendering to `.pdf` and `.docx`.
- ⏳ **Additional Section Forms**: Certifications, Achievements, Positions of Responsibility, Languages, and Interests forms.
- ⏳ **Multi-Template Selector**: Executive, Modern Minimalist, and Two-Column visual template themes.
- ⏳ **httpOnly Cookie Auth**: Transitioning JWT storage from localStorage to httpOnly cookies for production security.
