const express = require('express');
const { body } = require('express-validator');
const upload = require('../middlewares/uploadMiddleware');
const { applyLimiter } = require('../middlewares/rateLimiter');
const { applyInternship } = require('../controllers/internshipController');

const router = express.Router();

// Public apply route with rate limiting, file upload parser, and validator chains
router.post(
  '/apply',
  applyLimiter,
  upload.single('resume'),
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').trim().isEmail().withMessage('A valid email address is required').normalizeEmail(),
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[0-9+\-\s()]{7,20}$/).withMessage('Please enter a valid phone number (at least 7 characters)'),
    body('university').trim().notEmpty().withMessage('University name is required'),
    body('degree').trim().notEmpty().withMessage('Degree is required'),
    body('position').trim().notEmpty().withMessage('Applied position is required'),
  ],
  applyInternship
);

module.exports = router;
