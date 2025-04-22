const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors({
    origin: 'http://localhost:5173',
}));
  