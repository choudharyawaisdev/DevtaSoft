-- ═══════════════════════════════════════════════════════════════════════════
-- DEVTASOFT MYSQL DATABASE SCHEMA SCRIPT
-- Open MySQL Workbench, connect to your MySQL Server, and execute this script.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS devtasoft_db;
USE devtasoft_db;

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  description TEXT,
  image LONGTEXT NOT NULL,
  show_on_landing TINYINT(1) DEFAULT 1,
  created_at BIGINT NOT NULL
);

-- 2. Create Portfolio Table
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

-- 3. Create Visibility Table
CREATE TABLE IF NOT EXISTS visibility (
  id VARCHAR(255) PRIMARY KEY,
  settings JSON NOT NULL
);

-- 4. Create Messages Table for Contact Form Submissions
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  phone VARCHAR(100),
  company VARCHAR(255),
  is_read TINYINT(1) DEFAULT 0,
  created_at BIGINT NOT NULL
);

-- Insert Default Settings if not present
INSERT INTO visibility (id, settings) VALUES ('settings', '{
  "pages": {
    "about": true,
    "products": true,
    "services": true,
    "portfolio": true,
    "contact": true
  },
  "sections": {
    "aboutSection": true,
    "servicesSection": true,
    "portfolioSection": true,
    "productsSection": true,
    "statsBar": true
  }
}') ON DUPLICATE KEY UPDATE id=id;
