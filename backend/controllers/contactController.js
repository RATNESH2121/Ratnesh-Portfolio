/**
 * contactController.js
 * ─────────────────────────────────────────────────────────────────
 * Handles POST /api/contact
 *  1. Builds a Nodemailer transporter (Gmail SMTP / STARTTLS)
 *  2. Fires both emails in parallel via Promise.all
 *     - Email 1 → owner notification  (to MY_EMAIL)
 *     - Email 2 → sender auto-reply   (to sender's email)
 *  3. Returns structured JSON success/error responses
 * ─────────────────────────────────────────────────────────────────
 */

const nodemailer = require('nodemailer');
const { ownerNotificationTemplate, senderAutoReplyTemplate } = require('../utils/emailTemplates');

/**
 * Creates and returns a reusable Nodemailer transporter.
 * Uses Gmail SMTP on port 587 with STARTTLS (requireTLS).
 * Credentials are pulled from environment variables.
 *
 * @returns {nodemailer.Transporter}
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,      // false = STARTTLS (upgrades after connection)
    requireTLS: true,   // forces STARTTLS even if server advertises optional
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // must be a Gmail App Password, NOT your account password
    },
    // Increase timeout for slow connections
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Main controller for the contact form submission.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 */
async function sendContactEmail(req, res) {
  // ── Destructure validated & sanitized body ──
  const { firstName, lastName, email, subject, message } = req.body;

  // ── Capture sender IP (may be proxied) ──
  const senderIP =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'Unknown';

  console.log(`\n📬 [Contact] New submission from: ${firstName} ${lastName} <${email}>`);
  console.log(`   Subject: ${subject}`);
  console.log(`   IP: ${senderIP}`);

  try {
    // ── Create transporter ──
    const transporter = createTransporter();

    // ── Verify SMTP credentials before sending (helpful during setup) ──
    await transporter.verify();
    console.log('✅ [Mailer] SMTP connection verified successfully.');

    // ── Build email options ──

    // Email 1 — To the portfolio owner (Ratnesh)
    const ownerMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.MY_EMAIL,
      replyTo: email,  // clicking Reply in Gmail replies directly to sender
      subject: `🚀 New Portfolio Message from ${firstName} ${lastName} — ${subject}`,
      html: ownerNotificationTemplate({ firstName, lastName, email, subject, message }, senderIP),
    };

    // Email 2 — Auto-reply to the sender
    const senderMailOptions = {
      from: `"Ratnesh" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✨ Hey ${firstName}! Got your message — Ratnesh`,
      html: senderAutoReplyTemplate({ firstName, lastName, email, subject, message }),
    };

    // ── Send both emails simultaneously ──
    const [ownerResult, senderResult] = await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    console.log(`✅ [Mailer] Owner notification sent — MessageId: ${ownerResult.messageId}`);
    console.log(`✅ [Mailer] Auto-reply sent — MessageId: ${senderResult.messageId}`);

    // ── Success response ──
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you within 24 hours.',
    });

  } catch (error) {
    // ── Log full error for debugging ──
    console.error('❌ [Mailer] Failed to send email:', error.message);

    // Provide helpful hints for common Gmail errors
    if (error.code === 'EAUTH') {
      console.error('   → Authentication failed. Check EMAIL_USER and EMAIL_PASS in .env');
      console.error('   → Make sure you\'re using a Gmail App Password, not your account password.');
      console.error('   → Enable 2FA and generate an App Password: myaccount.google.com/apppasswords');
    }
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('   → Could not connect to Gmail SMTP. Check your network / firewall.');
    }

    // ── Error response ──
    return res.status(500).json({
      success: false,
      error: 'Failed to send your message. Please try again later or contact me directly.',
    });
  }
}

module.exports = { sendContactEmail };
