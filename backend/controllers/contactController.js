const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../config/nodemailer');

/**
 * Handle new contact form submission
 * POST /api/contact/send
 */
const sendContactMessage = async (req, res, next) => {
  console.log(`[Contact] Message submission received. IP: ${req.ip || 'Unknown'}`);
  try {
    // 1. Check for validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`[Contact] Validation failed:`, errors.array().map(e => `${e.path}: ${e.msg}`));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
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
    console.log(`[Contact] Saving message from ${fullName} to database...`);
    await contactMessage.save();
    console.log(`[Contact] MongoDB saved successfully. Message ID: ${contactMessage._id}`);

    // 5. Return success response immediately
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get in touch with you soon.',
    });

    // 6. Send notification email to HR/Admin in the background
    setImmediate(async () => {
      console.log(`[Email] Background email dispatch initiated for contact message ID: ${contactMessage._id}`);
      try {
        await sendContactNotification(contactMessage);
      } catch (emailError) {
        // Logs are handled within sendContactNotification
      }
    });

  } catch (error) {
    console.error(`[Contact] Exception in sendContactMessage: ${error.message}`);
    next(error);
  }
};

module.exports = {
  sendContactMessage,
};
