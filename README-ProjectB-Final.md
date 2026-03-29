# The Elm Cafe - Online Ordering System

**Student:** Justin Laframboise  
**Course:** Net Zero Web Development Placement  
**Client:** The Elm Cafe, 303 Montreal Street, Kingston, ON

---

## 📋 Project Description

This is a full-stack web application built for The Elm Cafe, a local Kingston coffee shop. The application allows customers to browse the menu, place online orders, and view upcoming events. Admin users can manage products, view orders, and update event listings through a protected dashboard.

**Key Features:**
- Customer-facing menu and ordering system
- User authentication and session management
- Admin dashboard for product/order management
- Event calendar for community activities (poetry nights, art shows)
- Secure password hashing and environment-based configuration

---

## 🛠️ Tech Stack

**Backend:**
- Node.js (v18.x or higher)
- Express.js (^4.18.2)
- PostgreSQL (v18.3)

**Authentication & Security:**
- bcrypt (^5.1.1) - Password hashing
- express-session (^1.18.0) - Session management
- dotenv (^3.0.0) - Environment variable management

**Frontend:**
- HTML5, CSS3, JavaScript
- Responsive design (mobile-friendly)

**Database:**
- PostgreSQL 18.3
- 5 tables: products, customers, orders, order_items, events

---

## 📦 Installation Instructions

### Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v16 or higher) - [Download here](https://www.postgresql.org/download/)
3. **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/justinlaf/netzero-project-b-laframboise.git
cd netzero-project-b-laframboise
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express
- pg (PostgreSQL client)
- dotenv
- express-session
- bcrypt
- nodemon (dev dependency)

### Step 3: Set Up the Database

1. **Open pgAdmin 4** (or your PostgreSQL client)

2. **Create the database:**
   ```sql
   CREATE DATABASE elmcafe_db;
   ```

3. **Run the database initialization script:**
   - In pgAdmin, right-click `elmcafe_db` → **Query Tool**
   - Open the file `database_init.sql` from this repository
   - Execute the script (▶️ button or F5)

4. **Verify tables were created:**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   
   You should see: `products`, `customers`, `orders`, `order_items`, `events`

### Step 4: Configure Environment Variables

1. **Create a `.env` file** in the project root directory

2. **Copy this template and add your credentials:**

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=elmcafe_db
DB_PASSWORD=your_postgresql_password_here
DB_PORT=5432

# Server Configuration
PORT=3000

# Session Secret (change this to a random string)
SESSION_SECRET=your-secret-key-change-in-production
```

3. **IMPORTANT:** Replace `your_postgresql_password_here` with your actual PostgreSQL password

4. **Save the file**

### Step 5: Create Admin User

Run the admin user creation script:

```bash
node create-admin.js
```

You should see:
```
✅ Admin user created successfully!
📧 Email: admin@elmcafe.com
🔑 Password: admin123
```

### Step 6: Start the Server

**Development mode** (with auto-restart on file changes):
```bash
npm start
```

**Production mode:**
```bash
node server.js
```

You should see:
```
🚀 Elm Cafe Server - Running
🌐 Server: http://localhost:3000
🔐 Admin Login: http://localhost:3000/login
```

### Step 7: Access the Application

- **Home Page:** http://localhost:3000
- **Admin Login:** http://localhost:3000/login
- **Admin Dashboard:** http://localhost:3000/admin (requires login)

**Default Admin Credentials:**
- Email: `admin@elmcafe.com`
- Password: `admin123`

---

## 🔐 Environment Variables

The application requires the following environment variables in a `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_HOST` | Database host address | `localhost` |
| `DB_NAME` | Database name | `elmcafe_db` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `PORT` | Application server port | `3000` |
| `SESSION_SECRET` | Secret key for session encryption | `random-secret-key` |

**SECURITY NOTE:** 
- Never commit your `.env` file to GitHub
- The `.env` file is included in `.gitignore`
- Use `.env.example` as a template for deployment

---

## 🗄️ Database Schema

### Tables

**products** - Menu items
- `product_id` (PRIMARY KEY)
- `name` (VARCHAR)
- `category` (VARCHAR) - Coffee, Pastry, Food
- `price` (DECIMAL)
- `description` (TEXT)
- `availability` (BOOLEAN)

**customers** - User accounts
- `customer_id` (PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `phone` (VARCHAR)
- `password_hash` (VARCHAR) - bcrypt hashed
- `loyalty_points` (INTEGER)
- `created_at` (TIMESTAMP)

**orders** - Customer orders
- `order_id` (PRIMARY KEY)
- `customer_id` (FOREIGN KEY)
- `order_date` (TIMESTAMP)
- `total_amount` (DECIMAL)
- `status` (VARCHAR) - Pending, Completed, Cancelled

**order_items** - Individual items in orders
- `order_item_id` (PRIMARY KEY)
- `order_id` (FOREIGN KEY)
- `product_id` (FOREIGN KEY)
- `quantity` (INTEGER)
- `price_at_purchase` (DECIMAL)

**events** - Upcoming cafe events
- `event_id` (PRIMARY KEY)
- `title` (VARCHAR)
- `description` (TEXT)
- `event_date` (DATE)
- `event_time` (TIME)

---

## 🚀 Deployment Notes (for CST/Ops Team)

### Azure Deployment Checklist

1. **Create Azure PostgreSQL Database:**
   - Import `database_init.sql` to create tables and sample data
   - Note the connection string

2. **Configure Environment Variables:**
   - Create `.env` file on Azure server
   - Update `DB_HOST`, `DB_USER`, `DB_PASSWORD` with Azure credentials
   - Generate a new `SESSION_SECRET`

3. **Install Dependencies:**
   ```bash
   npm install --production
   ```

4. **Create Admin User:**
   ```bash
   node create-admin.js
   ```

5. **Start Application:**
   ```bash
   node server.js
   ```

6. **Verify:**
   - Test database connection
   - Test login functionality
   - Verify HTTPS is enabled for production

### Environment Differences

- **Local Development:** Uses localhost database, port 3000
- **Azure Production:** Uses Azure PostgreSQL, SSL required, custom domain

---

## 🧪 Testing

### Manual Test Checklist

- [ ] Home page loads at `http://localhost:3000`
- [ ] Database connection successful (green banner)
- [ ] Login page accessible at `/login`
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads at `/admin` after login
- [ ] Dashboard shows correct database statistics
- [ ] Logout button works
- [ ] Cannot access `/admin` without logging in (redirects to login)

### Database Test Queries

```sql
-- Verify products
SELECT COUNT(*) FROM products;

-- Verify admin user exists
SELECT email FROM customers WHERE email = 'admin@elmcafe.com';

-- Test event listings
SELECT * FROM events ORDER BY event_date;
```

---

## 📁 Project Structure

```
netzero-project-b-laframboise/
├── server.js              # Main application server
├── create-admin.js        # Admin user creation script
├── database_init.sql      # Database schema and sample data
├── package.json           # Node.js dependencies
├── package-lock.json      # Dependency lock file
├── .env                   # Environment variables (NOT in Git)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

---

## 🔧 Troubleshooting

### "Cannot find module 'dotenv'"
**Solution:** Run `npm install`

### "password authentication failed for user"
**Solution:** Check your `.env` file - make sure `DB_PASSWORD` matches your PostgreSQL password

### "database 'elmcafe_db' does not exist"
**Solution:** Create the database in pgAdmin: `CREATE DATABASE elmcafe_db;`

### "Port 3000 is already in use"
**Solution:** Either stop the other process or change `PORT` in your `.env` file

### Admin login not working
**Solution:** Run `node create-admin.js` to recreate the admin user

---

## 📞 Support

**Student:** Justin Laframboise  
**Email:** justin.laframboise@student.sl.on.ca  
**GitHub:** https://github.com/justinlaf/netzero-project-b-laframboise

---

## 📝 License

This project is submitted as coursework for St. Lawrence College Web Development program.

---

**Last Updated:** March 20, 2026  
**Version:** 1.0 (Week 10 Submission)
