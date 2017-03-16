'use strict';
//Declares dependencies
const express = require('express');
const fs = require('fs');

//port and server creation
const port = (process.env.port||3001);
const app = express();

app.disable('x-powered-by');

// get handler to the /pet path
app.get('/pets', (req,res) => {
  fs.readFile('pets.json','utf8', (err, data) => {
    res.type('json');
    res.send(data);
  });
});

// get handler for the /pet/<index> path
app.get('/pets/:index', (req, res) => {
  let index = parseInt(req.params.index);

  fs.readFile('pets.json', (err, data) => {
    let parsedData = JSON.parse(data);
    if(index >= 0 && index < parsedData.length){
      res.type('json');
      res.send(parsedData[index]);
    }
    else{
      res.set('Content-Type', 'text/plain');
      res.sendStatus('404');
    }
  });
});

// defaulet server response?
app.use((req, res) => {
  res.sendStatus('404');
});


app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
