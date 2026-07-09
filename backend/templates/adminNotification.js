module.exports = (app, applicationTime, resumeSizeMB) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Internship Application | MentorTech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&family=Space+Mono:wght@500;700&display=swap');
    
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; padding: 10px !important; }
      .card-padding { padding: 24px 16px !important; }
      .detail-table td { display: block !important; width: 100% !important; box-sizing: border-box; }
      .detail-table tr { margin-bottom: 12px; display: block; }
      .detail-table td.label { padding: 8px 12px 2px 12px !important; border-bottom: none !important; }
      .detail-table td.value { padding: 2px 12px 8px 12px !important; border-bottom: 1px solid rgba(96, 145, 149, 0.1) !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #f4f7f6; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2c3e40;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f7f6" style="background-color: #f4f7f6;">
    <tr>
      <td align="center" style="padding: 20px 0 40px 0;">
        <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="650" style="width: 650px; max-width: 650px; border-collapse: collapse;">
          
          <!-- HEADER -->
          <tr>
            <td align="center" style="padding: 25px 24px; border-bottom: 1px solid rgba(96, 145, 149, 0.15);">
              <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: #3e6568; letter-spacing: 0.5px;">
                Mentor<span style="color: #609195; font-weight: 900;">Tech</span>
              </span>
            </td>
          </tr>
          
          <!-- BODY CARD -->
          <tr>
            <td style="padding: 20px 10px 0 10px;">
              <table class="card-padding" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 20px; border: 1px solid rgba(96, 145, 149, 0.12); box-shadow: 0 10px 25px rgba(96, 145, 149, 0.05); padding: 40px 30px;">
                
                <!-- Eyebrow -->
                <tr>
                  <td align="left" style="padding-bottom: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="20" height="2" bgcolor="#609195">&nbsp;</td>
                        <td style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #609195; padding-left: 8px;">
                          Recruitment Alert
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Title -->
                <tr>
                  <td align="left" style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: #1a2e30; padding-bottom: 15px;">
                    New Internship Application
                  </td>
                </tr>
                
                <!-- Intro -->
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #5a7275; line-height: 1.6; padding-bottom: 25px;">
                    A candidate has submitted an application for the <strong>${app.position} (${app.internshipType})</strong> position. Details are provided below. The candidate's resume has been attached to this email.
                  </td>
                </tr>
                
                <!-- Form Fields Table -->
                <tr>
                  <td>
                    <table class="detail-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid rgba(96, 145, 149, 0.12); border-radius: 12px; overflow: hidden; background-color: #fafdfc;">
                      
                      <!-- SECTION: PERSONAL -->
                      <tr>
                        <td colspan="2" bgcolor="#e8f3f3" style="padding: 12px 18px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: #2c4e51; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(96, 145, 149, 0.2);">
                          Personal Information
                        </td>
                      </tr>
                      <tr>
                        <td class="label" width="30%" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Full Name</td>
                        <td class="value" width="70%" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.fullName}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Email</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);"><a href="mailto:${app.email}" style="color: #609195; text-decoration: none; font-weight: 500;">${app.email}</a></td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Phone</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.phone}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Location</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.city || 'N/A'}, ${app.country || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">CNIC</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.cnic || 'Not provided'}</td>
                      </tr>

                      <!-- SECTION: EDUCATION -->
                      <tr>
                        <td colspan="2" bgcolor="#e8f3f3" style="padding: 12px 18px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: #2c4e51; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(96, 145, 149, 0.15); border-bottom: 1px solid rgba(96, 145, 149, 0.2);">
                          Academic Details
                        </td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">University</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.university}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Degree</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.degree}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Semester / CGPA</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">Semester: ${app.semester || 'N/A'} | CGPA: ${app.cgpa || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Graduation Year</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.graduationYear || 'N/A'}</td>
                      </tr>

                      <!-- SECTION: APPLICATION DETAILS -->
                      <tr>
                        <td colspan="2" bgcolor="#e8f3f3" style="padding: 12px 18px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: #2c4e51; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(96, 145, 149, 0.15); border-bottom: 1px solid rgba(96, 145, 149, 0.2);">
                          Application & Professional Profile
                        </td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Applying For</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; color: #3e6568; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.position} (${app.internshipType || 'N/A'})</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Skills</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.skills || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Experience</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.experience || 'None'}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Social Links</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1); line-height: 1.6;">
                          ${app.linkedin ? `<strong>LinkedIn:</strong> <a href="${app.linkedin}" style="color: #609195; text-decoration: none;">${app.linkedin}</a><br>` : ''}
                          ${app.github ? `<strong>GitHub:</strong> <a href="${app.github}" style="color: #609195; text-decoration: none;">${app.github}</a><br>` : ''}
                          ${app.portfolio ? `<strong>Portfolio:</strong> <a href="${app.portfolio}" style="color: #609195; text-decoration: none;">${app.portfolio}</a>` : ''}
                          ${(!app.linkedin && !app.github && !app.portfolio) ? 'None' : ''}
                        </td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Availability Date</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.availableDate ? new Date(app.availableDate).toLocaleDateString() : 'Immediate'}</td>
                      </tr>

                      <!-- SECTION: STATEMENT -->
                      <tr>
                        <td colspan="2" bgcolor="#e8f3f3" style="padding: 12px 18px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: #2c4e51; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(96, 145, 149, 0.15); border-bottom: 1px solid rgba(96, 145, 149, 0.2);">
                          Applicant's Statements
                        </td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Cover Letter</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1); line-height: 1.5; white-space: pre-wrap;">${app.coverLetter || 'Not provided'}</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Why Join?</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1); line-height: 1.5; white-space: pre-wrap;">${app.whyJoin || 'Not provided'}</td>
                      </tr>

                      <!-- SECTION: METADATA -->
                      <tr>
                        <td colspan="2" bgcolor="#e8f3f3" style="padding: 12px 18px; font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; color: #2c4e51; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(96, 145, 149, 0.15); border-bottom: 1px solid rgba(96, 145, 149, 0.2);">
                          Submission Metadata
                        </td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">CV Attachment</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${app.resumeOriginalName} (${resumeSizeMB} MB)</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; border-bottom: 1px solid rgba(96, 145, 149, 0.1); background-color: #f7faf9;">Submitted At</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; border-bottom: 1px solid rgba(96, 145, 149, 0.1);">${applicationTime} (PKT)</td>
                      </tr>
                      <tr>
                        <td class="label" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700; color: #5a7275; background-color: #f7faf9;">Network Info</td>
                        <td class="value" style="padding: 12px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; line-height: 1.4;">
                          <strong>IP Address:</strong> ${app.ipAddress || 'Unknown'}<br>
                          <strong>Browser:</strong> ${app.browser || 'Unknown'}
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding: 30px 10px 0 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#1a2e30" style="background: linear-gradient(160deg, #2a464a, #1a2e30); background-color: #1a2e30; border-radius: 20px; padding: 30px; text-align: center;">
                <tr>
                  <td style="font-family: 'Playfair Display', Georgia, serif; font-size: 15px; font-style: italic; color: #a8c8cb; padding-bottom: 10px;">
                    Code. Learn. Grow.
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'DM Sans', Arial, sans-serif; font-size: 12px; color: #a8c8cb; line-height: 1.6; padding-bottom: 15px;">
                    This is an automated notification from your HR portal system. Do not share candidate details with external parties.
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(168, 200, 203, 0.45);">
                    &copy; 2026 MentorTech. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
