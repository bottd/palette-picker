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
  res.status(200).json({id: id[0]});
});

app.put('/api/v1/projects/:id', async (req, res) => {
  const project = {
    name: req.body.name,
    id: req.params.id,
  };
  try {
    await database('projects')
      .where('id', project.id)
      .update(project);
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({error});
  }
});

app.delete('/api/v1/projects/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await database('palettes')
      .where('project_id', id)
      .del();
    const project = await database('projects')
      .where('id', id)
      .del();
    res.status(200).json({message: `project ${id} deleted`});
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
    const palette = await database('palettes')
      .where('id', id)
      .select();
    res.status(200).json(palette[0]);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post('/api/v1/projects/:project_id/palettes', async (req, res) => {
  const palette = req.body;
  palette.project_id = req.params.project_id;
  const id = await database('palettes').insert(palette, 'id');
  res.status(200).json({id: id[0]});
});

app.delete('/api/v1/projects/:project_id/palettes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await database('palettes').where('id', id).del();
    res.status(200).json({message: `palette ${id} deleted`});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`);
});
