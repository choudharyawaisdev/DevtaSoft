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
  const smtpPass = (process.env.SMTP_PASS || 'joibjdbzgflhjpit').replace(/\s+/g, '');
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'chawaisdev92@gmail.com';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"DevtaSoft Contact Form" <${smtpUser}>`,
    to: receiverEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `🚀 New Contact Form Submission: ${subject || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="background-color: #0D152A; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #14B8B0; margin: 0;">DevtaSoft Contact Notification</h2>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
          <p style="font-size: 16px; color: #1e293b;">You have received a new contact inquiry from your website:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone}</td>
            </tr>` : ''}
            ${company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${subject || 'N/A'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #FF6B00; border-radius: 4px;">
            <p style="font-weight: bold; margin-top: 0; color: #334155;">Message:</p>
            <p style="color: #1e293b; white-space: pre-wrap; margin-bottom: 0;">${message}</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px;">
          Sent automatically from DevtaSoft Contact Form
        </div>
      </div>
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
