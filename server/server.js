const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

//Get all projects
app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database error');
  }
});

//Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database error');
  }
});

//Create new task
app.post('/task', async (req, res) => {
  const { title, description, status , priority , projectid} = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, status , priority , projectid)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, status , priority , projectid]
    );

    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Error inserting project', err.stack);
    res.status(500).send('Database error');
  }
});

//Create new project
app.post('/project', async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (name, description, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description, status]
    );

    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Error inserting project', err.stack);
    res.status(500).send('Database error');
  }
});

//Update existing Project
app.put('/project/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE projects
       SET name = $1, description = $2, status = $3
       WHERE id = $4
       RETURNING *`,
      [name, description, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project', err.stack);
    res.status(500).send('Database error');
  }
});

//Update existing task
app.put('/task/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status , priority , projectid} = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, status = $3, priority = $4, projectid = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, status, priority , projectid, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project', err.stack);
    res.status(500).send('Database error');
  }
});

//GET by ID
app.get('/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    // Get project details
    const projectResult = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId]);

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = projectResult.rows[0];

    // Get tasks related to the project
    const tasksResult = await pool.query('SELECT * FROM tasks WHERE projectId = $1', [projectId]);

    project.tasks = tasksResult.rows;

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


  