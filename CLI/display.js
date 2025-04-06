const { Command } = require("commander");
const program = new Command();


function displayFullName(firstName,lastName){
  
}


program
  .command("fn")
  .action(()=>{
    console.log('Soham');
  })

program
  .command("ln")
  .action(()=>{
    console.log('Pirale');
  })

program
  .command("fn ln")
  .action(()=>{
    console.log('Soham');
    console.log('Pirale');
  })

program.parse(process.argv);

