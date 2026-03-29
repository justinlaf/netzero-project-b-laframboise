// create-admin.js - Create admin user with hashed password
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function createAdmin() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Insert admin user
    const result = await pool.query(
      `INSERT INTO customers (name, email, phone, password_hash, loyalty_points) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (email) DO UPDATE 
       SET password_hash = $4
       RETURNING customer_id, name, email`,
      ['Admin User', 'admin@elmcafe.com', '613-767-8999', hashedPassword, 0]
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', result.rows[0].email);
    console.log('🔑 Password: admin123');
    console.log('🆔 Customer ID:', result.rows[0].customer_id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();