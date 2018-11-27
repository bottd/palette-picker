const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const Palette = require('./palette');

app.use(express.static('public'));

app.get('/colors', (req, res) => {
  const colors = new Palette(5)
  res.status(200).json(colors);
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
