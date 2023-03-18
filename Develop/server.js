//Import Express
const express = require('express');
//Import fs
const fs = require('fs');
const path = require('path');
const PORT = 3001;

const app = express();
const api = require('./routes/index.js');


//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')),

);

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);

module.exports = app;