module.exports = (messageDetails, timeString) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Direct Inquiry | MentorTech</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
    
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
              <table class="card-padding" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 20px; border: 1px solid rgba(96, 145, 149, 0.12); box-shadow: 0 10px 25px rgba(96, 145, 149, 0.05); padding: 40px 35px;">
                
                <!-- Eyebrow -->
                <tr>
                  <td align="left" style="padding-bottom: 8px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="20" height="2" bgcolor="#e8a87c">&nbsp;</td>
                        <td style="font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #e8a87c; padding-left: 8px;">
                          New Contact Message
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Title -->
                <tr>
                  <td align="left" style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: #1a2e30; padding-bottom: 25px; line-height: 1.2;">
                    Direct Inquiry Received
                  </td>
                </tr>
                
                <!-- Sender Info Table -->
                <tr>
                  <td style="padding-bottom: 25px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8faf9; border-radius: 12px; padding: 20px; border: 1px solid rgba(96, 145, 149, 0.1);">
                      <tr>
                        <td width="30%" style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #609195; padding-bottom: 8px; text-transform: uppercase;">From:</td>
                        <td width="70%" style="font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; color: #2c3e40; padding-bottom: 8px;">${messageDetails.fullName}</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #609195; padding-bottom: 8px; text-transform: uppercase;">Email:</td>
                        <td style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #3e6568; padding-bottom: 8px;">
                          <a href="mailto:${messageDetails.email}" style="color: #3e6568; text-decoration: none; border-bottom: 1px dotted #3e6568;">${messageDetails.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #609195; padding-bottom: 8px; text-transform: uppercase;">Subject:</td>
                        <td style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40; padding-bottom: 8px;">${messageDetails.subject}</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #609195; text-transform: uppercase;">Sent At:</td>
                        <td style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #2c3e40;">${timeString}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Message Body -->
                <tr>
                  <td align="left" style="font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #609195; padding-bottom: 8px; text-transform: uppercase;">
                    Message Content:
                  </td>
                </tr>
                <tr>
                  <td align="left" style="font-family: 'DM Sans', sans-serif; font-size: 15px; color: #2c3e40; line-height: 1.7; padding: 20px; background-color: #ffffff; border-radius: 12px; border: 1.5px solid var(--teal-light); border-color: rgba(96, 145, 149, 0.2); white-space: pre-line;">
                    ${messageDetails.message}
                  </td>
                </tr>
                
                <!-- Extra metadata -->
                <tr>
                  <td style="padding-top: 25px; border-top: 1px solid rgba(96, 145, 149, 0.15);">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #a0b0b2;">
                          IP Address: ${messageDetails.ipAddress || 'N/A'}<br>
                          Browser Agent: ${messageDetails.browser || 'N/A'}
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
              <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#1a2e30" style="background: linear-gradient(160deg, #2a464a, #1a2e30); background-color: #1a2e30; border-radius: 20px; padding: 25px; text-align: center;">
                <tr>
                  <td style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #ffffff; padding-bottom: 10px;">
                    <strong>MentorTech Administration System</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #a8c8cb;">
                    This is an automated notification system. Please reply directly to the sender's email listed above.
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
