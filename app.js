require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

// Setup PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

});

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fake/users', (req, res) => {
  const fakeUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  ];

  res.status(200).json(fakeUsers);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
