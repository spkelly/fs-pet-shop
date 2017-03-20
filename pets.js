// 'use strict';

function read(index){
  if(index != undefined){
    fs.readFile('./pets.json','utf8',function(err,data) {
      if(err) throw err;
      let dataLength =JSON.parse(data).length
      if(index > dataLength -1 || index < 0){
        console.log(`USAGE: node ${fileName} [read | create | update | destroy]`);
        process.exit(1);
      }
      console.log(JSON.parse(data)[index]);
    })
  }
  else {
    fs.readFile('./pets.json','utf8',function(err,data) {
      if(err) throw err;
      console.log(JSON.parse(data));
    })
  }
}

function create(age, kind, name){
  if(process.argv.length < 6 || process.argv.length > 9) {
    console.error(`Usage: node ${fileName} create AGE KIND NAME`);
    process.exit(1);
  }
  let animal = {};
  animal['age'] = Number.parseInt(age);
  animal['kind'] = kind;
  animal['name'] = name;
  fs.readFile('./pets.json','utf8',function(err,data) {
    if(err) throw err;
    let parsedData = JSON.parse(data);
    parsedData.push(animal)
    fs.writeFile('./pets.json',JSON.stringify(parsedData),function(err,data){
      if(err) throw err;
      console.log(animal);
    })
  })
}


const fs = require('fs');
const path = require('path');
const fileName = path.basename(process.argv[1]);
const command = process.argv[2];

// if(process.argv.length < 3){
//   console.log(`USAGE: node ${fileName} [read | create | update | destroy]`);
//   process.exit(1);
// }


switch (command) {
  case 'read':
    read(process.argv[3]);
    break;
  case 'create':
    create(process.argv[3],process.argv[4],process.argv[5]);
    break;
  case 'update':
    console.log('updating');
    break;
  case 'destroy':
    console.log('destroying');
    break;
  default:
    console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
    process.exit(1);
}
