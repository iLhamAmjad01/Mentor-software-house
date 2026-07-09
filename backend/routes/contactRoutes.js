const express = require('express');
const { body } = require('express-validator');
const { contactLimiter } = require('../middlewares/rateLimiter');
const { sendContactMessage } = require('../controllers/contactController');

const router = express.Router();

// Route for sending a contact message
router.post(
  '/send',
  contactLimiter,
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').trim().isEmail().withMessage('A valid email address is required').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message content is required'),
  ],
  sendContactMessage
);

module.exports = router;
