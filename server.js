// server.js - Database Connection Test for Net Zero Project B
// Student: Justin Laframboise
// Stack: Node.js + Express + PostgreSQL

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',
  database: 'elmcafe_db',
  password: '1619',   
  port: 5432,
});

// Root route - displays connection test
app.get('/', async (req, res) => {
  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as current_time, version() as db_version');
    
    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Connection Test - Project B</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          h1 {
            color: #2d3748;
            margin-bottom: 10px;
          }
          .success {
            background: #48bb78;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 1.2rem;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
          }
          .info {
            background: #f7fafc;
            border-left: 4px solid #4299e1;
            padding: 15px;
            margin: 15px 0;
          }
          .info strong {
            color: #2c5282;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            color: #718096;
            font-size: 0.9rem;
          }
          code {
            background: #2d3748;
            color: #68d391;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Database Connection Successful!</h1>
          
          <div class="success">
            🎉 PostgreSQL Connected Successfully
          </div>
          
          <div class="info">
            <strong>Student:</strong> Justin Laframboise<br>
            <strong>Project:</strong> Net Zero Project B - The Elm Cafe<br>
            <strong>Stack:</strong> Node.js + Express + PostgreSQL<br>
            <strong>Database:</strong> elmcafe_db
          </div>
          
          <div class="info">
            <strong>Server Time:</strong> ${result.rows[0].current_time}<br>
            <strong>Database Version:</strong> ${result.rows[0].db_version.split(' ')[0]} ${result.rows[0].db_version.split(' ')[1]}
          </div>
          
          <div class="info">
            <strong>Connection Details:</strong><br>
            Host: <code>localhost:5432</code><br>
            Database: <code>elmcafe_db</code><br>
            Status: <code style="color: #48bb78">ACTIVE</code>
          </div>
          
          <div class="footer">
            <strong>Next Steps:</strong><br>
            1. Take screenshots for Project B Part 2 submission<br>
            2. Push this code to GitHub<br>
            3. Submit proof PDF to Canvas<br><br>
            
            Server running on: <code>http://localhost:${PORT}</code>
          </div>
        </div>
      </body>
      </html>
    `;
    
    res.send(htmlResponse);
    
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send(`
      <h1 style="color: red;">❌ Database Connection Failed</h1>
      <p><strong>Error:</strong> ${error.message}</p>
      <p>Make sure PostgreSQL is running and the database 'elmcafe_db' exists.</p>
      <p>Check your password in server.js matches your PostgreSQL password.</p>
    `);
  }
});

// Test route for simple data query
app.get('/test-query', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS result');
    res.json({
      success: true,
      message: 'Query executed successfully',
      result: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════');
  console.log('  🚀 Net Zero Project B - Server Started!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Student: Justin Laframboise`);
  console.log(`  Project: The Elm Cafe - Online Ordering System`);
  console.log(`  Stack: Node.js + Express + PostgreSQL`);
  console.log('');
  console.log(`  🌐 Server running at: http://localhost:${PORT}`);
  console.log(`  📊 Test endpoint: http://localhost:${PORT}/test-query`);
  console.log('');
  console.log('  Press Ctrl+C to stop the server');
  console.log('═══════════════════════════════════════════════════');
});
