const express = require('express');
const app = express();
const colors = [1, 2, 3, 4, 5];

app.use(express.static('public'));

app.get('/colors', (req, res) => {
  res.status(200).json(colors);
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
