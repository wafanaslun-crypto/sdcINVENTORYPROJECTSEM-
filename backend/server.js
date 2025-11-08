const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'nas@123', // your actual MySQL password
    database: 'inventory_db'
};

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM products');
        res.json(rows);
        await connection.end();
    } catch (err) {
        console.error('DATABASE ERROR:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// POST a new product
app.post('/api/products', async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
            [name, category, price, stock]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
        await connection.end();
    } catch (err) {
        console.error('DATABASE ERROR:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted' });
        await connection.end();
    } catch (err) {
        console.error('DATABASE ERROR:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
