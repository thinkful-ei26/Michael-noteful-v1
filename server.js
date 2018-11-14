'use strict';

// Load array of notes
const morgan = require('morgan');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();
const logger = morgan('dev');
const notesRouter = require('./router/notes.router.js');
// ADD STATIC SERVER HERE
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

// grab the config file export
const {PORT} = require('./config');


app.use('/api/notes', notesRouter);

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${PORT}`);
}).on('error', err => {
  console.error(err);
});