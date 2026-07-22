# ResumeAI

> An AI-powered modern resume builder designed to craft ATS-friendly, professional resumes with intelligent recommendations.

## Project Structure

This monorepo consists of two main directories:

- **`/client`**: Frontend application built with React, Vite, and Tailwind CSS.
- **`/server`**: Backend REST API built with Node.js, Express, and Nodemon.

---

## How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

---

### 1. Server Setup (`/server`)

Navigate to the `server` directory, install dependencies, and start the development server:

```bash
cd server
npm install
npm run dev
```

The Express server will start on `http://localhost:5001`.

#### Health Check
Verify the server is running by accessing the health endpoint:
```bash
curl http://localhost:5001/api/health
# Response: {"status":"ok"}
```

---

### 2. Client Setup (`/client`)

In a separate terminal window, navigate to the `client` directory, install dependencies, and start the Vite development server:

```bash
cd client
npm install
npm run dev
```

The frontend application will start on `http://localhost:5173`.

---

## Environment Variables

Copy `.env.example` to `.env` in the root or server directory to configure your local environment settings:

```bash
cp .env.example .env
```
