const fs = require('fs');
const { validationResult } = require('express-validator');
const InternshipApplication = require('../models/InternshipApplication');
const { sendAdminNotification, sendApplicantConfirmation } = require('../config/nodemailer');

/**
 * Handle new internship application submission
 * POST /api/internships/apply
 */
const applyInternship = async (req, res, next) => {
  try {
    // 1. Check for express-validator validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, delete the uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
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
    await application.save();

    // 7. Dispatch Emails (Admin Notification & Applicant Auto-reply)
    // Wrap email sending in try-catch so failures here don't crash application submission, 
    // but still notify admin or applicant if something goes wrong.
    try {
      // Send email notifications
      await sendAdminNotification(application, req.file.path);
      await sendApplicantConfirmation(application.email, application.fullName);
    } catch (emailError) {
      // We log email errors, but don't fail the whole request because candidate data is already securely in MongoDB.
      console.error('[Nodemailer Error] Failed to send email alerts:', emailError);
    }

    // 8. Return success response
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Check your inbox for confirmation.',
      applicationId: application._id,
    });

  } catch (error) {
    // Let global error handler delete the file and return 500
    next(error);
  }
};

module.exports = {
  applyInternship,
};
