module.exports = (fullName) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received | MentorTech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
    
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; padding: 10px !important; }
      .card-padding { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #f4f7f6; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2c3e40;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f4f7f6" style="background-color: #f4f7f6;">
    <tr>
      <td align="center" style="padding: 35px 0;">
        <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="580" style="width: 580px; max-width: 580px; border-collapse: collapse;">
          
          <!-- HEADER -->
          <tr>
            <td align="center" style="padding: 20px 24px; border-bottom: 1px solid rgba(96, 145, 149, 0.15);">
              <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: #3e6568; letter-spacing: 0.5px;">
                Mentor<span style="color: #609195; font-weight: 900;">Tech</span>
              </span>
            </td>
          </tr>
          
          <!-- MAIN CARD -->
          <tr>
            <td style="padding: 20px 10px 0 10px;">
              <table class="card-padding" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 20px; border: 1px solid rgba(96, 145, 149, 0.12); box-shadow: 0 10px 25px rgba(96, 145, 149, 0.05); padding: 45px 40px;">
                
                <!-- Eyebrow -->
                <tr>
                  <td align="left" style="padding-bottom: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="20" height="2" bgcolor="#609195">&nbsp;</td>
                        <td style="font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #609195; padding-left: 8px;">
                          Application Confirmation
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Title -->
                <tr>
                  <td align="left" style="font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: #1a2e30; padding-bottom: 25px; line-height: 1.2;">
                    Thank you for applying.
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #4a5f62; line-height: 1.7; padding-bottom: 20px;">
                    Dear ${fullName},
                  </td>
                </tr>
                
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #4a5f62; line-height: 1.7; padding-bottom: 20px;">
                    Thank you for applying to MentorTech.
                  </td>
                </tr>
                
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #4a5f62; line-height: 1.7; padding-bottom: 20px;">
                    We have successfully received your internship application and resume. Our HR team will review your application details and uploaded materials carefully.
                  </td>
                </tr>
                
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #4a5f62; line-height: 1.7; padding-bottom: 30px; border-bottom: 1px solid rgba(96, 145, 149, 0.15);">
                    If you are shortlisted, we will contact you within <strong>5–7 business days</strong> to arrange an interview. We appreciate the time and effort you took to apply.
                  </td>
                </tr>
                
                <!-- Sign off -->
                <tr>
                  <td align="left" style="padding-top: 30px; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #2c3e40; line-height: 1.6;">
                    Thank you for choosing MentorTech.
                    <br><br>
                    Regards,<br>
                    <strong>MentorTech HR Team</strong>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="padding: 30px 10px 0 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#1a2e30" style="background: linear-gradient(160deg, #2a464a, #1a2e30); background-color: #1a2e30; border-radius: 20px; padding: 25px; text-align: center;">
                <tr>
                  <td style="font-family: 'Playfair Display', Georgia, serif; font-size: 14px; font-style: italic; color: #a8c8cb; padding-bottom: 8px;">
                    Code. Learn. Grow.
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(168, 200, 203, 0.45);">
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
