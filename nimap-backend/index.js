const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => res.send('Server is running 🚀'));


//Category

// Get all categories
app.get('/categories', (req, res) => {
  db.query("SELECT * FROM Category ORDER BY CategoryId ASC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Add category
app.post('/categories', (req, res) => {
  const { CategoryName } = req.body;

  db.query(
    "INSERT INTO Category (CategoryName) VALUES (?)",
    [CategoryName],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ insertId: result.insertId });
    }
  );
});

// Update category
app.put('/categories/:id', (req, res) => {
  const id = req.params.id;
  const { CategoryName } = req.body;

  db.query(
    "UPDATE Category SET CategoryName=? WHERE CategoryId=?",
    [CategoryName, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Updated" });
    }
  );
});

// Delete category (AUTO CASCADE handles products)
app.delete('/categories/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM Category WHERE CategoryId=?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Category deleted (products auto deleted)" });
    }
  );
});

/* ---------------- PRODUCT CRUD ---------------- */

// Get products (optimized pagination)
app.get('/products', (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  // Get total count 
  db.query("SELECT COUNT(*) as total FROM Product", (err, countRes) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countRes[0].total;

    // Get paginated data
    const sql = `
      SELECT 
        p.ProductId,
        p.ProductName,
        p.CategoryId,
        c.CategoryName
      FROM Product p
      JOIN Category c ON p.CategoryId = c.CategoryId
      ORDER BY p.ProductId ASC
      LIMIT ? OFFSET ?
    `;

    db.query(sql, [pageSize, offset], (err2, data) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({
        data,
        total,
        page,
        pageSize
      });
    });
  });
});

//Products
// Add product
app.post('/products', (req, res) => {
  const { ProductName, CategoryId } = req.body;

  db.query(
    "INSERT INTO Product (ProductName, CategoryId) VALUES (?,?)",
    [ProductName, CategoryId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ insertId: result.insertId });
    }
  );
});

// Update product
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { ProductName, CategoryId } = req.body;

  db.query(
    "UPDATE Product SET ProductName=?, CategoryId=? WHERE ProductId=?",
    [ProductName, CategoryId, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Updated" });
    }
  );
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM Product WHERE ProductId=?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Deleted" });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
