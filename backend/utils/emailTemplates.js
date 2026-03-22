/**
 * emailTemplates.js
 * Premium HTML email templates with fully inline CSS.
 * Dark theme, professional typography, optimized for all mail clients.
 */

/**
 * Formats a Date object into a human-readable timestamp string.
 * @param {Date} date
 * @returns {string}
 */
function formatTimestamp(date) {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/**
 * Truncates a string to maxLen characters, appending '...' if needed.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen).trimEnd() + '...' : str;
}


// EMAIL 1 — Notification email sent TO Ratnesh (the owner)

/**
 * Generates the owner notification email HTML.
 * @param {{ firstName: string, lastName: string, email: string, subject: string, message: string }} data
 * @param {string} [senderIP] - Optional sender IP address
 * @returns {string} Full HTML string
 */
function ownerNotificationTemplate({ firstName, lastName, email, subject, message }, senderIP) {
  const now = new Date();
  const timestamp = formatTimestamp(now);
  const fullName = `${firstName} ${lastName}`.trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050505;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Main card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;background-color:#0e0e11;border-radius:24px;
                 border:1px solid rgba(255,255,255,0.05);
                 box-shadow:0 30px 60px rgba(0,0,0,0.6);overflow:hidden;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg, #111116 0%, #171722 100%);
                        padding:40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.03);">
              
              <div style="display:inline-block;background:rgba(56,189,248,0.1);
                          border:1px solid rgba(56,189,248,0.2);border-radius:20px;
                          padding:6px 16px;margin-bottom:20px;">
                <span style="color:#38bdf8;font-size:11px;font-weight:700;
                              letter-spacing:0.1em;text-transform:uppercase;">
                  New Lead
                </span>
              </div>

              <h1 style="margin:0;font-size:24px;font-weight:700;color:#f8fafc;letter-spacing:-0.03em;">
                Contact Form Submission
              </h1>
            </td>
          </tr>

          <!-- ── SENDER INFO ── -->
          <tr>
            <td style="padding:40px 40px 0;">
              
              <!-- Sender Table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" 
                     style="background-color:#16161e;border-radius:16px;padding:24px;border:1px solid rgba(255,255,255,0.03);">
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin-bottom:4px;">From</span>
                    <span style="font-size:15px;font-weight:600;color:#f8fafc;">${fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin-bottom:4px;">Reply-To Email</span>
                    <a href="mailto:${email}" style="font-size:15px;font-weight:600;color:#38bdf8;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin-bottom:4px;">Subject</span>
                    <span style="font-size:15px;font-weight:500;color:#cbd5e1;">${subject}</span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── MESSAGE BODY ── -->
          <tr>
            <td style="padding:30px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">
                Message Content
              </p>

              <div style="background:rgba(56,189,248,0.03);border-radius:16px;
                           border:1px solid rgba(56,189,248,0.1);padding:24px;">
                <p style="margin:0;color:#e2e8f0;font-size:15px;
                           line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- ── REPLY CTA ── -->
          <tr>
            <td style="padding:40px;text-align:center;">
              <a href="mailto:${email}?subject=Re: ${subject}"
                 style="display:inline-block;background-color:#38bdf8;color:#0f172a;
                        font-size:14px;font-weight:600;text-decoration:none;
                        padding:14px 32px;border-radius:12px;letter-spacing:0.02em;">
                Reply to ${firstName}
              </a>
            </td>
          </tr>

        </table><!-- /main card -->

        <!-- Bottom tiny footer -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
          <tr>
            <td align="center">
              <p style="margin:0;color:#475569;font-size:12px;line-height:1.6;">
                Timestamp: ${timestamp}<br />
                ${senderIP ? `IP Address: ${senderIP}` : ''}
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}


// EMAIL 2 — Auto-reply welcome email sent TO the sender

/**
 * Generates the sender auto-reply email HTML.
 * @param {{ firstName: string, lastName: string, email: string, subject: string, message: string }} data
 * @returns {string} Full HTML string
 */
function senderAutoReplyTemplate({ firstName, message }) {
  const preview = truncate(message, 120);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for reaching out</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#050505;padding:60px 20px;">
    <tr>
      <td align="center">

        <!-- Main card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;background-color:#0e0e11;border-radius:24px;
                 border:1px solid rgba(255,255,255,0.05);
                 box-shadow:0 30px 60px rgba(0,0,0,0.6);overflow:hidden;">

          <!-- ── HEADER IMAGE/GRADIENT ── -->
          <tr>
            <td style="background:linear-gradient(135deg, #111116 0%, #171722 100%);
                        padding:50px 40px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.03);">
              
              <!-- Clean Minimalist Monogram -->
              <div style="width:56px;height:56px;border-radius:16px;margin:0 auto 24px;
                           background:linear-gradient(135deg,#e2e8f0 0%,#94a3b8 100%);
                           display:flex;align-items:center;justify-content:center;
                           box-shadow:0 8px 16px rgba(255,255,255,0.1);">
                <span style="font-size:22px;font-weight:800;color:#0f172a;line-height:56px;display:block;">R</span>
              </div>

              <h1 style="margin:0 0 12px;font-size:26px;font-weight:700;color:#f8fafc;letter-spacing:-0.03em;">
                Hi ${firstName}, <br/>Message Received.
              </h1>
              <p style="margin:0;color:#94a3b8;font-size:15px;font-weight:400;line-height:1.6;">
                Thanks for reaching out! This is an automated confirmation that your message successfully landed in my priority inbox.
              </p>
            </td>
          </tr>

          <!-- ── MAIN BODY ── -->
          <tr>
            <td style="padding:40px;">

              <!-- Expected Response Time -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:30px;">
                <tr>
                  <td width="48" valign="top">
                    <div style="width:36px;height:36px;border-radius:50%;background:rgba(56,189,248,0.1);display:inline-block;line-height:36px;text-align:center;">
                      <span style="font-size:18px;color:#38bdf8;">✦</span>
                    </div>
                  </td>
                  <td valign="top" style="padding-left:16px;">
                    <h3 style="margin:0 0 4px;color:#e2e8f0;font-size:15px;font-weight:600;">Fast Response Time</h3>
                    <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6;">
                      I review every inquiry personally. You can expect a thoughtful reply from me directly within the next <strong style="color:#e2e8f0;">24 hours</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message summary block -->
              <div style="background-color:#16161e;border-radius:16px;padding:24px;
                           border:1px solid rgba(255,255,255,0.03);position:relative;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">
                  Your Message Preview
                </p>
                <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.7;font-style:italic;">
                  "${preview}"
                </p>
              </div>

            </td>
          </tr>

          <!-- ── LINKS & FOOTER ── -->
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="height:1px;background:rgba(255,255,255,0.05);margin-bottom:32px;"></div>
              
              <p style="margin:0 0 20px;text-align:center;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">
                Explore My Work Meanwhile
              </p>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-right:8px; width:33.3%;">
                    <a href="https://github.com/RATNESH2121"
                      style="display:block;background-color:#1e293b;border:1px solid rgba(255,255,255,0.05);
                              color:#f1f5f9;border-radius:12px;padding:12px;text-decoration:none;
                              font-size:13px;font-weight:600;text-align:center;">
                      GitHub
                    </a>
                  </td>
                  <td align="center" style="padding:0 4px; width:33.3%;">
                    <a href="https://linkedin.com/in/ratnesh6208/"
                      style="display:block;background-color:#1e293b;border:1px solid rgba(255,255,255,0.05);
                              color:#f1f5f9;border-radius:12px;padding:12px;text-decoration:none;
                              font-size:13px;font-weight:600;text-align:center;">
                      LinkedIn
                    </a>
                  </td>
                  <td align="center" style="padding-left:8px; width:33.3%;">
                    <a href="http://localhost:8081"
                      style="display:block;background-color:#1e293b;border:1px solid rgba(255,255,255,0.05);
                              color:#f1f5f9;border-radius:12px;padding:12px;text-decoration:none;
                              font-size:13px;font-weight:600;text-align:center;">
                      Portfolio
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table><!-- /main card -->

        <!-- Bottom tiny footer -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
          <tr>
            <td align="center">
              <p style="margin:0 0 8px;color:#94a3b8;font-size:14px;font-weight:500;">
                Best regards, Ratnesh
              </p>
              <p style="margin:0;color:#475569;font-size:12px;line-height:1.5;">
                Full Stack Developer <br/>
                India
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

module.exports = { ownerNotificationTemplate, senderAutoReplyTemplate };
