const fs = require('fs');
const { validationResult } = require('express-validator');
const InternshipApplication = require('../models/InternshipApplication');
const { sendAdminNotification, sendApplicantConfirmation } = require('../config/nodemailer');

/**
 * Handle new internship application submission
 * POST /api/internships/apply
 */
const applyInternship = async (req, res, next) => {
  console.log(`[Submission] Form received. IP Address: ${req.ip || 'Unknown'}`);
  if (req.file) {
    console.log(`[Submission] File uploaded successfully: ${req.file.originalname} -> ${req.file.filename} (${req.file.size} bytes)`);
  } else {
    console.log('[Submission] Warning: No file attachment present in request.');
  }

  try {
    // 1. Check for express-validator validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`[Submission] Validation failed:`, errors.array().map(e => `${e.path}: ${e.msg}`));
      // If validation fails, delete the uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
        console.log(`[Submission] Cleaned up uploaded file due to validation failure.`);
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    // 2. Ensure resume file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume PDF upload is required',
      });
    }

    const {
      fullName,
      email,
      phone,
      city,
      country,
      cnic,
      university,
      degree,
      semester,
      graduationYear,
      cgpa,
      position,
      internshipType,
      skills,
      experience,
      linkedin,
      github,
      portfolio,
      coverLetter,
      whyJoin,
      availableDate,
    } = req.body;

    // 3. Prevent duplicate applications from the same email within 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const duplicate = await InternshipApplication.findOne({
      email: email.toLowerCase().trim(),
      createdAt: { $gte: oneDayAgo },
    });

    if (duplicate) {
      console.log(`[Submission] Duplicate application check failed for email: ${email}`);
      // Clean up uploaded resume
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'An application from this email address has already been submitted in the last 24 hours.',
      });
    }

    // 4. Extract IP address and browser info
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
    const browser = req.headers['user-agent'] || 'Unknown';

    // 5. Build application object
    const application = new InternshipApplication({
      fullName,
      email: email.toLowerCase().trim(),
      phone,
      city,
      country,
      cnic,
      university,
      degree,
      semester,
      graduationYear: graduationYear ? parseInt(graduationYear, 10) : undefined,
      cgpa: cgpa ? parseFloat(cgpa) : undefined,
      position,
      internshipType,
      skills,
      experience,
      linkedin,
      github,
      portfolio,
      coverLetter,
      whyJoin,
      availableDate: availableDate ? new Date(availableDate) : undefined,
      resume: req.file.filename,
      resumeOriginalName: req.file.originalname,
      resumeSize: req.file.size,
      resumeMimeType: req.file.mimetype,
      ipAddress,
      browser,
    });

    // 6. Save application to MongoDB
    console.log(`[Submission] Saving application for ${fullName} to database...`);
    await application.save();
    console.log(`[Submission] MongoDB saved successfully. Application ID: ${application._id}`);

    // 7. Return success response immediately so the user doesn't wait
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Check your inbox for confirmation.',
      applicationId: application._id,
    });

    // 8. Dispatch Emails in the background (asynchronous & non-blocking)
    setImmediate(async () => {
      console.log(`[Email] Background email dispatch initiated for application ID: ${application._id}`);
      try {
        await sendAdminNotification(application, req.file.path);
      } catch (emailError) {
        // Logs are handled within sendAdminNotification, but we catch here to prevent background promise unhandled exceptions
      }
      try {
        await sendApplicantConfirmation(application.email, application.fullName);
      } catch (emailError) {
        // Logs are handled within sendApplicantConfirmation
      }
    });

  } catch (error) {
    console.error(`[Submission] Exception in applyInternship: ${error.message}`);
    // Let global error handler delete the file and return 500
    next(error);
  }
};

module.exports = {
  applyInternship,
};
