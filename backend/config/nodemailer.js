const fs = require('fs');
const path = require('path');

// Helper to make API requests to Resend using built-in fetch
const resendEmail = async ({ from, to, subject, html, replyTo, attachments }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not defined');
  }

  const payload = {
    from: from || 'MentorTech <onboarding@resend.dev>',
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }

  if (attachments && attachments.length > 0) {
    payload.attachments = attachments;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Resend API Error: ${response.status}`);
  }

  return data;
};

// Mock transporter to maintain compatibility with server.js verification
const transporter = {
  verify: (cb) => {
    if (!process.env.RESEND_API_KEY) {
      console.warn('>>> [Resend] Warning: RESEND_API_KEY is not defined.');
      cb(new Error('RESEND_API_KEY is missing from environment variables'), null);
    } else {
      console.log('>>> [Resend] API key is loaded. Ready to deliver messages.');
      cb(null, true);
    }
  },
};

/**
 * Sends a detailed internship application summary to HR.
 * Includes CV attachment.
 */
const sendAdminNotification = async (application, cvPath) => {
  const hrEmail = process.env.HR_EMAIL || 'softwarehousementor@gmail.com';
  console.log(`[Email] Resend sending started: HR notification for applicant ${application.fullName} to ${hrEmail}`);
  
  try {
    // Format dates and sizes for display
    let applicationTime;
    try {
      applicationTime = new Date(application.createdAt).toLocaleString('en-US', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch (tzError) {
      console.warn(`[Email] Timezone formatting failed: ${tzError.message}. Falling back to default locale formatting.`);
      applicationTime = new Date(application.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
    
    const resumeSizeMB = (application.resumeSize / (1024 * 1024)).toFixed(2);
    
    // Load email template
    const templatePath = path.join(__dirname, '../templates/adminNotification.js');
    const getTemplate = require(templatePath);
    const htmlContent = getTemplate(application, applicationTime, resumeSizeMB);

    // Read and base64-encode the attachment
    const attachments = [];
    if (cvPath && fs.existsSync(cvPath)) {
      try {
        const fileBuffer = fs.readFileSync(cvPath);
        attachments.push({
          filename: application.resumeOriginalName || 'resume.pdf',
          content: fileBuffer.toString('base64'),
        });
      } catch (err) {
        console.error(`[Email] Failed to attach resume at ${cvPath}:`, err.message);
      }
    }

    const fromEmail = process.env.EMAIL_FROM || 'MentorTech <onboarding@resend.dev>';

    const info = await resendEmail({
      from: fromEmail,
      to: hrEmail,
      subject: `New Internship Application - ${application.fullName}`,
      html: htmlContent,
      attachments,
    });

    console.log(`[Email] Resend success: HR notification for ${application.fullName} sent. Message ID: ${info.id}`);
    return { messageId: info.id };
  } catch (error) {
    console.error(`[Email] Resend failure: HR notification for applicant ${application.fullName} FAILED:`, error.message);
    throw error;
  }
};

/**
 * Sends auto-confirmation email to the applicant.
 */
const sendApplicantConfirmation = async (email, fullName) => {
  console.log(`[Email] Resend sending started: Applicant confirmation for ${fullName} to ${email}`);
  
  try {
    const fromEmail = process.env.EMAIL_FROM || 'MentorTech <onboarding@resend.dev>';
    
    // Safety check for Resend Free Tier onboarding domain limit
    const registeredOwner = (process.env.HR_EMAIL || 'softwarehousementor@gmail.com').toLowerCase();
    if (fromEmail.includes('onboarding@resend.dev') && email.toLowerCase() !== registeredOwner) {
      console.warn(`[Email] Skipping applicant confirmation for ${email}. Reason: The Resend free onboarding domain can only deliver to the account owner (${registeredOwner}). To send to other emails, verify a custom domain in Resend.`);
      return { skipped: true };
    }

    const templatePath = path.join(__dirname, '../templates/autoReply.js');
    const getTemplate = require(templatePath);
    const htmlContent = getTemplate(fullName);

    const info = await resendEmail({
      from: fromEmail,
      to: email,
      subject: 'Application Received | MentorTech',
      html: htmlContent,
    });

    console.log(`[Email] Resend success: Applicant confirmation for ${fullName} sent. Message ID: ${info.id}`);
    return { messageId: info.id };
  } catch (error) {
    console.error(`[Email] Resend failure: Applicant confirmation for ${fullName} FAILED:`, error.message);
    throw error;
  }
};

/**
 * Sends a direct contact message inquiry to HR/Admin.
 */
const sendContactNotification = async (contactMessage) => {
  const hrEmail = process.env.HR_EMAIL || 'softwarehousementor@gmail.com';
  console.log(`[Email] Resend sending started: Contact form notification from ${contactMessage.fullName} to ${hrEmail}`);
  
  try {
    let formattedTime;
    try {
      formattedTime = new Date(contactMessage.createdAt).toLocaleString('en-US', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch (tzError) {
      console.warn(`[Email] Timezone formatting failed for contact notification: ${tzError.message}. Falling back to default.`);
      formattedTime = new Date(contactMessage.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
    
    const templatePath = path.join(__dirname, '../templates/contactNotification.js');
    const getTemplate = require(templatePath);
    const htmlContent = getTemplate(contactMessage, formattedTime);

    const fromEmail = process.env.EMAIL_FROM || 'MentorTech <onboarding@resend.dev>';

    const info = await resendEmail({
      from: fromEmail,
      to: hrEmail,
      replyTo: contactMessage.email,
      subject: `Contact Form: ${contactMessage.subject}`,
      html: htmlContent,
    });

    console.log(`[Email] Resend success: Contact form notification from ${contactMessage.fullName} sent. Message ID: ${info.id}`);
    return { messageId: info.id };
  } catch (error) {
    console.error(`[Email] Resend failure: Contact form notification from ${contactMessage.fullName} FAILED:`, error.message);
    throw error;
  }
};

module.exports = {
  transporter,
  sendAdminNotification,
  sendApplicantConfirmation,
  sendContactNotification,
};
