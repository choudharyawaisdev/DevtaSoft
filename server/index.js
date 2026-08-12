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

  const mailOptions = {
    from: `"DevtaSoft Contact Form" <${smtpUser}>`,
    to: receiverEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `🚀 New Contact Submission: ${subject || 'General Inquiry'}`,
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
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('SMTP Email Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DevtaSoft MySQL & SMTP API Server running on port ${PORT}`);
});

