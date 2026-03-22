/**
 * server.js
 * Entry point for the Portfolio backend API.
 *
 * Responsibilities:
 *  - Load environment variables from .env
 *  - Configure Express with security middleware
 *  - Apply rate limiting (5 req / 15 min per IP on /api/contact)
 *  - Configure CORS to allow only the frontend origin
 *  - Mount the contact route at /api/contact
 *  - Start HTTP server on PORT (default 5000)
 */

// ── Load env variables FIRST so all modules can read them ──
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE — Security & Parsing
/**
 * CORS — Only allow requests from the configured frontend origin.
 * In development this is http://localhost:8080 (Vite default).
 * Update FRONTEND_URL in .env before deploying to production.
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // IE11 compat
  })
);

/**
 * Body parsing — Parse incoming JSON request bodies.
 * Limit set to 10kb to prevent large payload attacks.
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// RATE LIMITING

/**
 * Contact form rate limiter:
 *  - 5 requests per IP per 15 minutes
 *  - Standard headers enabled (RateLimit-Limit, RateLimit-Remaining)
 *  - Legacy headers disabled (X-RateLimit-*)
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 5,                    // max 5 requests per window per IP
  message: {
    success: false,
    error: 'Too many messages sent from this IP. Please wait 15 minutes and try again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ROUTES

// Health check — useful for deployment platforms & Postman verification
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Ratnesh — Portfolio Backend API is running.',
    endpoints: {
      contact: 'POST /api/contact',
    },
    timestamp: new Date().toISOString(),
  });
});

// Apply rate limiting to contact endpoint only
app.use('/api/contact', contactLimiter);

// Mount contact routes
app.use('/api/contact', contactRoutes);

// 404 HANDLER

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});


// GLOBAL ERROR HANDLER

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('💥 [Server] Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error. Please try again later.',
  });
});

// START SERVER

// Only start listening if we are NOT running on Vercel (or Vercel handles it via export)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('\n🚀 ─────────────────────────────────────────');
    console.log(`   Portfolio Backend is running locally!`);
    console.log(`   Local:  http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/`);
    console.log(`   API:    POST http://localhost:${PORT}/api/contact`);
    console.log('─────────────────────────────────────────────\n');

    // Warn if .env is not configured
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') {
      console.warn('⚠️  [Config] EMAIL_USER is not set. Update .env before sending emails.');
    }
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_gmail_app_password') {
      console.warn('⚠️  [Config] EMAIL_PASS is not set. Update .env with your Gmail App Password.');
    }
    if (!process.env.MY_EMAIL) {
      console.warn('⚠️  [Config] MY_EMAIL is not set. Update .env with your receiving Gmail address.');
    }
  });
}

// ── VERCEL REQUIREMENT: Export the Express App ──
module.exports = app;
