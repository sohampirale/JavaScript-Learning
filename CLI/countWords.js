const { Command } = require("commander");
const program = new Command();
const fs=require("fs");

function tellCount(err,data){
  if(err){
    console.log('error reading file : '+err);
    return;
  }
  let newData=data.trim().replace(/\s+/g," ").split(" ");
  console.log('no. of words in the file are : '+newData.length);
  
}

program
  .command("<filepath>")
  .action((filepath)=>{
    fs.readFile(filepath,"utf-8",tellCount);
    console.log('reading file');
  })

program.parse(process.argv);