const { Command } = require("commander");
const program = new Command();

let tasks=[];

program
  .name("task-cli")
  .description("A simple task manager CLI")
  .version("1.0.0");  

program
  .command("add <task>")
  .description("Add a new task")
  .action((task) => {
    console.log(`Task added: ${task}`);
    tasks.push(task);
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
    if(tasks.length==0){
      console.log('tasks are empty');
      return;
    }

    console.log("Listing all tasks...");
    tasks.forEach((task)=>{
      console.log(task);
    })
  });

program
  .command("say_hi")
  .description("Saying hi to user")
  .action(()=>{
    console.log('hii there');
  });
program.parse(process.argv);
