const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Create MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'devtasoft_db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Connection & Initialize Tables
async function initDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully!');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        domain VARCHAR(255) NOT NULL,
        description TEXT,
        image LONGTEXT NOT NULL,
        show_on_landing TINYINT(1) DEFAULT 1,
        created_at BIGINT NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        domain VARCHAR(255) NOT NULL,
        description TEXT,
        image LONGTEXT NOT NULL,
        category VARCHAR(255),
        show_on_landing TINYINT(1) DEFAULT 0,
        created_at BIGINT NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS visibility (
        id VARCHAR(255) PRIMARY KEY,
        settings JSON NOT NULL
      );
    `);

    connection.release();
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  }
}

initDB();

// ── PRODUCTS ENDPOINTS ───────────────────────────────────────────────────

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    const products = rows.map((row) => ({
      id: row.id,
      name: row.name,
      domain: row.domain,
      description: row.description || '',
      image: row.image,
      showOnLanding: Boolean(row.show_on_landing),
      createdAt: Number(row.created_at),
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { id, name, domain, description, image, showOnLanding, createdAt } = req.body;
  if (!id || !name || !domain) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const query = `
      INSERT INTO products (id, name, domain, description, image, show_on_landing, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        domain = VALUES(domain),
        description = VALUES(description),
        image = VALUES(image),
        show_on_landing = VALUES(show_on_landing),
        created_at = VALUES(created_at);
    `;
    await pool.query(query, [
      id,
      name,
      domain,
      description || null,
      image,
      showOnLanding ? 1 : 0,
      createdAt || Date.now(),
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PORTFOLIO ENDPOINTS ──────────────────────────────────────────────────

app.get('/api/portfolio', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio ORDER BY created_at DESC');
    const portfolio = rows.map((row) => ({
      id: row.id,
      name: row.name,
      domain: row.domain,
      description: row.description || '',
      image: row.image,
      category: row.category || '',
      showOnLanding: Boolean(row.show_on_landing),
      createdAt: Number(row.created_at),
    }));
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/portfolio', async (req, res) => {
  const { id, name, domain, description, image, category, showOnLanding, createdAt } = req.body;
  if (!id || !name || !domain) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const query = `
      INSERT INTO portfolio (id, name, domain, description, image, category, show_on_landing, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        domain = VALUES(domain),
        description = VALUES(description),
        image = VALUES(image),
        category = VALUES(category),
        show_on_landing = VALUES(show_on_landing),
        created_at = VALUES(created_at);
    `;
    await pool.query(query, [
      id,
      name,
      domain,
      description || null,
      image,
      category || null,
      showOnLanding ? 1 : 0,
      createdAt || Date.now(),
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── VISIBILITY ENDPOINTS ─────────────────────────────────────────────────

app.get('/api/visibility', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT settings FROM visibility WHERE id = 'settings'");
    if (rows.length > 0) {
      const settings = typeof rows[0].settings === 'string' ? JSON.parse(rows[0].settings) : rows[0].settings;
      return res.json(settings);
    }
    res.json(null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/visibility', async (req, res) => {
  try {
    const settingsStr = JSON.stringify(req.body);
    const query = `
      INSERT INTO visibility (id, settings) VALUES ('settings', ?)
      ON DUPLICATE KEY UPDATE settings = VALUES(settings);
    `;
    await pool.query(query, [settingsStr]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── SMTP CONTACT ENDPOINT ────────────────────────────────────────────────
const nodemailer = require('nodemailer');

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message, phone, company } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
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
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('SMTP Email Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DevtaSoft MySQL & SMTP API Server running on port ${PORT}`);
});

