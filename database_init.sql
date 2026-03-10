-- database_init.sql
-- Database Initialization Script for The Elm Cafe Project
-- Student: Justin Laframboise
-- Project B - Part 2

-- Create a simple test table to verify database is working
CREATE TABLE IF NOT EXISTS connection_test (
    id SERIAL PRIMARY KEY,
    test_message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test record
INSERT INTO connection_test (test_message) 
VALUES ('Database initialized successfully for Project B!');

-- Create initial schema for Elm Cafe ordering system
-- (These will be expanded in future parts of Project B)

-- Products table (menu items)
CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    dietary_tags VARCHAR(100),
    availability BOOLEAN DEFAULT true,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pickup_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table (junction table)
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table (for poetry nights, art exhibitions)
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    artist_name VARCHAR(100),
    rsvp_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing

-- Sample products
INSERT INTO products (name, description, price, category, dietary_tags) VALUES
('House Blend Coffee', 'Direct trade coffee, rich and smooth', 3.50, 'Coffee', 'vegan'),
('Almond Croissant', 'Freshly baked with almond paste filling', 4.25, 'Pastry', 'vegetarian'),
('Avocado Toast', 'Smashed avocado on sourdough with chili flakes', 8.50, 'Food', 'vegan'),
('BLT Sandwich', 'Bacon, lettuce, tomato on fresh bread - Best in town!', 9.75, 'Food', NULL);

-- Sample event
INSERT INTO events (event_type, title, description, event_date, event_time, artist_name) VALUES
('Poetry', 'Monthly Poetry Open Mic', 'First Tuesday poetry reading hosted by Bruce Kauffman', 
 CURRENT_DATE + INTERVAL '5 days', '19:00:00', 'Various Local Poets');

-- Verify data
SELECT 'Setup complete!' as status;
SELECT COUNT(*) as product_count FROM products;
SELECT COUNT(*) as event_count FROM events;
