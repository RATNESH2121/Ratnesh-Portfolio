/**
 * validateContact.js
 * ─────────────────────────────────────────────────────────────────
 * express-validator middleware chain for the /api/contact endpoint.
 * Validates all fields, sanitizes inputs to prevent XSS/injection.
 * ─────────────────────────────────────────────────────────────────
 */

const { body, validationResult } = require('express-validator');

/**
 * Validation rules array.
 * Each rule: trims whitespace, checks presence, sanitizes output.
 */
const contactValidationRules = [
  // ── First Name ──
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required.')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters.')
    .escape(), // strips HTML tags / special chars

  // ── Last Name ──
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required.')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters.')
    .escape(),

  // ── Email ──
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(), // lowercase + strip sub-addressing (Gmail safe)

  // ── Subject ──
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ min: 2, max: 150 })
    .withMessage('Subject must be between 2 and 150 characters.')
    .escape(),

  // ── Message ──
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Message must be between 2 and 1000 characters.')
    .escape(),
];

/**
 * Middleware that runs after the rules above.
 * If any validation errors exist, returns 422 with structured errors.
 * Otherwise calls next() to proceed to the controller.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Return the first validation error message for a clean UX
    const firstError = errors.array()[0];
    return res.status(422).json({
      success: false,
      error: firstError.msg,
      // Optionally expose all errors for debugging
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  next();
}

module.exports = { contactValidationRules, handleValidationErrors };
