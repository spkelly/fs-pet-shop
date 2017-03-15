routes = {
  'pets': function(index,req,res) {

    const fs = require('fs');
    const path = require('path');
    fs.readFile('pets.json','utf8',(err, data) => {
      if(err){
        res.statusCode = '404';
        res.setHeader('Content-type','application/json');
        res.end('404 page not found');
      }
      let pets = data;
      if(!index){
        res.statusCode = '200';
        res.setHeader('Content-Type','application/json');
        res.end(pets);
        return res;
      }
      else {
        let parsedPets = JSON.parse(pets);
        if(!parsedPets[index]){
          res.statusCode = '404';
          res.setHeader('Content-Type','text/plain');
          res.end('Not Found');
        }
        else{
          res.statusCode = '200';
          res.setHeader('Content-Type','application/json');
          res.end(JSON.stringify(parsedPets[index]));
        }

      }
    });
  }
};

module.exports = routes;
