const { Command } = require("commander");
const program = new Command();
const fs = require("fs");

function addTask(task) {
  let tasks = [];
  if (!fs.existsSync("tasks.json")) {
    console.log('tasks.json does not exists');
    // return;
  } else {
    tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  }
  let taskObj = {
    task: task,
    completed: false
  }
  tasks.push(taskObj);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks), "utf-8");
  console.log('Task : ' + task + " added successfully");

}

function displayTasks(){
  if (!fs.existsSync("tasks.json")) {
    console.log('tasks.json does not exists');
    return;
  } 
  let tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  console.log("Tasks are :");
  
  tasks.forEach((task) => {
    console.log(task);
  });
  
}

function markCompleted(task){
  let tasks = [];
  if (!fs.existsSync("tasks.json")) {
    console.log('tasks.json does not exists');
    return;
  } else {
    tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));
  }

  let found=false;
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].task==task){
      found=true;
      tasks[i].completed=true;
      break;
    }
  }
  
  if(found){
    fs.writeFileSync("tasks.json",JSON.stringify(tasks),"utf-8");
    console.log('Task : '+task+" marked as completed");
  } else {
    console.log('Task not found in the tasks.json');
  }
}

program
  .command("add <task>")
  .action((task) => {
    addTask(task);
  })


program
  .command("display")
  .action(()=>{
    displayTasks();
  })

program
  .command("done <task>")
  .action((task)=>{
    markCompleted(task);
  })

program.parse(process.argv);
