'use strict';

// Load array of notes
const data = require('./db/notes');

const simDB = require('./db/simDB');  

const notes = simDB.initialize(data);

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.use(express.json());

// grab the config file export
const {logger} = require('./logger');

const {PORT} = require('./config');

app.use(logger);

app.get("/api/notes", (req, res) => {
    const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get("/api/notes/:id", (req, res) => {
    res.json(data.find(item => item.id === Number(req.params.id)));
});



app.put('/api/notes/:id',(req,res,next)=>{

  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });

});

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