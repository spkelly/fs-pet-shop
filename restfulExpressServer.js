'use strict';

const express = require('express');
const path = require('path');
const port = 4003;

const app = express();
const pet = require('./routes/r_pets.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/pets',pet);



app.listen(port, function() {
  console.log('Listening on port', port);
});


module.exports = app;
