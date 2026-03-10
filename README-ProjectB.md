# Net Zero Project B - The Elm Cafe

**Student:** Justin Laframboise  
**Course:** Professional Placement - Web Development  
**Project:** The Elm Cafe - Online Ordering & Event Management System  
**Stack:** Node.js + Express + PostgreSQL + React  

---

## 📋 Project Overview

This repository contains the development code for The Elm Cafe's online ordering and event management system, built as part of Net Zero Hosting's Project B initiative.

### Business Client
- **Name:** The Elm Cafe
- **Location:** 303 Montreal Street, Kingston, ON K7K 3G9
- **Website:** https://www.theelmcafe.com
- **Type:** Family-run independent cafe

### Technical Stack
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Frontend:** React (to be added in Part 3)
- **Hosting:** Local development (Part 2), Cloud deployment (Part 4)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js v20+ ([Download](https://nodejs.org))
- PostgreSQL 15+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/))
- Code editor (VS Code recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/justinlaf/netzero-project-b-laframboise.git
cd netzero-project-b-laframboise
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `pg` - PostgreSQL client
- `nodemon` - Dev server with auto-reload

### Step 3: Set Up PostgreSQL Database

#### Option A: Using pgAdmin (GUI - Recommended for beginners)

1. Open **pgAdmin 4**
2. Right-click **"Databases"** → **"Create"** → **"Database"**
3. Name: `elmcafe_db`
4. Click **"Save"**
5. Right-click `elmcafe_db` → **"Query Tool"**
6. Copy and paste contents of `database_init.sql`
7. Click **"Execute"** (▶️ button)

#### Option B: Using Command Line (psql)

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE elmcafe_db;

# Exit psql
\q

# Run initialization script
psql -U postgres -d elmcafe_db -f database_init.sql
```

### Step 4: Configure Database Connection

Open `server.js` and verify/update the PostgreSQL password:

```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'elmcafe_db',
  password: 'YOUR_POSTGRES_PASSWORD_HERE',  // ← Change this!
  port: 5432,
});
```

### Step 5: Start the Server

```bash
npm start
```

You should see:
```
═══════════════════════════════════════════════════
  🚀 Net Zero Project B - Server Started!
═══════════════════════════════════════════════════
  Student: Justin Laframboise
  Project: The Elm Cafe - Online Ordering System
  Stack: Node.js + Express + PostgreSQL

  🌐 Server running at: http://localhost:3000
  📊 Test endpoint: http://localhost:3000/test-query
```

### Step 6: Verify Connection

Open your browser to: **http://localhost:3000**

You should see a success page showing:
- ✅ Database connection successful
- Server time
- PostgreSQL version
- Connection details

---

## 📂 Project Structure

```
netzero-project-b-laframboise/
├── server.js              # Main Express server with DB connection
├── package.json           # Node.js dependencies
├── database_init.sql      # PostgreSQL schema & sample data
├── README.md              # This file
├── .gitignore            # Git ignore rules
└── node_modules/         # Installed dependencies (not committed)
```

---

## 🗄️ Database Schema (Initial)

### Tables Created:
1. **products** - Menu items (coffee, food, pastries)
2. **customers** - Customer accounts with loyalty points
3. **orders** - Order tracking
4. **order_items** - Junction table for order details
5. **events** - Poetry nights, art exhibitions, community events

### Sample Data Included:
- 4 menu items (coffee, croissant, avocado toast, BLT)
- 1 upcoming poetry event

---

## 🧪 Testing the Setup

### Test 1: Main Page
```
http://localhost:3000
```
Should show: Green success banner with database info

### Test 2: Query Endpoint
```
http://localhost:3000/test-query
```
Should return JSON:
```json
{
  "success": true,
  "message": "Query executed successfully",
  "result": { "result": 2 }
}
```

### Test 3: Database GUI
1. Open pgAdmin 4
2. Navigate to: Servers → PostgreSQL → Databases → elmcafe_db
3. Right-click → "Query Tool"
4. Run: `SELECT * FROM products;`
5. Should see 4 menu items

---

## 📸 Project B Part 2 Screenshots Required

For Canvas submission, take these 3 screenshots:

### Screenshot 1: Code Editor
- Show `server.js` open in VS Code
- File tree visible on left showing project structure
- Database connection code visible

### Screenshot 2: Browser
- URL bar showing `localhost:3000`
- Success page with green banner visible
- Database connection info displayed

### Screenshot 3: Database GUI
- pgAdmin showing `elmcafe_db` in database list
- Bonus: Query showing products table with sample data

---

## 🔧 Troubleshooting

### Error: "ECONNREFUSED"
**Problem:** Can't connect to PostgreSQL  
**Fix:** 
1. Make sure PostgreSQL is running
2. Check password in `server.js` matches your PostgreSQL password
3. Verify database `elmcafe_db` exists

### Error: "relation does not exist"
**Problem:** Database tables not created  
**Fix:** Run `database_init.sql` in pgAdmin Query Tool

### Error: "Cannot find module 'express'"
**Problem:** Dependencies not installed  
**Fix:** Run `npm install`

### Port 3000 already in use
**Fix:** 
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill

# Or change port in server.js
const PORT = 3001;  // Use different port
```

---

## 📝 Next Steps (Project B Part 3 & 4)

- [ ] Add React frontend
- [ ] Build online ordering UI
- [ ] Implement event calendar
- [ ] Add customer authentication
- [ ] Deploy to cloud (Azure/Vercel)

---

## 🔗 GitHub Repository

**Public URL:** https://github.com/justinlaf/netzero-project-b-laframboise

---

## 📧 Contact

**Justin Laframboise**  
St. Lawrence College - Web Development  
Email: justin.laframboise@student.sl.on.ca

---

## 📄 License

MIT License - Educational Project
