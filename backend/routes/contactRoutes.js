/**
 * contactRoutes.js
 * Defines the POST /api/contact route.
 * Middleware chain:
 *   1. contactValidationRules  — express-validator checks
 *   2. handleValidationErrors  — returns 422 if any rule fails
 *   3. sendContactEmail        — sends both emails, returns response
 */

const express = require('express');
const router = express.Router();

const { contactValidationRules, handleValidationErrors } = require('../middleware/validateContact');
const { sendContactEmail } = require('../controllers/contactController');

/**
 * POST /api/contact
 *
 * Request body (JSON):
 *   { firstName, lastName, email, subject, message }
 *
 * Success response:
 *   { success: true, message: "Message sent successfully!" }
 *
 * Error response:
 *   { success: false, error: "Error description" }
 */
router.post(
  '/',
  contactValidationRules,       // Step 1: validate + sanitize all fields
  handleValidationErrors,       // Step 2: abort with 422 if invalid
  sendContactEmail              // Step 3: send emails & respond
);

module.exports = router;
