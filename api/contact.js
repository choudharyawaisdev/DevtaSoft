const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, phone, company } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const smtpUser = process.env.SMTP_USER || 'chawaisdev92@gmail.com';
  const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || smtpUser || 'chawaisdev92@gmail.com';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const formattedDate = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const mailOptions = {
    from: `"DevtaSoft Web Portal" <${smtpUser}>`,
    to: receiverEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `🚀 DevtaSoft Lead: ${subject || 'New Business Inquiry'} from ${name}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevtaSoft Contact Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0B0F19; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="620" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #111827; border-radius: 20px; overflow: hidden; border: 1px solid #1F2937; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0D152A 0%, #1E2640 100%); padding: 32px 28px; text-align: center; border-bottom: 3px solid #00C2CC;">
              <div style="display: inline-block; padding: 5px 14px; background-color: rgba(0, 194, 204, 0.15); border: 1px solid rgba(0, 194, 204, 0.4); border-radius: 50px; color: #00C2CC; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">
                DevtaSoft Web Portal Inquiry
              </div>
              <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0;">
                🚀 New Lead Received
              </h1>
              <p style="color: #9CA3AF; font-size: 12px; margin: 6px 0 0 0;">
                Submitted on ${formattedDate}
              </p>
            </td>
          </tr>

          <!-- Client Info Card -->
          <tr>
            <td style="padding: 28px 28px 14px 28px;">
              <div style="background-color: #1F2937; border-radius: 14px; border: 1px solid #374151; padding: 20px;">
                <h3 style="color: #FF8706; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 14px 0;">
                  👤 Client Details
                </h3>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding: 6px 0; color: #9CA3AF; font-size: 13px; font-weight: 600; width: 100px;">Full Name:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 700;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9CA3AF; font-size: 13px; font-weight: 600;">Email:</td>
                    <td style="padding: 6px 0; color: #00C2CC; font-size: 14px; font-weight: 700;">
                      <a href="mailto:${email}" style="color: #00C2CC; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 6px 0; color: #9CA3AF; font-size: 13px; font-weight: 600;">Phone:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 700;">
                      <a href="tel:${phone}" style="color: #FFFFFF; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>` : ''}
                  ${company ? `
                  <tr>
                    <td style="padding: 6px 0; color: #9CA3AF; font-size: 13px; font-weight: 600;">Company:</td>
                    <td style="padding: 6px 0; color: #FFFFFF; font-size: 14px; font-weight: 700;">${company}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 6px 0; color: #9CA3AF; font-size: 13px; font-weight: 600;">Subject:</td>
                    <td style="padding: 6px 0; color: #FF8706; font-size: 14px; font-weight: 700;">${subject || 'General Inquiry'}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 14px 28px 28px 28px;">
              <div style="background-color: #1F2937; border-radius: 14px; border: 1px solid #374151; border-left: 4px solid #00C2CC; padding: 20px;">
                <h4 style="color: #00C2CC; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 10px 0;">
                  💬 Client Message
                </h4>
                <p style="color: #E5E7EB; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">
                  ${message}
                </p>
              </div>

              <!-- Quick Action Button -->
              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'DevtaSoft Inquiry')}" style="display: inline-block; background: linear-gradient(135deg, #00C2CC 0%, #14B8B0 100%); color: #0D152A; font-weight: 800; font-size: 13px; padding: 12px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 8px 16px -4px rgba(0, 194, 204, 0.4);">
                  ✉️ Reply Direct to ${name.split(' ')[0]}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0D152A; padding: 20px 28px; text-align: center; border-top: 1px solid #1F2937;">
              <p style="color: #6B7280; font-size: 11px; margin: 0 0 4px 0;">
                Sent automatically via DevtaSoft Enterprise Email Engine
              </p>
              <p style="color: #4B5563; font-size: 10px; margin: 0;">
                © ${new Date().getFullYear()} DevtaSoft Software House. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SMTP Email Send Error:', error);
    return res.status(500).json({ error: 'Failed to send email via SMTP.', details: error?.message });
  }
};
