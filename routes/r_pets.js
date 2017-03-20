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
  console.log(pet);
  res.header('Content-Type', 'application/json');
  console.log('age',parseInt(pet.age));
  if(!pet.age ||!pet.kind ||!pet.name){
    res.header('Content-Type', 'text/plain');
    res.sendStatus('400');
  }
  else if(isNaN(pet.age)){
    res.header('Content-Type', 'text/plain');
    console.log('age',parseInt(pet.age));
    res.sendStatus('404');
  }
  else{
    httpFileWriter('pets.json',pet,res);
  }
});

router.put('/:index', (req, res, next) =>{
  let index = parseInt(req.params.index);

});

router.delete('/:index',(req,res,next) =>{
  let index = parseInt(req.params.index);
  fs.readFile('pets.json','utf8',(err,data) =>{
    if(err) res.sendStatus('404');
    let parsed = JSON.parse(data);
    if(index >= 0 && index < parsed.length){

      console.log('Parsed', parsed);
      res.header('Content-Type', 'application/json');
      console.log('parsed before splice',parsed);
      let petToDelete = parsed.splice(index,1);
      console.log('pet to Delete',petToDelete);
      fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
        if(err) throw err
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
    console.log(parsed);
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
    console.log('parsed',parsed);
    fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
      if(err) throw err
      res.send(pet);
    });
  });

}

function httpFileUpdater(filename,pet,res){
  fs.readFile('pets.json','utf8',(err,petData) =>{
    if(err) res.sendStatus('404');
    let parsed = JSON.parse(petData);
    fs.writeFile('pets.json', JSON.stringify(parsed), (err) =>{
      if(err) throw err
      res.send(pet);
    });
  });
}

module.exports = router
