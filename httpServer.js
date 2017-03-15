'use strict';

const http = require('http');
const fs = require('fs');
const routes = require('./routes');
const port = 4446;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type','application/json');
  let pathArray = req.url.replace(/^\//,'').split('/');
  let routeName = pathArray[0];
  let index = pathArray[1];
  if (routes[routeName]!==undefined) {
    routes[routeName](index,req,res);
  }
  else{
    res.end('404 no such route');
  }
});


server.listen(port,function(err){
  if(err) throw err;
  console.log('listening on port: ' + port);
});


module.exports = server;
