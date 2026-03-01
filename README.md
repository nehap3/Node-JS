# Node JS Project

This project is a Full-Stack application consisting of a Node.js Backend and an Angular Frontend.

## Database Setup

Run the following SQL queries to set up the database. Make sure your MySQL server is running.

```sql
-- If database already exists, delete it completely
DROP DATABASE IF EXISTS nimap_test;

-- Create fresh database
CREATE DATABASE nimap_test;
USE nimap_test;

-- Create Category Table
CREATE TABLE Category (
  CategoryId INT AUTO_INCREMENT PRIMARY KEY,
  CategoryName VARCHAR(100) NOT NULL
);

-- Create Product Table
CREATE TABLE Product (
  ProductId INT AUTO_INCREMENT PRIMARY KEY,
  ProductName VARCHAR(100) NOT NULL,
  CategoryId INT NOT NULL,
  FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

-- Drop foreign key first
ALTER TABLE Product DROP FOREIGN KEY product_ibfk_1;

-- Re-add with CASCADE
ALTER TABLE Product
ADD CONSTRAINT product_ibfk_1
FOREIGN KEY (CategoryId)
REFERENCES Category(CategoryId)
ON DELETE CASCADE;

SHOW CREATE TABLE Product;

-- Insert Categories
INSERT INTO Category (CategoryName) VALUES 
('Electronics'),
('Clothing');

-- Insert Products (15 records for pagination testing)
INSERT INTO Product (ProductName, CategoryId) VALUES
('Laptop', 1),
('Mobile Phone', 1),
('Tablet', 1),
('Headphones', 1),
('Smart Watch', 1),
('Keyboard', 1),
('Mouse', 1),
('Monitor', 1),
('T-Shirt', 2),
('Jeans', 2),
('Jacket', 2),
('Shoes', 2),
('Cap', 2),
('Socks', 2),
('Belt', 2);

-- Verify Data
SELECT * FROM Category;
SELECT * FROM Product;
```

### Database Connection Configuration

The backend is configured to connect with the following credentials (modify `nimap-backend/db.js` if needed):
- **Host:** localhost
- **User:** root
- **Password:** root
- **Database:** nimap_test

## Backend Setup (Node.js & Express)

1. Navigate to the backend directory:
   ```bash
   cd nimap-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:3000`.

## Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd nimap-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be available at `http://localhost:4200`.

# Demo
# https://drive.google.com/file/d/1L3d5Tsgs3rTqDlN_hILZtYGQwx-3NzFc/view?usp=drive_link
