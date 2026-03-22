<div align="center">
  <img src="./banner.png" alt="Ratnesh Portfolio Banner" width="100%" />

  # 💻 Ratnesh - Premium Developer Portfolio

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" />
  </p>

  <p><h3>Crafting immersive digital experiences through code and creativity.</h3></p>

  <p>A hyper-optimized, visually stunning Full-Stack Developer portfolio featuring cutting-edge 3D UI patterns, glassmorphism, smooth animations, and a decoupled Node.js serverless backend for real-time contact processing.</p>
</div>

<hr />

## 🚀 Overview

This repository houses my professional portfolio, engineered to be far more than just a digital resume. It is a **live demonstration** of my capabilities in creating premium, high-performance web applications. By blending sophisticated dark-theme aesthetics with deep technical foundations, the project serves as a showcase of modern frontend architecture and secure backend data handling.

## ✨ Key Features

- **🎨 Premium UI/UX Design:** Immersive dark-mode aesthetics utilizing deep `hsl` calculations, glassmorphism (`backdrop-filter`), and elegant **Playfair Display** typography for an editorial feel.
- **✨ Fluid Animations:** Entire page transitions, micro-interactions, and scroll reveals powered by precisely choreographed `framer-motion` variants.
- **⚡ Blazing Fast Routing & Build:** Configured with **Vite** for instantaneous hot module replacement (HMR) and ultra-optimized production build outputs.
- **🛡️ Secure Backend API:** Custom `Express.js` API handling contact forms with `express-rate-limit`, strict CORS validation, and real-time email delivery via `Nodemailer`.
- **☁️ Serverless Ready:** Seamlessly configured for monorepo deployment on **Vercel** with integrated frontend static serving and backend serverless function routing.

<br />

## 🧰 Technology Stack

| Architecture | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | Node.js, Express, Nodemailer (Gmail SMTP), cors, dotenv |
| **Deployment** | Vercel (Custom `vercel.json` routing Front/Back end) |
| **Security** | `express-rate-limit`, Strict Input Validation, Helmet |

<br />

## 📁 Project Structure

```text
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # All UI sections (Hero, About, Projects, Contact)
│   │   ├── index.css           # Global Theme & Tailwind Directives
│   │   └── App.jsx             # Main Application Root
│   └── package.json            # Frontend Dependencies
│
├── backend/                    # Node.js + Express API
│   ├── controllers/            # Logic for Contact Form emails
│   ├── routes/                 # API endpoint routing
│   ├── utils/                  # Email HTML Templates
│   └── server.js               # Entry point (Exported for Vercel Serverless)
│
└── vercel.json                 # Vercel Monorepo Deployment Config
```

<br />

## ⚙️ Installation & Setup

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/RATNESH2121/Ratnesh-Portfolio.git
cd Portfolio
```

### 2. Backend Configuration
```bash
# Navigate to backend and install dependencies
cd backend
npm install

# Create a .env file locally for the backend
touch .env
```
*Add the following to your `.env` file:*
```ini
PORT=5000
FRONTEND_URL=http://localhost:8080
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
MY_EMAIL=your_receiving_email@gmail.com
```

### 3. Frontend Configuration
```bash
# Open a new terminal loop, navigate to frontend
cd frontend
npm install

# Start the Vite development server
npm run dev
```

<br />

## 📫 Contact & Connect

Interested in collaborating or have a proposition?
- **Email:** ratneshaugustus@gmail.com
- **LinkedIn:** [Ratnesh](https://linkedin.com/in/ratnesh6208/)
- **GitHub:** [@RATNESH2121](https://github.com/RATNESH2121)

---
<div align="center">
  <p>Designed & Developed meticulously by <b>Ratnesh</b>.</p>
</div>
