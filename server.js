const uuid = require('uuid');
const express = require('express');
const path = require('path');
const {readFromFile, readAndAppend} = require('./notesfunctions')
const notes = require('./db/db.json');
const { request } = require('http');
const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (request, response) =>
  response.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (request, response) =>{
  // readFromFile('./db/db.json').then(data)
  // response.render(notes).sendFile(path.join(__dirname, '/public/notes.html'));
  // // // response.json(JSON.parse(data)));
  response.sendFile(path.join(__dirname, '/public/notes.html'))

});

//GET API notes
app.get('/api/notes', (request, response) => {
  readFromFile('./db/db.json').then(data => response.json(JSON.parse(data)));
});

//POST route for notes page
app.post('/notes', (request, response) => {
  console.info(`${request.method} request receceived to add a new note`);
  console.log(request.body);

  if (request.body) {
    const { title, text } = request.body;
    const newNote = {
      title,
      text,
      note_id: uuid.v4()
    };

    readAndAppend(newNote, './db/db.json');
    response.json(`Note added successfully 🚀`);
  } else {
    response.error('Problem in adding note');
  }
});

// // Wildcard route to direct users to a 404 page
// app.get('*', (request, response) =>
//   response.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
