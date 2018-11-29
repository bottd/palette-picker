const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/api/v1/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await database('projects')
      .where('id', id)
      .select();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post('/api/v1/projects', async (req, res) => {
  const project = req.body;
  const id = await database('projects').insert(project, 'id');
  res.status(200).json({id});
});

app.put('/api/v1/projects/:id', async (req, res) => {
  const project = {
    name: req.body.name,
    id: req.params.id,
  };
  console.log(project);
  try {
    await database('projects')
      .where('id', project.id)
      .update(project);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({error});
  }
});

app.get('/api/v1/projects/:project_id/palettes', async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const palettes = await database('palettes')
      .where('project_id', project_id)
      .select();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/api/v1/projects/:project_id/palettes/:id', async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const id = req.params.id;
    const palettes = await database('palettes')
      .where('id', id)
      .select();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post('/api/v1/palettes', async (req, res) => {
  const palette = req.body;
  const id = await database('palettes').insert(palette, 'id');
  res.status(200).json({id});
});

app.listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`);
});
