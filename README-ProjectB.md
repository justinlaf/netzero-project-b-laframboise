# Elm Cafe - Online Ordering System

**Student:** Justin Laframboise  
**Project:** Net Zero Project B - Part 2  
**Stack:** Node.js, Express, PostgreSQL  

## About

This is a local development setup for The Elm Cafe's online ordering system. Built for a web development course project.

The Elm Cafe is a real Kingston business at 303 Montreal Street.

## Setup

1. Install Node.js and PostgreSQL
2. Clone this repo
3. Run `npm install`
4. Create database: `elmcafe_db`
5. Run the SQL script in pgAdmin: `database_init.sql`
6. Update password in `server.js` (line 13)
7. Start server: `npm start`
8. Open browser: `localhost:3000`

## Tech Stack

- Node.js + Express (backend)
- PostgreSQL (database)
- HTML/CSS (frontend - will add React later)

## Database

5 tables created:
- products (menu items)
- customers
- orders
- order_items
- events (poetry nights, art shows)

Sample data included for testing.

---

**Local development only - Part 2 submission**
