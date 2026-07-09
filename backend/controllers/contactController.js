const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../config/nodemailer');

/**
 * Handle new contact form submission
 * POST /api/contact/send
 */
const sendContactMessage = async (req, res, next) => {
  try {
    // 1. Check for validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { fullName, email, subject, message } = req.body;

    // 2. Extract IP address and browser info
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    const browser = req.headers['user-agent'] || 'Unknown';

    // 3. Build contact message object
    const contactMessage = new ContactMessage({
      fullName,
      email: email.toLowerCase().trim(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      ipAddress,
      browser,
    });

    // 4. Save to MongoDB
    await contactMessage.save();

    // 5. Send notification email to HR/Admin
    try {
      await sendContactNotification(contactMessage);
    } catch (emailError) {
      console.error('[Nodemailer Error] Failed to send contact form email alert:', emailError);
    }

    // 6. Return success response
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get in touch with you soon.',
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendContactMessage,
};
