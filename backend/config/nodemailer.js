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
  console.log(`[Email] Email sending started: HR notification for applicant ${application.fullName} to ${hrEmail}`);
  
  try {
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

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Email success: HR notification for applicant ${application.fullName} sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email] Email failure: HR notification for applicant ${application.fullName} FAILED:`, error.message);
    throw error;
  }
};

/**
 * Sends auto-confirmation email to the applicant.
 */
const sendApplicantConfirmation = async (email, fullName) => {
  console.log(`[Email] Email sending started: Applicant confirmation for ${fullName} to ${email}`);
  
  try {
    const templatePath = path.join(__dirname, '../templates/autoReply.js');
    const getTemplate = require(templatePath);
    const htmlContent = getTemplate(fullName);

    const mailOptions = {
      from: `"MentorTech HR Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Application Received | MentorTech',
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Email success: Applicant confirmation for ${fullName} sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email] Email failure: Applicant confirmation for ${fullName} FAILED:`, error.message);
    throw error;
  }
};

/**
 * Sends a direct contact message inquiry to HR/Admin.
 */
const sendContactNotification = async (contactMessage) => {
  const hrEmail = process.env.HR_EMAIL || 'softwarehousementor@gmail.com';
  console.log(`[Email] Email sending started: Contact form notification from ${contactMessage.fullName} to ${hrEmail}`);
  
  try {
    const formattedTime = new Date(contactMessage.createdAt).toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    
    const templatePath = path.join(__dirname, '../templates/contactNotification.js');
    const getTemplate = require(templatePath);
    const htmlContent = getTemplate(contactMessage, formattedTime);

    const mailOptions = {
      from: `"MentorTech Contact" <${process.env.SMTP_USER}>`,
      to: hrEmail,
      replyTo: contactMessage.email,
      subject: `Contact Form: ${contactMessage.subject}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Email success: Contact form notification from ${contactMessage.fullName} sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[Email] Email failure: Contact form notification from ${contactMessage.fullName} FAILED:`, error.message);
    throw error;
  }
};

module.exports = {
  transporter,
  sendAdminNotification,
  sendApplicantConfirmation,
  sendContactNotification,
};
