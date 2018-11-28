const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const Palette = require('./palette');

app.use(express.static('public'));

app.get('/colors', (req, res) => {
  const colors = new Palette(5);
  res.status(200).json(colors);
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await database('projects').select();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const palettes = await database('palettes')
      .where('project_id', id)
      .select();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/palettes', async (req, res) => {
  try {
    const palettes = await database('palettes').select();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
