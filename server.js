'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    const query = req.query;
    if (query.searchTerm) {
    return res.json(data.filter(item => item.title.includes(query.searchTerm)));
    }else{
        res.json(data);
    }
    //res.json(data.filter(item => item.title.indexOf(query.searchTerm) > -1));
  });

app.get("/api/notes/:id", (req, res) => {
    res.json(data.find(item => item.id === Number(req.params.id)));
});




app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});