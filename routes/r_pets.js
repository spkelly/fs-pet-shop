const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');

router.get('/', (req,res, next) =>{
  httpFileReader('pets.json',res);
});

router.get('/:index', (req,res, next) => {
  let index = parseInt(req.params.index);
  httpFileReader('pets.json',res , index);
});

router.post('/', (req, res, next) => {
  let pet = req.body;
  res.header('Content-Type', 'application/json');
  if (!pet.age ||!pet.kind ||!pet.name) {
    res.header('Content-Type', 'text/plain');
    res.sendStatus('400');
  }
  else if (isNaN(pet.age)) {
    res.header('Content-Type', 'text/plain');
    res.sendStatus('404');
  }
  else {
    httpFileWriter('pets.json',pet,res);
  }
});

router.patch('/:index', (req, res, next) =>{
  let index = parseInt(req.params.index);
  let pet = req.body;
  if (!pet.age && !pet.kind && !pet.name) {
    res.header('Content-Type', 'text/plain');
    res.sendStatus('400');
  }
  else if (pet.age && isNaN(pet.age)) {
    res.header('Content-Type', 'text/plain');
    res.sendStatus('400');
  }
  else{
    httpFileUpdater('pets.json',pet, index, res);
  }
});

router.delete('/:index',(req,res, next) =>{
  let index = parseInt(req.params.index);
  fs.readFile('pets.json','utf8',(err,data) =>{
    if(err) throw err;

    let parsed = JSON.parse(data);
    if(index >= 0 && index < parsed.length){

      res.header('Content-Type', 'application/json');
      let petToDelete = parsed.splice(index,1);
      fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
        if(err) throw err;
        //console.log("in here");
        res.send(petToDelete[0]);
      });
    }
    else{
      res.header('Content-Type', 'text/plain');
      res.sendStatus('404');
    }

  });
});

function httpFileReader(filename, res ,index){
  fs.readFile('pets.json','utf8',(err,data) =>{
    if(err) res.sendStatus('404');
    let parsed = JSON.parse(data);
    if(index){
      if(index >= 0 && index < parsed.length){
        res.header('Content-Type', 'application/json');
        res.send(parsed[index]);
      }
      else{
        res.header('Content-Type', 'text/plain');
        res.sendStatus('404');
      }
    }
    else{
      res.header('Content-Type', 'application/json');
      res.send(data);
    }
  });
}

function httpFileWriter(filename,pet,res){
  fs.readFile('pets.json','utf8',(err,petData) =>{
    if(err) res.sendStatus('404');
    let parsed = JSON.parse(petData);
    parsed.push(pet);
    fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
      if(err) throw err
      res.send(pet);
    });
  });

}

function httpFileUpdater(filename,pet,index,res){
  fs.readFile('pets.json','utf8',(err,petData) =>{
    if(err){
      res.sendStatus('404');
    }

    let parsed = JSON.parse(petData);
    for(key in pet){
      parsed[index][key] = pet[key];
    }
    fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
      if(err) throw err
      res.send(parsed[index]);
    });
  });
}

module.exports = router
