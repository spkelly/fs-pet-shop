'use strict';

function read(index){
  if(index != undefined){
    fs.readFile('./pets.json','utf8',function(err,data) {
      if(err) throw err;
      console.log(JSON.parse(data).length);
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

const fs = require('fs');
const path = require('path');
const fileName = path.basename(process.argv[1]);
const command = process.argv[2];

if(process.argv.length < 3){
  console.log(`USAGE: node ${fileName} [read | create | update | destroy]`);
  process.exit(1);
}


switch (command) {
  case 'read':
    read(process.argv[3]);
    break;
  default:
    console.log(`USAGE: node ${fileName} [read | create | update | destroy]`);
    process.exit(1);
}
