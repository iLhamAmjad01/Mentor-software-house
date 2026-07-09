const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a detailed internship application summary to HR.
 * Includes CV attachment.
 */
const sendAdminNotification = async (application, cvPath) => {
  const hrEmail = process.env.HR_EMAIL || 'softwarehousementor@gmail.com';
  
  // Format dates and sizes for display
  const applicationTime = new Date(application.createdAt).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  
  const resumeSizeMB = (application.resumeSize / (1024 * 1024)).toFixed(2);
  
  // Load email template
  const templatePath = path.join(__dirname, '../templates/adminNotification.js');
  const getTemplate = require(templatePath);
  const htmlContent = getTemplate(application, applicationTime, resumeSizeMB);

  const mailOptions = {
    from: `"MentorTech System" <${process.env.SMTP_USER}>`,
    to: hrEmail,
    subject: `New Internship Application - ${application.fullName}`,
    html: htmlContent,
    attachments: [
      {
        filename: application.resumeOriginalName,
        path: cvPath,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Sends auto-confirmation email to the applicant.
 */
const sendApplicantConfirmation = async (email, fullName) => {
  const templatePath = path.join(__dirname, '../templates/autoReply.js');
  const getTemplate = require(templatePath);
  const htmlContent = getTemplate(fullName);

  const mailOptions = {
    from: `"MentorTech HR Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Application Received | MentorTech',
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  transporter,
  sendAdminNotification,
  sendApplicantConfirmation,
};
